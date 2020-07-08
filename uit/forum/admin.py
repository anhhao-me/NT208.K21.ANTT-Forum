from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Users, Subscribers, Topics, Comment, Categories

# Register your models here.
admin.site.register(Users, UserAdmin)
admin.site.register(Categories)
admin.site.register(Topics)
admin.site.register(Comment)
admin.site.register(Subscribers)