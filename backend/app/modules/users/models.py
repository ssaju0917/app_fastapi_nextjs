from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.modules.features.models import Feature

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)

    # 1対多のリレーションシップ
    features = relationship("Feature", back_populates="owner", cascade="all, delete-orphan")