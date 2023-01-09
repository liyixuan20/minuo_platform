## 对文件上传等处理的API文档

- [上传文件](#上传文件)

- [下载文件](#下载文件)

- [头像上传](#头像上传)

- [头像更新](#头像更新)

- [查询头像](#查询头像)

- [处理任务文件](#处理任务文件)

- [存储用户作答](#存储用户作答)

  



### 上传文件

<a name="上传文件"></a>

**函数名：upload_file**

**接收参数**

| 类型 | 名称       | 备注 |
| ---- | ---------- | ---- |
| str  | filename   |      |
| str  | username   |      |
| int  | user_id    |      |
| int  | task_state |      |
| int  | task_id    |      |
| file | file       |      |

**返回参数**

| 类型 | 名称 | 备注   |
| ---- | ---- | ------ |
| int  |      | 0:成功 |

### 下载文件

<a name="下载文件"></a>

**函数名：download_file_path**

**接收参数**

| 类型 | 名称       | 备注 |
| ---- | ---------- | ---- |
| str  | username   |      |
| int  | user_id    |      |
| int  | task_state |      |
| int  | task_id    |      |

**返回参数**

| 类型          | 名称 | 备注         |
| ------------- | ---- | ------------ |
| s&#39;t&#39;r |      | 保存文件路径 |



### 头像上传

<a name="头像上传"></a>

**函数名：upload_portrait**

**接收参数**

| 类型 | 名称     | 备注 |
| ---- | -------- | ---- |
| int  | user_id  |      |
| str  | filename |      |
| file | file     |      |

**返回参数**

| 类型 | 名称 | 备注 |
| ---- | ---- | ---- |
|      |      |      |



### 头像更新

<a name="头像更新"></a>

**函数名：update_portrait_files**

**接收参数**

| 类型 | 名称     | 备注 |
| ---- | -------- | ---- |
| int  | user_id  |      |
| str  | filename |      |

**返回参数**

| 类型 | 名称 | 备注 |
| ---- | ---- | ---- |
|      |      |      |



### 查询头像

<a name="查询头像"></a>

**函数名：query_portrait**

查询用户已有的头像文件

**接收参数**

| 类型 | 名称    | 备注 |
| ---- | ------- | ---- |
| int  | user_id |      |

**返回参数**

| 类型 | 名称 | 备注                             |
| ---- | ---- | -------------------------------- |
| str  |      | 返回文件名，查询不到返回空字符串 |





### 处理任务文件

<a name="处理任务文件"></a>

**函数名：process_quest_files**

处理用户提交的任务文件，发送给前端，使其能以gui形式展示

**接收参数**

| 类型 | 名称     | 备注 |
| ---- | -------- | ---- |
| str  | username |      |
| int  | user_id  |      |
| int  | task_id  |      |

**返回参数**

| 类型       | 名称 | 备注 |
| ---------- | ---- | ---- |
| quest_list |      |      |



### quest_list 类

存储整个任务信息的抽象结构

| 成员变量    | 类型             | 备注     |
| ----------- | ---------------- | -------- |
| quest_lists | List[quest_info] |          |
| quest_num   | int              | 题目数   |
| quest_type  | int              | 任务类型 |
| task_id     | int              |          |
| task_info   | str              | 任务描述 |

| 方法                 | 输入参数 | 返回值       |
| -------------------- | -------- | ------------ |
| get_Quest_by_questID | questid  | quest_info类 |



### quest_info 类

| 成员变量         | 类型      | 描述                               |
| ---------------- | --------- | ---------------------------------- |
| quest_id         | int       | 第几个题目                         |
| quest_text       | str       | 题目描述                           |
| quest_option_num | int       | 几个选项                           |
| quest_musicnum   | str       | 音频文件数量                       |
| option_list      | List[str] | 选项内容                           |
| src_list         | List[str] | 源文件地址（前端不会用到）         |
| copy_path        | List[str] | 资源文件地址（存放图片和音频路径） |





### 存储用户作答

<a name="存储用户作答"></a>

**函数名：process_answer**

处理用户提交的任务作答，以文件形式存储到服务器中

**接收参数**

| 类型      | 名称     | 备注 |
| --------- | -------- | ---- |
| List[str] | answer   |      |
| str       | username |      |
| int       | user_id  |      |
| int       | task_id  |      |

**返回参数**

| 类型 | 名称 | 备注 |
| ---- | ---- | ---- |
|      |      |      |




