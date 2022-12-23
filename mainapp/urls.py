from django.urls import path
from .views import *
from django.conf import settings
from django.urls import re_path
from django.conf.urls.static import static

urlpatterns = [
    path('list/', listfunc, name='list'),
    path('signup/', signupfunc, name='signup'),
    path('login/', loginfunc, name='login'),
    path('logout/', logoutfunc, name='logout'),
    path('setProfile/', setProfilefunc, name='logout'),
    path('', hwfunc, name='index'),
    path('profile/', profilefunc, name='profile'),
    path('upload/', front_upload_file, name='upload'),
     path('detail/<task_id>', detailfunc, name='detail'),
    path('detail_request/<int:pk>', detail_request_func, name='detail_request'),
    path('emails/',EmailReceive, name = 'emails'),
    path('file_download/<task_id>/', file_download, name='file_download'),
    path('task_request/<task_id>/', task_request, name='task_request'),
    re_path(r'^emails/verification/([a-zA-Z0-9]+)/$',VerifyEmail, name = 'Verify'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)