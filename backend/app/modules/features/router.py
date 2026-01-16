from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.core.database import get_db
from . import models, schemas

router = APIRouter()

@router.post("/{user_id}/", response_model=schemas.Feature)
def create_feature_for_user(user_id: int, feature: schemas.FeatureCreate, db: Session = Depends(get_db)):
    # ユーザーが存在するか確認
    from app.modules.users.models import User
    db_user = db.query(User).filter(User.id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_feature = models.Feature(**feature.dict(), user_id=user_id)
    db.add(db_feature)
    db.commit()
    db.refresh(db_feature)
    return db_feature

@router.delete("/{feature_id}")
def delete_feature(feature_id: int, db: Session = Depends(get_db)):
    db_feature = db.query(models.Feature).filter(models.Feature.id == feature_id).first()
    if not db_feature:
        raise HTTPException(status_code=404, detail="Feature not found")
    db.delete(db_feature)
    db.commit()
    return {"message": "Feature deleted"}