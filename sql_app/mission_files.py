from .models import *
from django.contrib.auth.models import User
from .database import Task_files
import re
import os
import base64

session = SessionLocal()
#todo: 文件名是否合法
def create_new_user_filefolder(user_id, username):
    #创建文件夹

    if not os.path.exists('./file_storage/' + str(user_id) + "_" + username):
        os.makedirs('./file_storage/' +str(user_id) + "_" + username)
    else:
        print("filefolder already exist")
        return
    return

def delete_user_filefolder(user_id, user_name):
    #删除用户文件夹中所有内容

    dir_path = './file_storage/' + str(user_id) + "_" + user_name
    for root, dirs, files in os.walk(dir_path, topdown=False):
        for f_name in files:
            os.remove(os.path.join(root, f_name))
        for pro_name in dirs:
            os.rmdir(os.path.join(root, pro_name))
    os.rmdir(dir_path)

def get_file_root(user_id, username, task_state): # task_state:是领取的任务还是创建的任务

    if(task_state == 0):#领取的任务
        taskfile = "create_tasks"
    elif(task_state == 1):
        taskfile = "receive_tasks"
 
    root = './file_storage/' + str(user_id) + "_" + username + '/' + taskfile
    return root

def split_path(whole_file_path):
    path, file = os.path.split(whole_file_path)
    if path != '' and path != '/':
        outputs = split_path(path)
    outputs.append(file)
    return outputs

def new_file(filename, root, user_id, task_id):
    #创建task对应的新文件，注意：一个task只能有一个文件
    
    if not os.path.exists(root + '/' + str(task_id)):
        os.makedirs(root + '/' + str(task_id))

    if os.path.exists(root + '/' + str(task_id) + '/' + filename):
        return
    #更新到数据库中
    tsk = Task_files(task_id = task_id, user_id = user_id, file_name = filename)
    session.add(tsk)
    session.commit()
    try:
        f = open(root + '/' + str(task_id) + '/' + filename, 'w')
        f.close()
    except Exception:
        print("create_file error!")
    
    return
    
def upload_file(filename, username, user_id, task_state, task_id, file_base64):
    #先检查是否已经新建了文件
    #task_state 0表示领取的任务 1表示创建的任务
    create_new_user_filefolder(user_id, username)
    root = get_file_root(user_id, username, task_state)
    new_file(filename, root, user_id, task_id)
    
    file_content = ''
    try:
        file_content = base64.b64decode(file_base64).decode()
    except Exception:
        print("decode error")
        return
    
    try:
        f = open(root + '/' + str(task_id) + '/' + filename, 'w', encoding='utf-8')
        f.write(file_content)
        f.close()
    except Exception:
        print("file write error")
        return
    
    return

def download_file(filename, username, user_id, task_state, task_id):
    #下载文件
    root = get_file_root(user_id, username, task_state)
    try:
        f = open(root + '/' + str(task_id) + '/' + filename, encoding='utf-8')
        content = f.read()
        f.close()
        output = base64.b64encode(content.encode()).decode()
        return output
    except Exception:
        print("download error")
        return -1
    
    
   

def get_task_filename(user_id, task_id):
    #根据task id获取用户创建的文件名
    tsk = session.query(Task_files).filter(Task_files.user_id == user_id, Task_files.task_id == task_id).one()
    return tsk.file_name



def delete_file(filename, root, user_id, task_id):
    try:
        os.remove(root+ '/' + str(task_id) + '/' + filename)
        session.query(Task_files).filter(Task_files.task_id == task_id, Task_files.user_id == user_id).delete()
        session.commit()
    except Exception:
        print("delete file error")
        return
    return






