from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine
<<<<<<< HEAD
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column,String,Integer
=======

>>>>>>> a29e4f55d232985d91afca18827cfc20414368ed
engine = create_engine(f'mysql+pymysql://{"win"}:{"123-09qwe"}@{"82.157.251.139"}/{"cspj"}')

Base = automap_base()
Base.prepare(engine, reflect=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

<<<<<<< HEAD
# print(Base.classes.keys())
bases = declarative_base()

class Task_files(bases):
    _tablename_ = 'task_files'
    id = Column(Integer, primary_key = True)
    task_id = Column(Integer)
    user_id = Column(Integer)
    file_name = Column(String(32))
=======
# print(Base.classes.keys())
>>>>>>> a29e4f55d232985d91afca18827cfc20414368ed
