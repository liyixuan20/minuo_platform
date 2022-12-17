from django.urls import path
from .views import *
from django.conf import settings
from django.conf.urls.static import static

from django.urls import re_path

urlpatterns = [
    path('list/', listfunc, name='list'),
    path('signup/', signupfunc, name='signup'),
    path('login/', loginfunc, name='login'),
    path('logout/', logoutfunc, name='logout'),
    path('', hwfunc, name='index'),
    path('profile/', profilefunc, name='profile'),
    path('upload/', upload_file, name='upload'),
    path('detail/<int:pk>', detailfunc, name='detail'),

    path('emails/',EmailReceive, name = 'emails'),
    re_path(r'^emails/verification/([a-zA-Z0-9]+)/$',VerifyEmail, name = 'Verify'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)