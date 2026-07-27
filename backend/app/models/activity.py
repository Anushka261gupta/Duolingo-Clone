from typing import Any, Optional

from sqlalchemy import ForeignKey, JSON, String
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.enums import ActivityType


class Activity(BaseModel):
    __tablename__ = "activities"

    user_id: Mapped[str] = mapped_column(String(50), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    
    type: Mapped[ActivityType] = mapped_column(String(50), index=True)
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    
    # Store dynamic payload mapping to the activity type
    metadata_payload: Mapped[dict[str, Any]] = mapped_column(JSON, default=dict)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="activities")
