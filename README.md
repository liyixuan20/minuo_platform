# README

## 用docker-compose的开发流程

### 构建、运行
docker-compose up -d

### 接入shell
docker-compose exec web /bin/bash

### 查看log
docker-compose logs --tail=10

## NOTICE

直接运行`py sql_app/test.py`测试和运行`docker-compose`部署时，`sql_app`目录下的**同目录**import的写法不一样

直接运行py：`from models import *, from database import Base, SessionLocal`

docker部署：`from .models import *, from .database import Base, SessionLocal`

记得改，不然会报错

## API

### API列表

- [获取用户信息](#获取用户信息)
- [获取用户任务列表](#获取用户任务列表)
- [获取用户发布的任务](#获取用户发布的任务)
- [获取用户任务列表](#获取用户任务列表)
- [获取用户任务列表](#获取用户任务列表)
- [获取用户任务列表](#获取用户任务列表)
- [获取用户任务列表](#获取用户任务列表)
- [获取用户任务列表](#获取用户任务列表)

### 获取用户信息

<a name="获取用户信息"></a>

**函数名：get_profile_by_user_id**

**接收参数**

| 类型 | 名称    | 备注   |
| ---- | ------- | ------ |
| int  | user_id | 用户id |

**返回参数**

| 类型                 | 名称 | 备注                                                         |
| -------------------- | ---- | ------------------------------------------------------------ |
| QuerySet（类似List） |      | 返回用户信息，包括user_id(int)、points(int)、tel(char 11位)、create_at(timestamp)、update(timestamp) |

### 获取用户任务列表

**函数名：get_task_by_id**

**接收参数**

| 类型 | 名称 | 备注   |
| ---- | ---- | ------ |
| int  | id   | 任务id |

**返回参数**

| 类型     | 名称 | 备注                                                         |
| -------- | ---- | ------------------------------------------------------------ |
| QuerySet |      | 返回任务列表，包括owner_id(int) name(char) reward(int) create_at(timestamp) update_at(timestamp) status(int) |

### 获取用户发布的任务

**函数名：get_task_owner_id**

**接收参数**

| 类型 | 名称     | 备注         |
| ---- | -------- | ------------ |
| int  | owner_id | 即拥有者的id |

**返回参数**

| 类型     | 名称 | 备注                                                         |
| -------- | ---- | ------------------------------------------------------------ |
| QuerySet |      | 返回任务列表，包括owner_id(int) name(char) reward(int) create_at(timestamp) update_at(timestamp) status(int) |

### 获取用户领取的任务

**函数名：get_tasks_by_receiver_id**

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | user_id |      |

**返回参数**

| 类型     | 名称 | 备注                                                         |
| -------- | ---- | ------------------------------------------------------------ |
| QuerySet |      | 返回所有任务列表，每个任务包括owner_id(int) name(char) reward(int) create_at(timestamp) update_at(timestamp) status(int) |

### 获取任务的领取请求

**函数名：get_requests_by_task**

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | task_id |      |

**返回参数**

| 类型     | 名称 | 备注                                                   |
| -------- | ---- | ------------------------------------------------------ |
| QuerySet |      | 返回任务请求，包括task_id user_id create_at(timestamp) |



### 创建用户信息

**函数名：create_profile**

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | user_id |      |

**返回参数**

| 类型 | 名称 | 备注           |
| ---- | ---- | -------------- |
| NULL |      | 在数据库中创建 |

### 创建任务

**函数名：create_task**

**接收参数**

| 类型  | 名称     | 备注 |
| ----- | -------- | ---- |
| int   | owner_id |      |
| char* | name     |      |
| int   | reward   |      |

**返回参数**

| 类型 | 名称 | 备注 |
| ---- | ---- | ---- |
| NULL |      |      |

### 发送领取任务申请

**函数名：request_task**

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | user_id |      |
| int  | task_id |      |

**返回参数**

| 类型     | 名称 | 备注           |
| -------- | ---- | -------------- |
| QuerySet |      | 返回request_id |

### 允许通过任务申请

**函数名：allow_request_task**

**接收参数**

| 类型 | 名称       | 备注 |
| ---- | ---------- | ---- |
| int  | request_id |      |

**返回参数**

| 类型 | 名称 | 备注                     |
| ---- | ---- | ------------------------ |
| NULL |      | 在数据库中新增receiver行 |

### 拒绝验收任务

**函数名：reject_task**

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | task_id |      |

**返回参数**

| 类型 | 名称 | 备注                                     |
| ---- | ---- | ---------------------------------------- |
| NULL |      | 重设task为created、标记receive为rejected |

### 完成任务

**函数名：finish_task**

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | task_id |      |

**返回参数**

| 类型 | 名称 | 备注 |
| ---- | ---- | ---- |
| NULL |      |      |



### 验收完成的任务

**函数名：get_task_by_id**

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | task_id |      |

**返回参数**

| 类型 | 名称 | 备注                           |
| ---- | ---- | ------------------------------ |
| NULL |      | 数据库中更改task 、receive状态 |

### 重置任务状态
**函数名：backtrack_task**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | task_id |      |

**返回参数**

| 类型 | 名称 | 备注                                                         |
| ---- | ---- | ------------------------------------------------------------ |
| NULL |      | 数据库中重设task为created，将与该task有关的所有receive设为异常中断 |





## URLS

- / 主页，对应hw.html，介绍网站功能
- list/ 任务列表，展示所有发布的任务
- signup/ 注册，提交注册的post请求之后会自动跳转到登录界面 （注册时会生成一条User和Profile）
- login/ 登录
- profile/ 个人中心
  - 以上用QuerySet的filter都可以找到，我已经定义好userid123列了
- upload/ 发布任务用

## 其他

在整体流程控制上，我们认为发布者是可信的，领取者是不可信的。领取者可能领取任务之后一直不做 or 乱做，发布者有权拒绝领取者的提交或者在用户提交之前终止任务，将任务回溯到新发布的状态。
