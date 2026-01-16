from pydantic import BaseModel
from typing import List, Optional

# Featureの循環参照を避けるため、先に定義するか、User内ではID参照にします
class FeatureBase(BaseModel):
    name: str
    description: str

class FeatureCreate(FeatureBase):
    pass

class Feature(FeatureBase):
    id: int
    user_id: int
    class Config:
        from_attributes = True