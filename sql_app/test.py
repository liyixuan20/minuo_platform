from crud import *

"""
    simple example
"""
"""
# root(user_id:2)创建一个task
print("root(id:2) creating task")
task_name = input("task name:")
task_reward = input("task reward:")
task_id = create_task(owner_id=2, name=task_name, reward=task_reward)
print(f"task {task_id} created")

# carol(user_id:19)申请领取这个task
print(f"carol(id:19) requesting task {task_id}")
request_id = request_task(user_id=19, task_id=task_id)
print(f"request {request_id} created")

# root允许此次申请
print(f"root allows the request")
allow_request_task(request_id)
print("request allowed")

# carol完成了task
finish_task(task_id=task_id)
print(f"carol finished task {task_id}")


# root验收了task
accept_task(task_id=task_id)
print(f"root accepted task {task_id} finished by carol")
"""



"""
    complicated example 
"""
# root(user_id:2)创建一个task
print("root(id:2) creating task")
task_name = input("task name:")
task_reward = input("task reward:")
task_id = create_task(owner_id=2, name=task_name, reward=task_reward)
print(f"task {task_id} created")

# carol(user_id:19)申请领取这个task
print(f"carol(id:19) requesting task {task_id}")
request_id = request_task(user_id=19, task_id=task_id)
print(f"request {request_id} created")

# eoe(user_id:22)也申请领取这个task
print(f"eoe(id:22) requesting task {task_id}")
request_id_2 = request_task(user_id=22, task_id=task_id)
print(f"request {request_id_2} created")

# root允许eoe的申请（后台会自动拒绝并删除carol的申请）
print(f"root allows the request")
allow_request_task(request_id_2)
print("request allowed")

# eoe完成了task
finish_task(task_id=task_id)
print(f"eoe finished task {task_id}")

# root拒绝验收task，task的状态回到created
reject_task(task_id=task_id)
print(f"root rejected task {task_id} finished by eoe")

# carol(user_id:19)再次申请领取这个task
print(f"carol(id:19) requesting task {task_id}")
request_id_3 = request_task(user_id=19, task_id=task_id)
print(f"request {request_id_3} created")

# root允许此次申请
print(f"root allows the request")
allow_request_task(request_id_3)
print("request allowed")

# carol完成了task
finish_task(task_id=task_id)
print(f"carol finished task {task_id}")


# root验收了task
accept_task(task_id=task_id)
print(f"root accepted task {task_id} finished by carol")