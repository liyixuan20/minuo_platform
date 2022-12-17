from django.urls import path
from .views import *
from django.conf import settings
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
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)