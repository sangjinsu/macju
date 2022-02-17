import json
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import AromaHashTag, Beer, BeerHasAromaHashTag, BeerHasFlavorHashTag, BeerType, FlavorHashTag, Member, MemberFondAromaHashTag, MemberFondFlavorHashTag, MemberLikeBeer, MemberLikePost, MemberRateBeer
from elasticsearch import Elasticsearch
import pandas as pd
import numpy as np

LOSS_AVERSION = 12.3
FOND_WEIGHT = 30

# data to dataframe
aromaHashTags = pd.DataFrame.from_records(
    AromaHashTag.objects.all().values('aroma'))
flavorHashTags = pd.DataFrame.from_records(
    FlavorHashTag.objects.all().values('flavor'))
beerTypes = pd.DataFrame.from_records(
    BeerType.objects.all().values('en_main'))


# 인덱스 1부터
aromaHashTags.index = aromaHashTags.index + 1
flavorHashTags.index = flavorHashTags.index + 1
beerTypes.index = beerTypes.index + 1

aromas = aromaHashTags['aroma'].tolist()
flavors = flavorHashTags['flavor'].tolist()
beer_types = np.unique(beerTypes['en_main']).tolist()

hashtags = aromas + flavors + beer_types

beer_tags = dict()
beers = Beer.objects.all()

for beer in beers:
    beer_tags.setdefault(beer.beer_id, [])
    beer_tags[beer.beer_id].append(beerTypes.at[beer.beer_type_id, 'en_main'])

    beerHasAromaHashTags = BeerHasAromaHashTag.objects.filter(beer=beer).all()
    beerHasFlavorHshTags = BeerHasFlavorHashTag.objects.filter(beer=beer).all()

    for beerHasAromaHashTag in beerHasAromaHashTags:
        beer_tags[beer.beer_id].append(
            aromaHashTags.at[beerHasAromaHashTag.aroma_hash_tag_id, 'aroma'])
    for beerHasFlavorHashTag in beerHasFlavorHshTags:
        beer_tags[beer.beer_id].append(
            flavorHashTags.at[beerHasFlavorHashTag.flavor_hash_tag_id, 'flavor'])
BEER_TAG_LENGTH = len(beer_tags.keys())


def create_tag_df():
    return pd.DataFrame(np.zeros(len(hashtags)),
                        columns=['cnt'], index=hashtags)


def count_tag(df, tag):
    df.at[tag, 'cnt'] = df.at[tag, 'cnt'] + 1


def add_tag_score(df, tag, score):
    df.at[tag, 'total'] = df.at[tag, 'total'] + score


def create_member_like_beer_list(member):
    memberLikeBeers = list(MemberLikeBeer.objects.filter(
        member=member).select_related('beer').values('beer_id').all())

    beer_ids = list(
        map(lambda memberLikeBeer: memberLikeBeer.get('beer_id'), memberLikeBeers))

    return beer_ids


def create_df_like_tag(beer_ids):

    df_tag = create_tag_df()

    for beer_id in beer_ids:
        beer_tag = beer_tags.get(beer_id)
        for tag in beer_tag:
            count_tag(df_tag, tag)

    if len(beer_ids) > 0:
        df_tag['freq'] = df_tag['cnt'] / len(beer_ids)
    else:
        df_tag['freq'] = 0

    return df_tag


def create_df_rate_tag(member):
    memberRateBeers = list(MemberRateBeer.objects.filter(
        member=member).select_related('beer').values('beer_id', 'rate').all())

    beers = list(
        map(lambda memberRateBeer: (memberRateBeer.get('beer_id'), memberRateBeer.get('rate')), memberRateBeers))

    df_tag = create_tag_df()
    df_tag['total'] = np.zeros(len(df_tag))

    for beer in beers:
        beer_tag = beer_tags.get(beer[0])
        for tag in beer_tag:
            count_tag(df_tag, tag)
            add_tag_score(df_tag, tag, beer[1])

    df_tag['avg'] = (df_tag['total'] / df_tag['cnt']).fillna(0)
    total_avg = df_tag['avg'].mean()

    # df_tag['score'] = np.where(df_tag['avg'] > 0,
    #                            np.where(df_tag['avg'] - total_avg >= 0,
    #                                     df_tag['avg'] - total_avg, (df_tag['avg'] - total_avg)*2),
    #                            0)

    df_tag['score'] = np.where(df_tag['avg'] - total_avg >= 0,
                               df_tag['avg'] - total_avg, (df_tag['avg'] - total_avg)*LOSS_AVERSION)

    # df_tag['score'] = df_tag['score'] ** 2

    return df_tag


def create_fond_tags(member):
    fond_aroma_hashtags = list(MemberFondAromaHashTag.objects.filter(
        member=member).select_related('aroma_hash_tag').values('aroma_hash_tag').all())
    fond_flavor_hashtags = list(MemberFondFlavorHashTag.objects.filter(
        member=member).select_related('flavor_hash_tag').values('flavor_hash_tag').all())

    fond_aromas = list(map(lambda tag: aromaHashTags.at[tag.get(
        'aroma_hash_tag'), 'aroma'], fond_aroma_hashtags))
    fond_flavors = list(map(lambda tag: flavorHashTags.at[tag.get(
        'flavor_hash_tag'), 'flavor'], fond_flavor_hashtags))
    return fond_aromas + fond_flavors


def create_df_evaluation_tag(df_like_tag, df_rate_tag, fond_tags):
    df_evaluation_tag = pd.DataFrame()
    df_evaluation_tag['value'] = df_like_tag['freq'] + df_rate_tag['score']

    for fond_tag in fond_tags:
        df_evaluation_tag.at[
            fond_tag, 'value'] = df_evaluation_tag.at[fond_tag, 'value'] + FOND_WEIGHT

    return df_evaluation_tag


def create_df_log_value(memberId):
    # ES 로그 조회
    es = Elasticsearch([{'host': 'i6c107.p.ssafy.io', 'port': '9200'}])
    search_word = 'id:' + memberId

    docs = es.search(
        index='logstash*',
        size=50,
        body={
            "query": {
                "match_phrase": {
                    "message": search_word
                }
            },
            "sort": [
                {
                    "@timestamp": {
                        "order": "desc"
                    }
                }
            ]
        })
    user_logs = list(map(lambda log: json.loads(log['_source']
                         ['message']).get('tags'), docs['hits']['hits']))

    USER_LOG_LENGTH = len(user_logs)
    df_user_logs = create_tag_df()
    # df_user_logs['weight'] = pd.DataFrame(
    # np.arange(len(user_logs), 0, -1) / len(user_logs))

    df_log_weight = pd.DataFrame(
        np.arange(USER_LOG_LENGTH, 0, -1) ** 2 / USER_LOG_LENGTH ** 2,  columns=['weight']).fillna(0)

    df_user_logs['weight'] = 0.0

    for idx in range(USER_LOG_LENGTH):
        weight = df_log_weight.at[idx, 'weight']

        for t in user_logs[idx]:
            df_user_logs.at[t, 'cnt'] = df_user_logs.at[t, 'cnt'] + 1
            df_user_logs.at[t, 'weight'] = df_user_logs.at[t,
                                                           'weight'] + weight
    df_user_logs['freq'] = df_user_logs['cnt'] / USER_LOG_LENGTH
    df_user_logs['freq'] = df_user_logs['freq'].fillna(0)
    df_user_logs['value'] = df_user_logs['weight'] * df_user_logs['freq']

    return df_user_logs


@api_view(['GET'])
def recommend(request, memberId):
    # 멤버가 좋아하는 맥주 태그
    member = get_object_or_404(Member, pk=memberId)
    beer_ids = create_member_like_beer_list(member)
    df_rate_tag = create_df_rate_tag(member=member)
    fond_tags = create_fond_tags(member=member)

    df_log_value = create_df_log_value(memberId)
    df_like_tag = create_df_like_tag(beer_ids=beer_ids)
    df_evaluation_tag = create_df_evaluation_tag(
        df_like_tag, df_rate_tag, fond_tags)

    df_tag_score = pd.DataFrame()
    df_tag_score['score'] = df_evaluation_tag['value'] + df_log_value['value']

    beer_scores = pd.DataFrame(0, index=np.arange(
        1, BEER_TAG_LENGTH + 1), columns=['score'])

    for idx in range(1, BEER_TAG_LENGTH + 1):
        for tag in beer_tags.get(idx):
            beer_scores.at[idx, 'score'] = beer_scores.at[idx,
                                                          'score'] + df_tag_score.at[tag, 'score']
        beer_scores.at[idx, 'score'] = beer_scores.at[idx,
                                                      'score'] / len(beer_tags.get(idx))

    if (beer_scores['score'] == 0).all():
        return Response(status=status.HTTP_400_BAD_REQUEST)

    beer_scores = beer_scores.drop(beer_ids)

    recommend_beers = list(beer_scores.sort_values(
        by=['score'], axis=0, ascending=False)[:4].index.values)

    response = {
        "recommend": recommend_beers
    }

    return Response(response, status=status.HTTP_200_OK)
