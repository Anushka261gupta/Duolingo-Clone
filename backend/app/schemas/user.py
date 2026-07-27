from datetime import datetime
from typing import Optional, List
from pydantic import BaseModel, ConfigDict

class UserProgressSchema(BaseModel):
    id: str
    user_id: str
    lesson_id: str
    completed: bool
    accuracy: Optional[float]
    xp_earned: int
    mistakes: int
    time_taken: Optional[int]
    completed_at: Optional[datetime]

    model_config = ConfigDict(from_attributes=True)

class UserSchema(BaseModel):
    id: str
    username: str
    email: str
    avatar: Optional[str]
    language: str
    xp: int
    daily_xp: int
    weekly_xp: int
    monthly_xp: int
    gems: int
    hearts: int
    max_hearts: int
    streak: int
    longest_streak: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
