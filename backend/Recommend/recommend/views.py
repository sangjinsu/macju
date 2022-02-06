from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view

from recommend.serializers.beer import BeerSerializer
from .models import Beer, Member, MemberLikeBeer, MemberLikePost
from elasticsearch import Elasticsearch
from pprint import pprint
from pandas import json_normalize


@api_view(['GET'])
def recommend(request, memberId):
    # 멤버가 좋아하는 맥주 태그
    # member = get_object_or_404(Member, pk=memberId)
    # likes = MemberLikeBeer.objects.select_related('beer__beer_id')
    # print(likes.values())

    es = Elasticsearch([{'host': 'i6c107.p.ssafy.io', 'port': '9200'}])
    search_word = 'id:' + memberId

    docs = es.search(
        index='logstash*',
        size=100,
        body={
            "query": {
                "match_phrase": {
                    "message": search_word
                }
            }
        })

    df = json_normalize({"id": 1, "tags": ["Ale", "씁쓸한맛"]})
    print(df)
    return Response()
