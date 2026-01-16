from pydantic import BaseModel
from typing import List, Optional
from app.modules.features.schemas import Feature

class UserBase(BaseModel):
    name: str

class UserCreate(UserBase):
    pass

class User(UserBase):
    id: int
    features: List[Feature] = [] # Userを取得した時に紐づく項目も一緒に返す

    class Config:
        from_attributes = True