from .models import *
from django.contrib.auth.models import User
import os
session = SessionLocal()

def get_profile_by_user_id(user_id):
    return session.query(Profile).filter(Profile.user_id == user_id).one_or_none()



def get_tasks_by_owner_id(owner_id):
    return session.query(Task).filter(Task.owner_id == owner_id).all()

def get_tasks_by_receiver_id(user_id):
    q = session.query(Task, Receive.user_id).join(Task).join(Receive)
    return q.filter(Receive.user_id==user_id).all()

def get_requests_by_task(task_id):
    q = session.query(Request).filter(Request.task_id==task_id).all()
    if q == None:
        return -2
    #返回某任务的所有请求
    return q

def get_task_request_by_user_id(user_id):
    #根据用户id返回该用户的所有用户请求
    req = session.query(Request).filter(Request.user_id == user_id).all()
    return req
def get_task_state(task_id):
    #返回任务状态（1：已领取， 2：已完成， 3：发布方已接收并结算）
    tsk =session.query(Task).filter(Task.id == task_id).one_or_none()
    return tsk.status

def create_profile(user_id):
    pro = session.query(Profile).filter(Profile.user_id == user_id).one_or_none()
    if pro != None:
        return -2
    pf = Profile(user_id=user_id, credits = 0)
    session.add(pf)
    session.commit()
    return 0

def create_task(owner_id, name, reward, task_type, task_info):
    #先查询task是否已经存在
    tk = session.query(Task).filter(Task.name == name, Task.owner_id == owner_id).one_or_none()
    if tk != None:
        return -2
    tsk = Task(owner_id=owner_id, name=name, reward=reward, task_type=task_type, task_info=task_info)
    session.add(tsk)
    session.commit()
    return tsk.id
#task.status表示状态
#0：已创建 1：有领取申请 2：已领取 3：已完成 4：已通过
def request_task(user_id, task_id):
    q = session.query(Request).filter(Request.user_id == user_id, Request.task_id == task_id).one_or_none()
    if q != None:
        return -2
    # 创建request
    req = Request(user_id=user_id, task_id=task_id)
    session.add(req)
    tsk = session.query(Task).filter(Task.id == task_id).one_or_none()
    if tsk.status >= 2:
        return -1 
    elif tsk.status == 0:
        tsk.status = 1
    session.commit()

    return req.id

def allow_request_task(request_id):
    req = session.query(Request).filter(Request.id==request_id).one()
    user_id, task_id = req.user_id, req.task_id
    # 标记task为received
    tsk = session.query(Task).filter(Task.id==task_id)
    tsk.update({Task.status: 2})
    # 删除其他request
    #reqs = session.query(Request).filter(Request.task_id==task_id, Request.user_id != user_id)
    #reqs.delete()
    # 创建receive
    rec = Receive(user_id=user_id, task_id=task_id)
    session.add(rec)
    session.commit()
    return 0

def finish_task(task_id):
    # 标记task为finished
    tsk = session.query(Task).filter(Task.id==task_id)
    tsk.update({Task.status: 3})
    # 标记receive为finished
    rec = session.query(Receive).filter(Receive.task_id==task_id, Receive.status==0)
    rec.update({Receive.status: 1})
    session.commit()
    return 0

def accept_task(task_id):
    # 标记task为accepted

    tsk = session.query(Task).filter(Task.id==task_id).one_or_none()
    
    # 标记receive为accepted
    rec = session.query(Receive).filter(Receive.task_id==task_id, Receive.status==1)
    rec.update({Receive.status: 2})
    # 为receiver发放reward
    reward = session.query(Task.reward).filter(Task.id==task_id).scalar()
    q = session.query(Profile.user_id)

    receiver_id = q.join(Receive, Profile.user_id==Receive.user_id).filter(Receive.task_id==task_id).scalar()
    req = session.query(Request).filter(Request.task_id == task_id, Request.user_id == receiver_id)
    req.delete()
    
    receiver = session.query(Profile).filter(Profile.user_id==receiver_id)
    receiver.update({Profile.points: Profile.points + reward})
    receiver.update({Profile.credits: Profile.credits + 10})
    
    
    tsk.status = 0

    session.commit()
    return 0
def update_task(task_id):
    tsk = session.query(Task).filter(Task.id==task_id).one_or_none()
    reqs = session.query(Request).filter(Request.task_id == task_id).all()
    if tsk.status == 0:
        if reqs != None and reqs != []:
            print("reqs!=None,reqs=",reqs)
            tsk.status = 1
    session.commit()
    return 0

def ultimate_finish_task(task_id):
    #结束任务，不再接收申请
    tsk = session.query(Task).filter(Task.id==task_id).one_or_none()
    tsk.status = 4   
    reqs = session.query(Request).filter(Request.task_id==task_id)
    reqs.delete()
    session.commit()
    return 0

def get_all_receive_info(task_id):
    #返回已经结算完的任务事项
    rec = session.query(Receive).filter(Receive.task_id == task_id).all()
    
    return rec

def reject_task(task_id):
    # 重设task为created
    tsk = session.query(Task).filter(Task.id==task_id)
    tsk.update({Task.status: 0})
    # 标记receive为rejected
    rec = session.query(Receive).filter(Receive.task_id==task_id)
    rec.update({Receive.status: 3})
    session.commit()

def backtrack_task(task_id):
    # 将与该task有关的所有receive设为异常中断
    recs = session.query(Receive).filter(Receive.task_id==task_id)
    recs.update({Receive.status: 4})
    # 重设task为created
    tsk = session.query(Task).filter(Task.id==task_id)
    tsk.update({Task.status: 0})
    session.commit()
    
def get_user_id_by_name(username):
    # 根据用户名来返回user
    user = User.objects.get(username = username)
    return user.id

def change_profile_name(user_id, nickname):
    #修改用户档案中的昵称
    profile = session.query(Profile).filter(Profile.user_id == user_id)
    profile.update({Profile.nickname: nickname})
    session.commit()
    
def change_profile_tel(user_id, tel):
    #修改用户档案中的电话
    profile = session.query(Profile).filter(Profile.user_id == user_id)
    profile.update({Profile.tel:tel})
    session.commit()

def change_profile_points(user_id, points):
    #修改用户档案中的电话
    profile = session.query(Profile).filter(Profile.user_id == user_id)
    profile.update({Profile.points:points})
    session.commit()
def change_profile_email(user_id, email):
    user = User.objects.get(id = user_id)
    user.email = email
    user.save()

def get_all_task():
    #返回已创建的所有任务
    tsk = session.query(Task).all()
    return tsk

def get_taskid_by_name(owner_id, name):
    #根据任务名返回任务id
    tsk = session.query(Task).filter(Task.name == name, Task.owner_id == owner_id).one()
    return tsk.id

def delete_request(task_id, user_id):
    #删除任务申请
    session.query(Request).filter(Request.task_id == task_id, Request.user_id == user_id).delete()

    session.commit()
    return 0
def update_request(task_id, user_id):
    q = session.query(Request).filter(Request.task_id == task_id).all()
    if q == []:
        # tk = session.query(Task).filter(Task.id == task_id).one()
        print("----------------\n")
        print("if q = []")
        tsk = session.query(Task).filter(Task.id == task_id).one_or_none()
        # if tk.statue == 1:
        if tsk.status == 1:
            tsk.status = 0
        elif tsk.status > 1:
            pro = session.query(Profile).filter(Profile.user_id == user_id).one_or_none()
            pro.credits -= 5
            if tsk.status == 3:
                session.query(Receive).filter(Receive.user_id == user_id).delete()
            tsk.status = 0
    session.commit()
    return 0


def delete_all_task():
    #删除所有task（测试用功能）
    session.query(Task).delete()

def get_task_by_task_id(task_id):
    #根据id返回task
    return session.query(Task).filter(Task.id == task_id).one_or_none()
class task_request_info:
    def __init__(self, request_id:int, task_name:str, owner_id:int,  create_at, reward, status,req_id) -> None:
        self.id = request_id
        self.name = task_name
        self.reward = reward
        self.owner_id = owner_id
        self.create_at = create_at
        self.status = status
        self.req_id = req_id

def get_request_task_info(user_id):
    reqs = session.query(Request).filter(Request.user_id == user_id).all()
    tsk = []
    if reqs == None:
        return None
    for req in reqs:
        tk = session.query(Task).filter(Task.id == req.task_id).one_or_none()
        tri = task_request_info(tk.id, tk.name, tk.owner_id, req.create_at, tk.reward, tk.status, req.id)
        tsk.append(tri)
    return tsk
class receive_info:
    def __init__(self,nickname,user_id,credits, create_at, rec_id, task_id, status) -> None:
        self.nickname = nickname
        self.user_id = user_id
        self.credits = credits
        self.create_at = create_at
        self.rec_id = rec_id
        self.task_id = task_id
        self.status = status
        self.owner_id = 0
        self.task_name = ''
        self.task_reward = 0

def get_receive_by_id(rec_id):
    return session.query(Receive).filter(Receive.id == rec_id).one_or_none()

def get_receive_info(task_id):
    recs =get_all_receive_info(task_id)
    rrc = []
    for rec in recs:
        user_info = get_profile_by_user_id(rec.user_id)
        tsk = get_task_by_task_id(rec.task_id)
        rci = receive_info(user_info.nickname, rec.user_id, user_info.credits, rec.create_at, rec.id, rec.task_id, rec.status)
        rrc.append(rci)

    
    return rrc
def get_all_accepted_task(user_id):
    recs = session.query(Receive).filter(Receive.user_id == user_id, Receive.status == 2).all()
    receives = []
    for rec in recs:
        tsk = session.query(Task).filter(Task.id == rec.task_id).one_or_none()
        recei = receive_info("", user_id,0,rec.create_at,  rec.id, tsk.id, tsk.status)
        recei.owner_id = tsk.owner_id
        recei.task_name = tsk.name
        recei.task_reward = tsk.reward
        receives.append(recei)
    return receives
class request_info:
    def __init__(self, req_id, user_id, task_id, nickname, credits) -> None:
        self.id = req_id
        self.user_id = user_id
        self.task_id = task_id
        self.nickname = nickname
        self.credits = credits


def get_request_info(task_id):
    reqs = get_requests_by_task(task_id)
    infos = []
    for req in reqs:
        user_info = get_profile_by_user_id(req.user_id)
        reinfo = request_info(req.id, req.user_id, req.task_id, user_info.nickname, user_info.credits)
        infos.append(reinfo)
        
    return infos