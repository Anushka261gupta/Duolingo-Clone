from datetime import datetime
from typing import Optional, Any, Dict
from pydantic import BaseModel, ConfigDict
from app.models.enums import ActivityType

class ActivitySchema(BaseModel):
    id: str
    user_id: str
    type: ActivityType
    title: str
    description: Optional[str]
    metadata_payload: Dict[str, Any]
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
