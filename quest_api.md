## 后端接口

### **process_quest_files**

(username : str, user_id : int, task_id : int) -> quest_list:

| 变量名   | 类型 |
| -------- | ---- |
| username | str  |
| user_id  | int  |
| task_id  | int  |

**返回值** quest_list类



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
| quest_description| str       | 文本类题目文本
| quest_option_num | int       | 几个选项                           |
| quest_musicnum   | str       | 音频文件数量                       |
| option_list      | List[str] | 选项内容                           |
| src_list         | List[str] | 源文件地址（前端不会用到）         |
| copy_path        | List[str] | 资源文件地址（存放图片和音频路径） |



### delete_copy_files_by_task_id

### (que_list:quest_list)

删除复制过来的资源文件

**输入参数：**quest_list 类









### 任务文件格式要求

**压缩包要求**：.zip格式

**压缩包文件存放路径**：

items.txt

src/

src文件夹存放图片音频文件，items.txt为题目相关信息



**items.txt文件格式**

- **图片选择类：**

- **type：1**

  - 题目数量
  - 题目序号，题目描述，选项个数，选项1，选项2...，图片名称

  

- **图片标注类**：

- **type: 2**

  - 题目数量
  - 题目序号，题目描述，图片名称
  - 题目序号，题目描述，图片名称

  

- **文字选择题**

- **type: 3**

  - 题目数量
  - 题目序号，题目描述，选项数量，选项1，选项2...



- **音频选择题**
- **type： 4**
  - 题目数量
  - 题目序号，题目描述，音频文件数量，选项数量，音频文件1名称，音频... ,选项1，选项2...

 逗号前后无空格