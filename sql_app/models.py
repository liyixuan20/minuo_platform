from database import Base, SessionLocal


Profile = Base.classes.profile
Profile.__repr__ = lambda self : f"{self.id}, {self.user_id}, {self.create_at}"

Task = Base.classes.task

Single_task = Base.classes.single_task

Request = Base.classes.request

Receive = Base.classes.receive


# __all__ = [SessionLocal, Profile, Task, Single_task, Request, Receive]

# print(Task.__dict__)