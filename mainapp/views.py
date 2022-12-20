from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login

from sql_app.crud import *


def listfunc(request):
    # TODO: 列出所有任务，支持按状态筛选，按时间排序
    username = request.user
    user = User.objects.get(username=username)
    tasks = get_task_by_id(user.id)
    print("tasks:",tasks)
    objs = {
        # "tasks":tasks,
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
    return render(request, 'detail.html', objs)

def upload_file(request):

    # if request.method == 'POST':
    #     # TODO: 上传任务文件
    #         return render(request, "upload.html", {"message": "OK"})
    # else:
    #     form = UploadFileForm()
    user_name = request.user
    user = User.objects.get(username = user_name)
    # user_info= get_profile_by_user_id(user.id)
    step = 1
    global  taskname
    # print(user.id)
    if request.POST and 'taskname' in request.POST:
        taskname = request.POST['taskname']
        # points = request.POST['points']
        print(taskname)
        step=2
        # print(points)
    elif request.POST and 'points' in request.POST:
        points = request.POST['points']
        print(points)
        create_task(user.id,taskname,points)
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
