from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from datetime import date
from typing import List
from . import schemas, models

from app.core.database import get_db

router = APIRouter()
# fake_db = []

# @router.get("/", response_model=List[schemas.Diary])
# def get_diaries():
#     return fake_db


# @router.post("/", response_model=schemas.Diary)
# def create_diary(item: schemas.DiaryCreate):
#     new_data = {
#         "id": len(fake_db) + 1,
#         "title": item.title,
#         "content": item.content,
#         "diary_date": date.today()
#     }
#     fake_db.append(new_data)
#     return new_data

@router.get("/", response_model=List[schemas.Diary])
def get_diaries(db: Session = Depends(get_db)):
    # 本来はDBから取得するコード
    return db.query(models.Diary).order_by(models.Diary.id.desc()).all()

@router.get("/{diary_id}", response_model=schemas.Diary)
def get_diary(diary_id: int, db: Session = Depends(get_db)):
    diary = db.query(models.Diary).filter(models.Diary.id == diary_id).first()
    if not diary:
        raise HTTPException(status_code=404, detail="Diary not found")
    return diary

@router.post("/", response_model=schemas.Diary)
def create_diary(item: schemas.DiaryCreate, db: Session = Depends(get_db)):
    # 本来はDBに保存するコード
    diary = models.Diary(
        title=item.title,
        content=item.content,
        diary_date=date.today()
    )
    db.add(diary)
    db.commit()
    db.refresh(diary)
    return diary

@router.delete("/{diary_id}", response_model=schemas.Diary)
def delete_diary(diary_id: int, db: Session = Depends(get_db)):
    diary = db.query(models.Diary).filter(models.Diary.id == diary_id).first()
    if not diary:
        raise HTTPException(status_code=404, detail="Diary not found")
    db.delete(diary)
    db.commit()
    return diary

@router.put("/{diary_id}", response_model=schemas.Diary)
def update_diary(diary_id: int, item: schemas.DiaryCreate, db: Session = Depends(get_db)):
    diary = db.query(models.Diary).filter(models.Diary.id == diary_id).first()
    if not diary:
        raise HTTPException(status_code=404, detail="Diary not found")
    diary.title = item.title
    diary.content = item.content
    db.commit()
    db.refresh(diary)
    return diary
