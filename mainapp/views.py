from django.shortcuts import render, redirect, get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, logout, login

from sql_app.crud import *

from sql_app.mission_files import *

from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from django.conf import settings
from django.core.mail import send_mail
from django.http import HttpResponse, JsonResponse,Http404, FileResponse
import re
import json


def listfunc(request):
    # TODO: 列出所有任务，支持按状态筛选，按时间排序
    username = request.user
    user = User.objects.get(username=username)
    tasks = get_all_task()
    # print("tasks:",tasks)
    objs = {
        "tasks":tasks,
    }
    return render(request, 'list.html', objs)

def list_ajax(request):
    a={
        "test":555
    }
    return HttpResponse(json.dumps(a), content_type='application/json')

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
    request_tasks = get_request_task_info(user.id)
    # print("user_tasks",user_tasks)
    # print(user_info)
    # print("tel:",user_info.tel)
    # print("points",user_info.points)
    tel=user_info.tel

    #返回用户头像
    por = query_portrait(user.id)
    update_portrait_files(user.id, por)
    
    if por == '':
        porpath = '/media_url/necoru.jpg'
    porpath = '/media_url/'  + por
    
        
    objs = {
        "username": user_info.nickname,
        "tel":tel,
        "myTasks":user_tasks,
        "requests": request_tasks,
        "points":user_info.points,
        "credits":user_info.credits,
        "portrait": porpath
    }

    return render(request, 'profile.html', objs)

def portrait_upload(request):
    user_name = request.user
    user = User.objects.get(username = user_name)
    por = query_portrait(user.id)
    update_portrait_files(user.id, por)
    
    if por == '':
        porpath = '/media_url/necoru.jpg'
    porpath = '/media_url/'  + por
    objs = {
        "portrait" : porpath
    }
    if request.method == 'POST':
        
        file = request.FILES.get("portraitfile")
        filename = file.name
        q = query_portrait(user.id)
        if q != '':
            delete_portrait_file(user.id, q)
        upload_portrait(user.id, filename, file)
        update_portrait_files(user.id,filename)
        return redirect('profile')
    return render(request, 'upload_portrait.html', objs)
        



def hwfunc(request):
    por = ''
    if (request.user):
        username = request.user
        user = User.objects.get(username = username)
        por = query_portrait(user.id)
        update_portrait_files(user.id, por)
    
    if por == '':
        porpath = '/media_url/necoru.jpg'
    porpath = '/media_url/'  + por
    objs = {
        "portrait" : porpath
    }
    return render(request, 'hw.html', objs)


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


def detailfunc(request, task_id):
    # TODO: 任务详情
    objs = {
        "file":"filepath",
    }
    username = request.user
    user = User.objects.get(username = username)
    task = get_task_by_task_id(task_id)
    # def download_file_path(username, user_id, task_state, task_id):
    objs = {
        "task":task
    }       #
    return render(request, 'detail.html', objs)

def detail_request_func(request, pk):
    # TODO: 任务详情
    objs = {
        "file":"filepath",
    }
    username = request.user
    user = User.objects.get(username = username)
    task = get_task_by_task_id(pk)
            # def download_file_path(username, user_id, task_state, task_id):
    objs = {
        "task":task
    }       #
    return render(request, 'detail.html', objs)

def file_download(request,task_id):
    username = request.user
    user = User.objects.get(username = username)
    #def download_file_path(username, user_id, task_state, task_id):
    file_path = download_file_path(user.username,user.id,1,task_id)
    # print("file_path",file_path)
    try:
        response = FileResponse(open(file_path, 'rb'))
        response['content_type'] = "application/octet-stream"
        response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)
        return response
    except Exception:
        raise Http404
    
def file_download_2(request,task_id):
    username = request.user
    user = User.objects.get(username = username)
    #def download_file_path(username, user_id, task_state, task_id):
    file_path = download_file_path(user.username,user.id,0,task_id)
    # print("file_path",file_path)
    try:
        response = FileResponse(open(file_path, 'rb'))
        response['content_type'] = "application/octet-stream"
        response['Content-Disposition'] = 'attachment; filename=' + os.path.basename(file_path)
        return response
    except Exception:
        raise Http404

def task_request(request,task_id):
    
    objs = {
        "file":"filepath",
    }
    username = request.user
    user = User.objects.get(username = username)
    task = get_task_by_task_id(task_id)
    req_id = request_task(user.id,task_id)
    # TODO
    
    # print(req_id)
    # def download_file_path(username, user_id, task_state, task_id):
    objs = {
        "task":task
    }       #
    return redirect('profile')

def task_request_pass(request,task_id):
    
    username = request.user
    user = User.objects.get(username = username)
    task_reqs = get_requests_by_task(task_id)
    objs = {
        "task_requests":task_reqs,
    }
    return render(request, 'task_requests.html', objs)
    return redirect('profile')

def front_request_pass(request,req_id):
    allow_request_task(req_id)
    return redirect('profile')

def front_task_upload(request,req_id):
    user_name = request.user
    user = User.objects.get(username = user_name)
    obj={
        "req_id":req_id
    }
    if request.POST:
        file = request.FILES.get("taskfile")
        file_name = file.name
        # print(file.read())
        # print(file_name)
        # file_data = base64.b64encode(file.read())
        # print(file_data)
        # file_url =  'data:image/png;base64,{}'.format(file_data)
        # file_url =  file_data.split(',')[1]
        create_new_user_filefolder(user.id,user.username)
        #filename, username, user_id, task_state, task_id, file_base64s
        upload_file(file_name,user.username,user.id,1,req_id,file)
        # with open(file.name, 'wb') as f:
        #     for i in file:
        #         f.write(i)
        return redirect('profile')
    return render(request, 'task_upload.html', obj)

def getQusetByQuestID(questid):
    # 前端模拟后端，用于调试
    quests_database = [{"quest_type":1,"quest_id":1,
"quest_text":"题目一描述",
"quest_option_num":4,
"quest_musicnum":0,
"quest_options_list":["选项1","选项2","选项3","选项4"],
"quest_musics_list":[],
"quest_pics_path_list":["path1"]
},{"quest_type":1,"quest_id":2,
"quest_text":"题目二描述",
"quest_option_num":4,
"quest_musicnum":0,
"quest_options_list":["选项1","选项2","选项3","选项4"],
"quest_musics_list":[],
"quest_pics_path_list":["path2"]
},{"quest_type":1,"quest_id":3,
"quest_text":"题目三描述",
"quest_option_num":4,
"quest_musicnum":0,
"quest_options_list":["选项1","选项2","选项3","选项4"],
"quest_musics_list":[],
"quest_pics_path_list":["path3"]
},{"quest_type":1,"quest_id":4,
"quest_text":"题目四描述",
"quest_option_num":4,
"quest_musicnum":0,
"quest_options_list":["选项1","选项2","选项3","选项4"],
"quest_musics_list":[],
"quest_pics_path_list":["path4"]
},{"quest_type":1,"quest_id":5,
"quest_text":"题目五描述",
"quest_option_num":4,
"quest_musicnum":0,
"quest_options_list":["选项1","选项2","选项3","选项4"],
"quest_musics_list":[],
"quest_pics_path_list":["path4"]
}]
    for quest in quests_database:
        # print(quest["quest_id"])
        # print(questid)
        if quest["quest_id"] == questid:
            
            return quest
        else:
            moren_quest = {"quest_type":1,"quest_id":0,
"quest_text":"默认描述",
"quest_option_num":4,
"quest_musicnum":0,
"quest_options_list":["选项","选项","选项","选项"],
"quest_musics_list":[],
"quest_pics_path_list":["picpath"]
}
    return moren_quest 

def task_operate_complete(request):
    user_name = request.user
    user = User.objects.get(username = user_name)
    user_id = user.id
    username = user.username
    if request.method == "PUT":
        data = json.loads(request.body)
        print(data)
        task_type = int(data["task_type"])
        if task_type!=2:
            items_answer = data["items_answer"]
            task_id = int(data["task_id"])
            process_answer(items_answer, username, user_id, task_id)
            return JsonResponse({'res':'ok'})
        else:
            task_id = int(data["task_id"])
            task_items_num = int(data["task_items_num"])
            x1_list = data["items_answer_x1"]
            y1_list = data["items_answer_y1"]
            x2_list = data["items_answer_x2"]
            y2_list = data["items_answer_y2"]
            answer_list = []
            for i in range(task_items_num):
                answer=str(x1_list[i])+','+str(y1_list[i])+','+str(x2_list[i])+','+str(y2_list[i])
                answer_list.append(answer)
            print("pic-select answer = ",answer_list)
            process_answer(answer_list, username, user_id, task_id)
            return JsonResponse({'res':'ok'})


def front_task_operate(request,req_id):
    user_name = request.user
    user = User.objects.get(username = user_name)
    user_id = user.id
    username = user.username
    # (username : str, user_id : int, task_id : int) -> quest_list:
    task = process_quest_files(username,user_id,req_id)
    taskname = get_task_by_task_id(req_id).name
    # task = get_task_by_task_id(req_id)
    task_description = task.task_info
    task_item_num = task.quest_num
    task_item_range = []
    quests = []
    print(task.quest_type)
    # print(task.quest_lists)
    for i in range(task_item_num):
        task_item_range.append(i+1)
        quests.append(task.get_Quest_by_questID(i+1))
    # print(quests[0].copy_path)
    # print(quests)
    # for quest in quests:
    #     for i in range(quest.quest_option_num):
    #         if i == 0:
    #             quest.quest_option_nums = [0]
    #         else:
    #             quest.quest_option_nums.append(i)
    obj={
        "task_id":req_id,
        "taskname":taskname,
        "task_type":task.quest_type,
        "task_description":task_description,
        "task_item_num":task_item_num,
        "task_item_range":task_item_range,
        "quests":quests,
    }
    return render(request, 'task_operate.html', obj)


def front_task_upload_finish(request,req_id):
    finish_task(req_id)
    return redirect('profile')

def front_upload_file(request):

    # if request.method == 'POST':
    #     # TODO: 上传任务文件
    #         return render(request, "upload.html", {"message": "OK"})
    # else:
    #     form = UploadFileForm()
    user_name = request.user
    user = User.objects.get(username = user_name)
    # print("user_name:",user_name)
    # print("user.username",user.username)
    # user_info= get_profile_by_user_id(user.id)
    step = 1
    global  taskname
    global  points
    global  taskinfo
    global  tasktype
    # print(user.id)
    if request.POST and 'taskname' in request.POST:
        taskname = request.POST['taskname']
        # points = request.POST['points']
        # print(taskname)
        points = request.POST['points']
        taskinfo = request.POST['description']
        tasktype = request.POST['type']
        if tasktype == '图片识别':
            print(tasktype)
            tasktype = 1
        elif tasktype == '图片框选':
            tasktype = 2
        elif tasktype == '垃圾邮箱识别':
            tasktype = 3
        elif tasktype == '音频识别':
            tasktype = 4
        else:
            print(tasktype)
        # print(points)
        step=2
        # print(points)
    elif request.POST:
        file = request.FILES.get("taskfile")
        file_name = file.name
        tasktype = int(tasktype)
        create_task(user.id,taskname,points,tasktype,taskinfo)
        # print(file_name)
        # file_data = base64.b64encode(file.read())
        # print(file_data)
        # file_url =  'data:image/png;base64,/{}'.format(file_data)
        # file_url =  file_url.split(',')[1]
        # res = {"status": 0, "msg": "图片上传成功", "file_path":file_url}
        task_id = get_taskid_by_name(user.id,taskname)
        create_new_user_filefolder(user.id,user.username)
        #filename, username, user_id, task_state, task_id, file_base64
        upload_file(file_name,user.username,user.id,0,task_id,file)
        # with open(file.name, 'wb') as f:
        #     for i in file:
        #         f.write(i)
        return redirect('profile')
    objs = {
       "step":step,
    }
    return render(request, 'upload.html', objs)

def task_complete_page(request,task_id):
    objs={
        "task_id":task_id
    }
    return render(request, 'task_complete.html', objs)

def front_task_cancel(request,task_id):
    delete_task_by_id(task_id)
    return redirect('profile')

def task_cancel_request(request,req_id):
    user_name = request.user
    user = User.objects.get(username = user_name)
    delete_request(req_id,user.id)
    return redirect('profile')

def front_task_complete(request,task_id):
    accept_task(task_id)
    return redirect('profile')

def setProfilefunc(request):
    user_name = request.user
    user = User.objects.get(username = user_name)
    user_info= get_profile_by_user_id(user.id)


    por = query_portrait(user.id)
    update_portrait_files(user.id, por)
    
    if por == '':
        porpath = '/media_url/necoru.jpg'
    porpath = '/media_url/'  + por

    objs = {
        "username": user_info.nickname,
        "tel":user_info.tel,
        "points":user_info.points,
        "portrait": porpath,
    }

    
    # print(user.id)
    if request.POST:
        username = request.POST['username']
        Telphone = request.POST['Telphone']
        # print(username)
        # print(Telphone)
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

  