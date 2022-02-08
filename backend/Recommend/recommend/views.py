from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from .models import AromaHashTag, Beer, BeerHasAromaHashTag, BeerHasFlavorHashTag, BeerType, FlavorHashTag, Member, MemberFondAromaHashTag, MemberFondFlavorHashTag, MemberLikeBeer, MemberLikePost, MemberRateBeer
from elasticsearch import Elasticsearch
import pandas as pd
import numpy as np

LOSS_AVERSION = 2.3
FOND_WEIGHT = 3

# data to dataframe
aromaHashTags = pd.DataFrame.from_records(
    AromaHashTag.objects.all().values('aroma'))
flavorHashTags = pd.DataFrame.from_records(
    FlavorHashTag.objects.all().values('flavor'))
beerTypes = pd.DataFrame.from_records(
    BeerType.objects.all().values('main'))


# 인덱스 1부터
aromaHashTags.index = aromaHashTags.index + 1
flavorHashTags.index = flavorHashTags.index + 1
beerTypes.index = beerTypes.index + 1

aromas = aromaHashTags['aroma'].tolist()
flavors = flavorHashTags['flavor'].tolist()
beer_types = np.unique(beerTypes['main']).tolist()

tags = aromas + flavors + beer_types

beer_tags = dict()
beers = Beer.objects.all()

for beer in beers:
    beer_tags.setdefault(beer.beer_id, [])
    beer_tags[beer.beer_id].append(beerTypes.at[beer.beer_type_id, 'main'])

    beerHasAromaHashTags = BeerHasAromaHashTag.objects.filter(beer=beer).all()
    beerHasFlavorHshTags = BeerHasFlavorHashTag.objects.filter(beer=beer).all()

    for beerHasAromaHashTag in beerHasAromaHashTags:
        beer_tags[beer.beer_id].append(
            aromaHashTags.at[beerHasAromaHashTag.aroma_hash_tag_id, 'aroma'])
    for beerHasFlavorHashTag in beerHasFlavorHshTags:
        beer_tags[beer.beer_id].append(
            flavorHashTags.at[beerHasFlavorHashTag.flavor_hash_tag_id, 'flavor'])


def create_tag_df():
    return pd.DataFrame(np.zeros(len(tags)),
                        columns=['cnt'], index=tags)


def count_tag(df, tag):
    df.at[tag, 'cnt'] = df.at[tag, 'cnt'] + 1


def add_tag_score(df, tag, score):
    df.at[tag, 'total'] = df.at[tag, 'total'] + score


def create_df_like_tag(member):
    memberLikeBeers = list(MemberLikeBeer.objects.filter(
        member=member).select_related('beer').values('beer_id').all())

    beer_ids = list(
        map(lambda memberLikeBeer: memberLikeBeer.get('beer_id'), memberLikeBeers))

    df_tag = create_tag_df()

    for beer_id in beer_ids:
        beer_tag = beer_tags.get(beer_id)
        for tag in beer_tag:
            count_tag(df_tag, tag)

    df_tag['freq'] = df_tag['cnt'] / len(beer_ids)

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


@api_view(['GET'])
def recommend(request, memberId):
    # 멤버가 좋아하는 맥주 태그
    member = get_object_or_404(Member, pk=memberId)

    df_like_tag = create_df_like_tag(member=member)
    df_rate_tag = create_df_rate_tag(member=member)
    fond_tags = create_fond_tags(member=member)

    df_evaluation_tag = pd.DataFrame()
    df_evaluation_tag['value'] = df_like_tag['freq'] + df_rate_tag['score']
    print(df_evaluation_tag)
    for fond_tag in fond_tags:
        if df_evaluation_tag.at[fond_tag, 'value'] > 0:
            df_evaluation_tag.at[
                fond_tag, 'value'] = df_evaluation_tag.at[fond_tag, 'value'] * FOND_WEIGHT
    print(df_evaluation_tag)
    # print(beer.beer_type_id)
    # beerType = BeerType.objects.filter(beer_type_id=beer.beer_type_id).all()
    # print(beerType.first().main)

    # 태그 연산
    # df_tag = create_tag_df()
    # df_tag.at['무향', 'cnt'] = df_tag.at['무향', 'cnt'] + 1
    # df_tag['freq'] = df_tag['cnt'] / 5

    # ES 로그 조회
    # es = Elasticsearch([{'host': 'i6c107.p.ssafy.io', 'port': '9200'}])
    # search_word = 'id:' + memberId

    # docs = es.search(
    #     index='logstash*',
    #     size=100,
    #     body={
    #         "query": {
    #             "match_phrase": {
    #                 "message": search_word
    #             }
    #         }
    #     })

    # df = json_normalize({"id": 1, "tags": ["Ale", "씁쓸한맛"]})
    # print(df)
    return Response()
