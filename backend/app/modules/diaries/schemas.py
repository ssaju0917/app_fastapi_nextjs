from pydantic import BaseModel
from datetime import date

# 作成用スキーマ（IDなし、日付なし）
class DiaryCreate(BaseModel):
    title: str
    content: str

# 表示用スキーマ（IDあり。日付あり）
class Diary(BaseModel):
    id: int
    title: str
    content: str
    diary_date: date

    class Config:
        from_attributes = True # ORMモード有効化