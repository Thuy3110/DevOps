from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy import create_engine, Column, Integer, String
from sqlalchemy.orm import declarative_base, sessionmaker
import time
import os

app = FastAPI()

# CORS cho frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # hoặc ["*"] để test nhanh
    allow_methods=["*"],
    allow_headers=["*"]
)

# Kết nối MySQL
DATABASE_URL = os.environ.get("DATABASE_URL", "mysql+pymysql://root:root@127.0.0.1:3306/appdb")

engine = None
SessionLocal = None
Base = declarative_base()

def connect_db():
    global engine, SessionLocal
    for i in range(10):
        try:
            engine = create_engine(DATABASE_URL, pool_pre_ping=True)
            engine.connect()
            SessionLocal = sessionmaker(bind=engine)
            print("FastAPI kết nối MySQL thành công!")
            return
        except Exception as e:
            print(f"Chờ MySQL... ({i+1}/10): {e}")
            time.sleep(3)
    raise Exception("Không thể kết nối MySQL!")

connect_db()

# Định nghĩa bảng Task
class Task(Base):
    __tablename__ = "tasks"
    id = Column(Integer, primary_key=True)
    title = Column(String)

# API lấy tasks
@app.get("/api-python/tasks")
def get_tasks():
    db = SessionLocal()
    try:
        result = db.query(Task).all()
        # Trả JSON dạng list of dict
        return [{"id": t.id, "title": t.title} for t in result]
    finally:
        db.close()