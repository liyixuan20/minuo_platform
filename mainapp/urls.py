from django.urls import path
from .views import *
from django.conf import settings
<<<<<<< HEAD
from django.urls import re_path
=======
>>>>>>> a29e4f55d232985d91afca18827cfc20414368ed
from django.conf.urls.static import static

urlpatterns = [
    path('list/', listfunc, name='list'),
    path('signup/', signupfunc, name='signup'),
    path('login/', loginfunc, name='login'),
    path('logout/', logoutfunc, name='logout'),
    path('setProfile/', setProfilefunc, name='logout'),
    path('', hwfunc, name='index'),
    path('profile/', profilefunc, name='profile'),
    path('upload/', upload_file, name='upload'),
    path('detail/<int:pk>', detailfunc, name='detail'),
<<<<<<< HEAD
    path('emails/',EmailReceive, name = 'emails'),
    re_path(r'^emails/verification/([a-zA-Z0-9]+)/$',VerifyEmail, name = 'Verify'),
=======
>>>>>>> a29e4f55d232985d91afca18827cfc20414368ed
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)