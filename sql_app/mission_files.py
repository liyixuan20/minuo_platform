from .models import *
from django.contrib.auth.models import User

import re
import os
import base64
import zipfile
import sys
import getpass
import shutil
import pygame
from typing import List, Dict
from .crud import *

session = SessionLocal()
#todo: 文件名是否合法
def create_new_user_filefolder(user_id, username):
    #创建文件夹

    if not os.path.exists('./file_storage/' + str(user_id) + "_" + username):
        os.makedirs('./file_storage/' + str(user_id) + "_" + username)
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

    if(task_state == 0):#创建的任务
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

def get_task_filename(user_id, task_id, task_state):
    #根据task id获取用户创建的文件名
    tsk = session.query(Task_files).filter(Task_files.user_id == user_id, Task_files.task_id == task_id, Task_files.rec_or_create == task_state).one()
    return tsk.file_name

def new_file(filename, root, user_id, task_id, task_state):
    #创建task对应的新文件，注意：一个task只能有一个文件
    
    if not os.path.exists(root + '/' + str(task_id)):
        os.makedirs(root + '/' + str(task_id))

    if os.path.exists(root + '/' + str(task_id) + '/' + filename):
        return 
    #更新到数据库中
    tsk = Task_files(task_id = task_id, user_id = user_id, file_name = filename, rec_or_create = task_state)
    session.add(tsk)
    session.commit()
    try:
        f = open(root + '/' + str(task_id) + '/' + filename, 'w')
        f.close()
    except Exception:
        print("create_file error!")
        return 
    
    return
    
def upload_file(filename, username, user_id, task_state, task_id, file):
    #先检查是否已经新建了文件
    #task_state 0表示领取的任务 1表示创建的任务
    create_new_user_filefolder(user_id, username)
    root = get_file_root(user_id, username, task_state)
    new_file(filename, root, user_id, task_id, task_state)
    
    file_content = ''
    # file_content = file.read()
    # try:
    #     file_content = base64.b64decode(file_base64).decode()
    # except Exception:
    #     print("decode error")
    #     return -3
    f = open(root + '/' + str(task_id) + '/' + filename, 'wb')
    print("f open success")
    file_content = file.read()
    print("file read success")
    # print(file_content)
    f.write(file_content)
        # for i in file:
        #     print(i)
        #     f.write(i)
    print("f write success")
    f.close()
    # try:
    #     f = open(root + '/' + str(task_id) + '/' + filename, 'w+')
    #     print("f open success")
    #     file_content = file.read()
    #     print("file read success")
    #     print(file_content)
    #     f.write(file_content)
    #     # for i in file:
    #     #     print(i)
    #     #     f.write(i)
    #     print("f write success")
    #     f.close()
    # except Exception:
    #     print("file write error")
    #     return -3
    
    return

def download_file_path(username, user_id, task_state, task_id):
    #下载文件
    filename = get_task_filename(user_id, task_id,task_state)
    
    root = get_file_root(user_id, username, task_state)
    path = root + '/' + str(task_id) + '/' + filename
    """
    try:
        f = open(root + '/' + str(task_id) + '/' + filename, encoding='utf-8')
        content = f.read()
        f.close()
        output = base64.b64encode(content.encode()).decode()
        return output
    except FileNotFoundError:
        print("download error")
        return -3
    """
    return path
   





def delete_file(filename, root, user_id, task_id, task_state):
    try:
        os.remove(root+ '/' + str(task_id) + '/' + filename)
        session.query(Task_files).filter(Task_files.task_id == task_id, Task_files.user_id == user_id, Task_files.rec_or_create == task_state).delete()
        session.commit()
    except Exception:
        print("delete file error")
        return
    return


#--------------------------------上传头像------------------------------------------

def create_user_portrait_file(user_id):
    if not os.path.exists('./portrait_storage/' + str(user_id)):
        os.makedirs('./portrait_storage/' + str(user_id))
    else:
        print("portrait filefolder already exist")
        return
    return 
 
def new_protrait_file(path, user_id, filename):
    #允许多次上传文件
    if not os.path.exists(path):
        os.makedirs(path)

    if os.path.exists(path + '/' + filename):
        return -1
    try:
        f = open(path + '/' + filename, 'w')
        f.close()
    except Exception:
        print("create_file error!")
        return 
    por = Portrait_files(user_id = user_id, file_name = filename)
    session.add(por)
    session.commit()
    return 0


def upload_portrait(user_id, filename, file):
    create_user_portrait_file(user_id)
    root = './portrait_storage/' + str(user_id)
    signal = new_protrait_file(root, user_id, filename)
    if signal == -1:
        delete_portrait_file(user_id, filename)
        new_protrait_file(root, user_id, filename)
    file_content = ''
    # file_content = file.read()
    # try:
    #     file_content = base64.b64decode(file_base64).decode()
    # except Exception:
    #     print("decode error")
    #     return -3
    f = open(root + '/' + filename, 'wb')
    print("f open success")
    file_content = file.read()
    print("file read success")
    # print(file_content)
    f.write(file_content)
        # for i in file:
        #     print(i)
        #     f.write(i)
    print("f write success")
    f.close()
    copy_portrait_files(user_id, filename)
    return

def delete_portrait_file(user_id, filename):
    try:
        os.remove('./portrait_storage/' + str(user_id) + '/' + filename)
        session.query(Portrait_files).filter(Portrait_files.user_id == user_id).delete()
        session.commit()
    except Exception:
        print("delete file error")
        return
    return   

def query_portrait(user_id : int) -> str:
    q = session.query(Portrait_files).filter(Portrait_files.user_id == user_id).one_or_none()
    if q == None:
        t = ''
        return t
    else:
        
        return q.file_name

def copy_portrait_files(user_id, filename):
    src_path = './portrait_storage/' + str(user_id) + '/' +filename
    tar_path = './media/' + filename
    if os.path.exists(tar_path):
        return
    shutil.copyfile(src_path, tar_path)
    print("拷贝文件结束")
    copy_path = '/media_url/' + filename
    return 

def remove_other_portrait(user_id):
    q = session.query(Portrait_files).filter(Portrait_files.user_id == user_id).one_or_none()
    filename = q.file_name
    names = os.listdir('./media/')
    for name in names:
        if name != filename and name != 'necoru.jpg' and name != 'hm1.jpg' and name != 'hm2.jpg' and name != 'hm3.jpg':
            os.remove('./media/' + name)
    return

def update_portrait_files(user_id, filename):
    remove_other_portrait(user_id)
    q = query_portrait(user_id)
    if  (not os.path.exists( './media/' + filename)) and (q != ''):
        copy_portrait_files(user_id, filename)
    
    return

#-------------------------------------------------------------------------------------------------------------
class quest_info:

    def __init__(self,  quest_id:int, quest_text:str, quest_option_num:int=0, quest_musicnum:int = 0 ) -> None:
        
        self.quest_id = quest_id
        self.quest_text = quest_text
        self.quest_option_num = quest_option_num
        #文字选择题的文字描述
        self.quest_description = ''        

        self.quest_musicnum = quest_musicnum
        self.option_list:List[str] = []
        self.src_list:List[str] = []
        self.copy_path:List[str] = []

class quest_list:
    def __init__(self, quest_num:int, quest_type:int, task_id:int = 0) -> None:
        self.quest_lists: List[quest_info] = []
        self.quest_num = quest_num
        self.quest_type = quest_type
        self.task_id = task_id
        self.task_info = ''
        self.task_name = ''

        self.reward = 0
    
    def append_quest(self, quest:quest_info) -> None:
        self.quest_lists.append(quest)
    
    def get_Quest_by_questID(self, id:int) -> quest_info:
        new_quest:quest_info = self.quest_lists[id - 1]
        if new_quest.quest_id == id:
            return new_quest
        else:
            print("Not correct quest")
            return new_quest
    

#-------------------------------------------不同类任务文件处理上传及作答上传--------------------------------------------

def zipfiles(path, filename):
    if not os.path.exists(path +'/' + filename):
        return -1
    if not filename.split('.')[1] == 'zip':
        return -4
    zip_path = path + '/' + filename 
    zipped = zipfile.ZipFile(zip_path)
    save_path = path + '/'
    print("开始解压")
    zipped.extractall(save_path)
    print("解压结束")

    zipped.close()
    return 0

def process_select_img_file(filename, username, user_id, task_state, task_id, quest_type):
    #将压缩包处理成quest及相关数据返回给前端，图像分类任务
    root = get_file_root(user_id, username, task_state)
    path = root + '/' + str(task_id)
    if not os.path.exists(path + '/' + filename):
        print("文件不存在")
    k = zipfiles(path, filename)
    if k == -4:
        print("zip格式错误")
    elif k == -1:
        print("上传的文件不存在")
    
    if not os.path.exists(path + '/' + 'items.txt'):
        print("txt说明文件不存在")
    try: 
        f = open(path + '/' + 'items.txt', encoding = 'utf-8')
    except IOError:
        print("读取文件失败")
    else :
        print("打开文件成功")

    lines = f.readlines()
    quest_num = int(lines[0].strip('\n'))
    que_list = quest_list(quest_num, quest_type)
    for index in range(1, quest_num + 1):
        info = lines[index].strip('\n')
        infos = info.split(',')
        quest_id = int(infos[0])
        quest_text = infos[1]
        option_num = int(infos[2])
        
        quest = quest_info(quest_id, quest_text, option_num)

        for j in range(3, 3 + option_num ):
            quest.option_list.append(infos[j])

        pic_name = infos[3 + option_num]
        pic_path = path + '/src/' + pic_name 
        print("pic_path", pic_path)
        quest.src_list.append(pic_path)
        que_list.append_quest(quest)
    
    return que_list

def process_img_mark_files(filename, username, user_id, task_state, task_id, quest_type):
    #图像标注任务
    root = get_file_root(user_id, username, task_state)
    path = root + '/' + str(task_id)
    if not os.path.exists(path + '/' + filename):
        print("文件不存在")
    k = zipfiles(path, filename)
    if k == -4:
        print("zip格式错误")
    
    if not os.path.exists(path + '/' + 'items.txt'):
        print("txt说明文件不存在")
    try: 
        f = open(path + '/' + 'items.txt', encoding = 'utf-8')
    except IOError:
        print("读取文件失败")
    else :
        print("打开文件成功")

    lines = f.readlines()
    quest_num = int(lines[0].strip('\n'))
    que_list = quest_list(quest_num, quest_type)
    for index in range(1, quest_num + 1):
        info = lines[index].strip('\n')
        infos = info.split(',')
        quest_id = int(infos[0])
        quest_text = infos[1]
        
        
        quest = quest_info(quest_id, quest_text)



        pic_name = infos[2]
        pic_path = path + '/src/' + pic_name 
        quest.src_list.append(pic_path)
        que_list.append_quest(quest)
    
    return que_list

def process_text_select_files(filename, username, user_id, task_state, task_id, quest_type):
    #文字选择任务
    root = get_file_root(user_id, username, task_state)
    path = root + '/' + str(task_id)
    if not os.path.exists(path + '/' + filename):
        print("文件不存在")
    k = zipfiles(path, filename)
    if k == -4:
        print("zip格式错误")
    
    if not os.path.exists(path + '/' + 'items.txt'):
        print("txt说明文件不存在")
    try: 
        f = open(path + '/' + 'items.txt', encoding = 'utf-8')
    except IOError:
        print("读取文件失败")
    else :
        print("打开文件成功")

    lines = f.readlines()
    quest_num = int(lines[0].strip('\n'))
    que_list = quest_list(quest_num, quest_type)
    for index in range(1, quest_num - 1):
        info = lines[index].strip('\n')
        infos = info.split(',')
        quest_id = int(infos[0])
        quest_text = infos[1]
        quest_description = infos[2]
        option_num = int(infos[3])
        
        quest = quest_info(quest_id, quest_text, option_num)
        quest.src_list.append(quest_description)
        for j in range(4, 4 + option_num):
            quest.option_list.append(infos[j])


        que_list.append_quest(quest)
    
    return que_list

def process_select_audio_file(filename, username, user_id, task_state, task_id, quest_type):
    #音频选择任务
    root = get_file_root(user_id, username, task_state)
    path = root + '/' + str(task_id)
    if not os.path.exists(path + '/' + filename):
        print("文件不存在")
    k = zipfiles(path, filename)
    if k == -4:
        print("zip格式错误")
    
    if not os.path.exists(path + '/' + 'items.txt'):
        print("txt说明文件不存在")
    try: 
        f = open(path + '/' + 'items.txt', encoding = 'utf-8')
    except IOError:
        print("读取文件失败")
    else :
        print("打开文件成功")

    lines = f.readlines()
    quest_num = int(lines[0].strip('\n'))
    que_list = quest_list(quest_num, quest_type)
    for index in range(1, quest_num + 1):
        info = lines[index].strip('\n')
        infos = info.split(',')
        quest_id = int(infos[0])
        quest_text = infos[1]
        music_num = int(infos[2])
        option_num = int(infos[3])
        
        quest = quest_info(quest_id, quest_text, option_num, music_num)

        for j in range(4, 4 + music_num ):
            audio_path = path + '/src/' + infos[j]
            quest.src_list.append(audio_path)
        
        for i in range(4 + music_num, 4 + music_num + option_num ):
            quest.option_list.append(infos[i])
        
        

        que_list.append_quest(quest)
    
    return que_list

def copy_quest_files(que_list: quest_list) -> None:
    #copy src文件到media 下
    quest_num:int = que_list.quest_num
    media_path = './media/'
    for i in range(1, quest_num + 1):
        quest:quest_info = que_list.get_Quest_by_questID(i)
        for path in quest.src_list:
            filename = path.split('/')[-1]

            tar = media_path + filename
            copypath = '/media_url/' + filename
            quest.copy_path.append(copypath)
            if os.path.exists(media_path + filename):
                continue
            shutil.copyfile(path, tar)
            
    print("拷贝文件结束")

    return

def delete_copy_files_by_task_id(que_list:quest_list) -> None:
    #删除之前复制过来的文件
    quest_num:int = que_list.quest_num
    for i in range(1, quest_num + 1):
        quest:quest_info = que_list.get_Quest_by_questID(i)
        for path in quest.copy_path:
            os.remove(path)
    print("成功删除完毕")
    return

def process_quest_files(username : str, user_id : int, task_id : int) -> quest_list:
    tsk = get_task_by_task_id(task_id)
    quest_type = tsk.task_type
    task_state = 0
    filename = get_task_filename(user_id, task_id, 0)
    
    if quest_type == 1:
        que_list : quest_list = process_select_img_file(filename, username, user_id, task_state, task_id, quest_type)
    elif quest_type == 2:
        que_list : quest_list = process_img_mark_files(filename, username, user_id, task_state, task_id, quest_type)
    elif quest_type == 3:
        que_list : quest_list = process_text_select_files(filename, username, user_id, task_state, task_id, quest_type)
    elif quest_type == 4:
        que_list : quest_list = process_select_audio_file(filename, username, user_id, task_state, task_id, quest_type)

    que_list.task_id = task_id
    que_list.task_info = tsk.task_info
    que_list.task_name = tsk.name
    que_list.reward = tsk.reward
    copy_quest_files(que_list)
    
    return que_list


#---------------------------------------------提交用户作答-----------------------------------------------------------

def process_select_answer(answer:List[str], username, user_id, task_id) -> None:

    answer_list:List[str] = []
    ans_num = len(answer)
    for index in range(0, ans_num):
        order = str(index + 1)
        line = order + ':' + answer[index] + '\n'
        answer_list.append(line)
    root = get_file_root(user_id, username, 1)
    filename = 'answer_for_%s.txt' % str(task_id)
    task_state = 1
    if os.path.exists(root + '/' + str(task_id) + '/' + filename):
        print("file already exists")
        return
    else:
        new_file(filename, root, user_id, task_id, task_state)
    
    print("创建任务文件成功")

    f = open(root + '/' + str(task_id) + '/' + filename, 'w',encoding="utf-8")
    print("file open success")
    print("answer_list",answer_list)
    f.writelines(answer_list)
    f.close()
    print("写入完毕")
    
    finish_task(task_id)
    return

def process_mark_answer(answer:List[str], username, user_id, task_id) -> None:
    ans_num = len(answer)
    answer_list = []
    for index in range(0, ans_num):
        order = str(index + 1)
        ordinate = answer[index].split(',')
        line = order + ':' + ' ' + '(' + ordinate[0] +','+ ordinate[1] +')' + '(' + ordinate[2] +','+ ordinate[3] +')' + '\n'
        answer_list.append(line)
    root = get_file_root(user_id, username, 1)
    filename = 'answer_for_%s.txt' % str(task_id)
    task_state = 1
    if os.path.exists(root + '/' + str(task_id) + '/' + filename):
        print("file already exists")
        delete_file(filename, root, user_id, task_id, task_state)
    else:
        new_file(filename, root, user_id, task_id, task_state)
    
    print("创建任务文件成功")

    f = open(root + '/' + str(task_id) + '/' + filename, 'w',encoding="utf-8")
    print("file open success")
    print("answer_list",answer_list)
    f.writelines(answer_list)
    f.close()
    print("写入完毕")
    
    finish_task(task_id)
      
    return



def process_answer(answer, username, user_id, task_id):
    tsk = get_task_by_task_id(task_id)
    task_type = tsk.task_type
    print("process_answer")
    print("task_type =",task_type)
    if task_type == 1 or task_type == 3 or task_type == 4:
        print("task_type =",task_type)
        process_select_answer(answer, username, user_id, task_id)
    elif task_type == 2:
        print("process mark answer")
        process_mark_answer(answer,username, user_id, task_id)



#显示用户作答情况
def display_user_answer(user_id, task_id):




    return
    
#—-------------------------------------------后台播放音频-------------------------------------

def audio_play(path:str, volume=0.5):
    src_path = './media/' + path.split('/')[-1]
    pygame.mixer.init()
    pygame.mixer.music.load(src_path)
    pygame.mixer.music.set_volume(volume)
    pygame.mixer.music.play()
    print("playing audio")
    return