from django.db import models


class AromaHashTag(models.Model):
    aroma_hash_tag_id = models.BigIntegerField(primary_key=True)
    aroma = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aroma_hash_tag'


class Beer(models.Model):
    beer_id = models.BigIntegerField(primary_key=True)
    content = models.CharField(max_length=255, blank=True, null=True)
    english_name = models.CharField(unique=True, max_length=255)
    beer_name = models.CharField(unique=True, max_length=255)
    photo_path = models.CharField(max_length=255, blank=True, null=True)
    volume = models.FloatField(blank=True, null=True)
    beer_type = models.ForeignKey(
        'BeerType', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'beer'


class BeerHasAromaHashTag(models.Model):
    beer_has_aroma_hash_tag_id = models.BigIntegerField(primary_key=True)
    aroma_hash_tag = models.ForeignKey(
        AromaHashTag, models.DO_NOTHING, blank=True, null=True)
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'beer_has_aroma_hash_tag'


class BeerHasFlavorHashTag(models.Model):
    beer_has_flavor_hash_tag_id = models.BigIntegerField(primary_key=True)
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)
    flavor_hash_tag = models.ForeignKey(
        'FlavorHashTag', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'beer_has_flavor_hash_tag'


class BeerType(models.Model):
    beer_type_id = models.BigIntegerField(primary_key=True)
    detail = models.CharField(max_length=255, blank=True, null=True)
    main = models.CharField(max_length=255)

    class Meta:
        managed = False
        db_table = 'beer_type'


class Comment(models.Model):
    comment_id = models.BigIntegerField(primary_key=True)
    content = models.CharField(max_length=255)
    created_at = models.DateTimeField(blank=True, null=True)
    member = models.ForeignKey(
        'Member', models.DO_NOTHING, blank=True, null=True)
    post = models.ForeignKey('Post', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'comment'


class FlavorHashTag(models.Model):
    flavor_hash_tag_id = models.BigIntegerField(primary_key=True)
    flavor = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'flavor_hash_tag'


# class Follow(models.Model):
#     id = models.BigIntegerField(primary_key=True)
#     following = models.ForeignKey(
#         'Member', models.DO_NOTHING, blank=True, null=True)
#     follow = models.ForeignKey(
#         'Member', models.DO_NOTHING, blank=True, null=True)

#     class Meta:
#         managed = False
#         db_table = 'follow'


class HibernateSequence(models.Model):
    next_val = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hibernate_sequence'


class Member(models.Model):
    member_id = models.BigIntegerField(primary_key=True)
    age = models.IntegerField()
    grade = models.IntegerField()
    name = models.CharField(max_length=255)
    nick_name = models.CharField(unique=True, max_length=10)
    profile_color = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member'


class MemberFondAromaHashTag(models.Model):
    member_fond_aroma_hash_tag_id = models.BigIntegerField(primary_key=True)
    aroma_hash_tag = models.ForeignKey(
        AromaHashTag, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(
        Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member_fond_aroma_hash_tag'


class MemberFondFlavorHashTag(models.Model):
    member_fond_flavor_hash_tag_id = models.BigIntegerField(primary_key=True)
    flavor_hash_tag = models.ForeignKey(
        FlavorHashTag, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(
        Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member_fond_flavor_hash_tag'


class MemberLikeBeer(models.Model):
    member_like_beer_id = models.BigIntegerField(primary_key=True)
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(
        Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member_like_beer'


class MemberLikePost(models.Model):
    member_like_post_id = models.BigIntegerField(primary_key=True)
    member = models.ForeignKey(
        Member, models.DO_NOTHING, blank=True, null=True)
    post = models.ForeignKey('Post', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member_like_post'


class MemberRateBeer(models.Model):
    member_rate_beer_id = models.BigAutoField(primary_key=True)
    rate = models.IntegerField()
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(
        Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'member_rate_beer'


class Photo(models.Model):
    photo_id = models.BigAutoField(primary_key=True)
    data = models.CharField(unique=True, max_length=255, blank=True, null=True)
    post = models.ForeignKey('Post', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'photo'


class Post(models.Model):
    post_id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=2200)
    created_at = models.DateTimeField(blank=True, null=True)
    updated_at = models.DateTimeField(blank=True, null=True)
    beer = models.ForeignKey(Beer, models.DO_NOTHING, blank=True, null=True)
    member = models.ForeignKey(
        Member, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'post'


class RateHasAromaHashTag(models.Model):
    rate_has_aroma_hash_tag_id = models.BigAutoField(primary_key=True)
    aroma_hash_tag = models.ForeignKey(
        AromaHashTag, models.DO_NOTHING, blank=True, null=True)
    member_rate_beer = models.ForeignKey(
        MemberRateBeer, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rate_has_aroma_hash_tag'


class RateHasFlavorHashTag(models.Model):
    rate_has_flavor_hash_tag_id = models.BigAutoField(primary_key=True)
    flavor_hash_tag = models.ForeignKey(
        FlavorHashTag, models.DO_NOTHING, blank=True, null=True)
    member_rate_beer = models.ForeignKey(
        MemberRateBeer, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'rate_has_flavor_hash_tag'


class UserHashtag(models.Model):
    user_hashtag_id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=255, blank=True, null=True)
    post = models.ForeignKey(Post, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_hashtag'
