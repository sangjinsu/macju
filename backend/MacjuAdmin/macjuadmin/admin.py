from django.contrib import admin
from .models import *

# # # Register your models here.

admin.site.register(Member)
admin.site.register(Beer)
admin.site.register(BeerType)
admin.site.register(Post)
admin.site.register(Photo)
admin.site.register(Comment)
admin.site.register(AromaHashTag)
admin.site.register(FlavorHashTag)
admin.site.register(UserHashtag)

# # admin.site.register(BeerHasAromaHashTag)
# # admin.site.register(BeerHasFlavorHashTag)
# # admin.site.register(Follow)
# # admin.site.register(MemberFondAromaHashTag)
# # admin.site.register(MemberFondFlavorHashTag)
# # admin.site.register(MemberLikeBeer)
# # admin.site.register(MemberLikePost)
# # admin.site.register(MemberRateBeer)
# # admin.site.register(RateHasAromaHashTag)
# # admin.site.register(RateHasFlavorHashTag)