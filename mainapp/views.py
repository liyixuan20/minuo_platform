from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login

from sql_app.crud import *

from sql_app.mission_files import *

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse
import re
import base64


def listfunc(request):
    # TODO: 列出所有任务，支持按状态筛选，按时间排序
    username = request.user
    user = User.objects.get(username=username)
    tasks = get_all_task()
    print("tasks:",tasks)
    objs = {
        "tasks":tasks,
    }
    return render(request, 'list.html', objs)


def profilefunc(request):
    # TODO: 用户详细信息，有修改头像、密码的入口
    # 列出属于该用户的任务（发布和认领的） get_task_by_user
    username = request.user
    user = User.objects.get(username = username)
    # print(user)
    # print(user.username)
    # print(user.id)
    user_info= get_profile_by_user_id(user.id)
    user_tasks = get_tasks_by_owner_id(user.id)
    print("user_tasks",user_tasks)
    print(user_info)
    print("tel:",user_info.tel)
    # print("points",user_info.points)
    tel=user_info.tel
    objs = {
        "username": user_info.nickname,
        "tel":tel,
        "myTasks":user_tasks
    }
    return render(request, 'profile.html', objs)


def hwfunc(request):
    return render(request, 'hw.html', {})


def signupfunc(request):
    # TODO: 收集email和电话号码（email要验证）
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        password2 = request.POST['password2']
        if not password == password2:
            return render(request, 'signup.html', {'message': 'Passwords of 2 input not match.'})
        message = "OK, Please log in."
        try:
            user = User.objects.create_user(
                username=username, password=password)
            create_profile(user_id=user.id)
            # change_profile_name(user.id,"moren")
            # change_profile_tel(user.id,"188********")
        except Exception as e:
            # messages.error(request, 'Duplicated user name.')
            message = e
        finally:
            if message == "OK, Please log in.":
                return redirect('login')
            else:
                return render(request, "signup.html", {"message": message})

    return render(request, 'signup.html', {})


def loginfunc(request):
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('profile')
        else:
            print('Not logged in')
            return render(request, 'login.html', {'message': 'Wrong username or password.'})
    return render(request, 'login.html', {})


def logoutfunc(request):
    # TODO: logout页面
    logout(request)
    return redirect('login')


def uploadfunc(request):
    # TODO: 上传文件
    if request.method == 'POST':
        pass
    return render(request, 'upload.html', {})


def detailfunc(request, pk):
    # TODO: 任务详情
    objs = {

    }
    username = request.user
    user = User.objects.get(username = username)
    tasks = get_tasks_by_owner_id(user.id)
    for task in tasks:
        if task.name == 'task_text16':
            # def download_file(filename, username, user_id, task_state, task_id):
            base64_file = download_file(task.name,user.username,user.id,1,task.id)
            print(task.name) 
            print(user.username)
            print(user.id)
            print(task.id)
            print(base64_file)
            objs = {
                "file":base64_file,
                "task":task
            }
    return render(request, 'detail.html', objs)

def front_upload_file(request):

    # if request.method == 'POST':
    #     # TODO: 上传任务文件
    #         return render(request, "upload.html", {"message": "OK"})
    # else:
    #     form = UploadFileForm()
    user_name = request.user
    user = User.objects.get(username = user_name)
    print("user_name:",user_name)
    print("user.username",user.username)
    # user_info= get_profile_by_user_id(user.id)
    step = 1
    global  taskname
    # print(user.id)
    if request.POST and 'taskname' in request.POST:
        taskname = request.POST['taskname']
        # points = request.POST['points']
        print(taskname)
        points = request.POST['points']
        print(points)
        create_task(user.id,taskname,points)
        step=2
        # print(points)
    elif request.POST:
        file = request.FILES.get("taskfile",None)
        file_name = file.name
        print(file_name)
        file_data = base64.b64encode(file.read())
        file_url =  'data:image/png;base64,{}'.format(file_data)
        file_url =  file_url.replace("b'",'').replace("'", '')
        res = {"status": 0, "msg": "图片上传成功", "file_path":file_url}
        task_id = get_taskid_by_name(user.id,taskname)
        create_new_user_filefolder(user.id,user.username)
        #filename, username, user_id, task_state, task_id, file_base64
        upload_file(file_name,user.username,user.id,1,task_id,file_data)
        # with open(file.name, 'wb') as f:
        #     for i in file:
        #         f.write(i)
        return redirect('profile')
    objs = {
       "step":step,
    }
    return render(request, 'upload.html', objs)

def setProfilefunc(request):
    user_name = request.user
    user = User.objects.get(username = user_name)
    user_info= get_profile_by_user_id(user.id)
    objs = {
        "username": user_info.nickname,
        "tel":user_info.tel,
        "points":user_info.points,
    }
    # print(user.id)
    if request.POST:
        username = request.POST['username']
        Telphone = request.POST['Telphone']
        print(username)
        print(Telphone)
        change_profile_name(user.id,username)
        change_profile_tel(user.id,Telphone)
        change_profile_points(user.id,20)
        return redirect('profile')
    return render(request, 'setProfile.html',objs)

def UploadFileForm(request):
    
    return



# ---------------------邮箱验证--------------------------------
#验证成功的user is_active = 1
def generate_verify_email_url(user):

    EMAIL_VERIFY_URL = 'http://82.157.251.139:3306/emails/verification'
    s = Serializer(settings.SECRET_KEY, 60 * 60 * 24)
    data = {'user_id' : user.id, 'email' : user.email}
    token = s.dumps(data)
    print(type(token))
    return EMAIL_VERIFY_URL + '?token=' + token.decode()

def check_verify_email_token(token):
    s = Serializer(settings.SECRET_KEY, 60 * 60 * 24)
    try:
        data = s.loads(token)
    except :
        return None
    else:
        user_id = data.get('user_id')
        email = data.get('email')
        try:
            user = User.objects.get(id = user_id, email = email)
        except User.DoesNotExist:
            return None
        else:
            return user

def send_verify_email(emails, verify_url):
    subject = "米诺众包平台邮箱验证"
    html_message = '<p>您的邮箱为：%s,请点击链接激活邮箱</p>'\
                   '<p><a href = "%s">%s</a></p>' %(emails, verify_url, verify_url)
    try:
        send_mail(subject, '', settings.EMAIL_FROM, [emails], html_message = html_message)
    except  Exception as e:
        print(e)


def EmailReceive(request):
    if request.method == 'POST':
        email = request.POST['email']
        username = request.POST['username']
        if not re.match(r'^[a-z0-9][\w\.\-]*@[a-z0-9\-]+(\.[a-z]{2,5}){1,2}$', email):
            return HttpResponse('邮箱格式错误')

        try:
            user = User.objects.get(username = username)
            user.email = email
            user.save()
        except Exception as e:
            return HttpResponse('user error')
        verify_url = generate_verify_email_url(user)  

        send_verify_email(email, verify_url)

        return JsonResponse({'code':200, 'errmsg':'ok'})
    else:
        HttpResponse('未接收到邮箱')
    
def VerifyEmail(request):
    if request.method == 'GET':
        token = request.GET['token']

        if not token:
            return HttpResponse('缺少token参数')
        user = check_verify_email_token(token)
        if not user:
            return HttpResponse('无效token')
        try:
            user.is_active = True
            user.save()
        except Exception as e:
            return HttpResponse('激活邮箱失败')
        
        return redirect('profile')

