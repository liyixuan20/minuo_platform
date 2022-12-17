<<<<<<< HEAD
FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
# -i https://pypi.tuna.tsinghua.edu.cn/simple
=======
FROM python:3.9
ENV PYTHONUNBUFFERED 1
RUN mkdir /code
WORKDIR /code
COPY requirements.txt /code/
RUN pip install -r requirements.txt -i https://pypi.tuna.tsinghua.edu.cn/simple
# -i https://pypi.tuna.tsinghua.edu.cn/simple
>>>>>>> 9fc6bd6 (1)
COPY . /code/