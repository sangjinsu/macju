from django.db import models


class AromaHashTag(models.Model):
    aroma_hash_tag_id = models.BigIntegerField(primary_key=True)
    aroma = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'aroma_hash_tag'


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


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
    en_detail = models.CharField(max_length=255, blank=True, null=True)
    en_main = models.CharField(max_length=255)
    ko_detail = models.CharField(max_length=255, blank=True, null=True)
    ko_main = models.CharField(max_length=255)

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


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey(
        'DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class FlavorHashTag(models.Model):
    flavor_hash_tag_id = models.BigIntegerField(primary_key=True)
    flavor = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'flavor_hash_tag'


'''
class Follow(models.Model):
    id = models.BigIntegerField(primary_key=True)
    following = models.ForeignKey(
        'Member', models.DO_NOTHING, blank=True, null=True)
    follow = models.ForeignKey(
        'Member', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'follow'
'''


class HibernateSequence(models.Model):
    next_val = models.BigIntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'hibernate_sequence'


class Member(models.Model):
    member_id = models.BigIntegerField(primary_key=True)
    age = models.IntegerField()
    grade = models.IntegerField()
    intro = models.CharField(max_length=150, blank=True, null=True)
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
    data = models.CharField(unique=True, max_length=255)
    post = models.ForeignKey('Post', models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'photo'


class Post(models.Model):
    post_id = models.BigAutoField(primary_key=True)
    content = models.CharField(max_length=2200)
    created_at = models.DateTimeField(blank=True, null=True)
    # This field type is a guess.
    is_deleted = models.TextField(blank=True, null=True)
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
    is_deleted = models.TextField()  # This field type is a guess.
    updated_at = models.DateTimeField(blank=True, null=True)
    post = models.ForeignKey(Post, models.DO_NOTHING, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_hashtag'
