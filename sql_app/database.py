from sqlalchemy.ext.automap import automap_base
from sqlalchemy.orm import Session, sessionmaker
from sqlalchemy import create_engine

engine = create_engine(f'mysql+pymysql://{"win"}:{"123-09qwe"}@{"82.157.251.139"}/{"cspj"}')

Base = automap_base()
Base.prepare(engine, reflect=True)

SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

# print(Base.classes.keys())