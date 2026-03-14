from sqlalchemy import Column, Integer, String, Text,ForeignKey, Date
from sqlalchemy.orm import relationship
from app.core.database import Base
from app.modules.features.models import Feature
from datetime import date

class Diary(Base):
    __tablename__ = "diaries"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(100), nullable=False)
    content = Column(Text, nullable=False)
    diary_date = Column(Date, default=date.today, nullable=False)
