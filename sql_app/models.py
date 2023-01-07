from .database import Base, SessionLocal, bases
from datetime import datetime
from sqlalchemy import Column,String,Integer, DateTime

Profile = Base.classes.profile
Profile.__repr__ = lambda self : f"{self.id}, {self.user_id}, {self.create_at}"

Task = Base.classes.task

Single_task = Base.classes.single_task

Request = Base.classes.request

Receive = Base.classes.receive

class Task_files(bases):
    __tablename__ = 'task_files'
    id = Column(Integer, primary_key = True)
    task_id = Column(Integer)
    user_id = Column(Integer)
    rec_or_create = Column(Integer)
    file_name = Column(String(32))
    create_time = Column(DateTime, default = datetime.now())

    def _repr_(self):
        return "<Task_files(id = '%s',task_id = '%s', user_id = '%s', file_name = '%s')>" % (self.id, self.task_id, self.user_id, self.file_name)
class Portrait_files(bases):
    __tablename__ = 'portrait'
    id = Column(Integer, primary_key = True)
    user_id = Column(Integer)
    file_name = Column(String(32))
    create_time = Column(DateTime, default = datetime.now())    


# print(Base.classes.keys())
if __name__ == '__main__':
    bases.metadata.create_all()
# __all__ = [SessionLocal, Profile, Task, Single_task, Request, Receive]

# print(Task.__dict__)