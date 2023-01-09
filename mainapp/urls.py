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
    path('file_download_2/<task_id>/', file_download_2, name='file_download_2'),
    path('task_request/<task_id>/', task_request, name='task_request'),
    path('task_request_pass/<task_id>/', task_request_pass, name='task_request_pass'),
    path('request_pass/<req_id>/', front_request_pass, name='front_request_pass'),
    path('task_operate/<req_id>/', front_task_operate, name='front_task_operate'),
    path('task_upload/<req_id>/', front_task_upload, name='front_task_upload'),
    path('task_upload_finish/<req_id>/', front_task_upload_finish, name='front_task_upload_finish'),
    path('task_complete_page/<task_id>/', task_complete_page, name='task_complete_page'),
    path('task_complete_finish/<task_id>/', front_task_complete, name='front_task_complete'),
    path('task_cancel/<task_id>/', front_task_cancel, name='front_task_cancel'),
    path('task_cancel_request/<req_id>/', task_cancel_request, name='task_cancel_request'),
    path('receive_list/<task_id>/', get_receive_list, name = 'receive_list' ),
    path('receive_download/<task_id>/', receive_download, name = 'receive_download' ),
    re_path(r'^list_ajax/$',list_ajax,name = 'list_ajax'),
    path("task_operate_complete/",task_operate_complete,name="task_operate_complete"),
    path('upload_portrait/', portrait_upload, name = 'upload_portrait'),
    re_path(r'^emails/verification/([a-zA-Z0-9]+)/$',VerifyEmail, name = 'Verify'),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)