from typing import Optional
from pydantic import BaseModel, ConfigDict
from app.models.enums import QuestType

class QuestSchema(BaseModel):
    id: str
    title: str
    description: Optional[str]
    type: QuestType
    target: int
    reward: int

    model_config = ConfigDict(from_attributes=True)
