from typing import Optional
from pydantic import BaseModel, ConfigDict

class AchievementSchema(BaseModel):
    id: str
    title: str
    description: Optional[str]
    target: int
    reward: int

    model_config = ConfigDict(from_attributes=True)
