from .models import *
from django.contrib.auth.models import User
from .crud import *
from .mission_files import *
from django.contrib import admin
import os
import sys

#查看目前所有的用户
def get_all_user():
    users = User.objects.filter()
    return users


