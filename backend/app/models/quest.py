from typing import List, Optional

from sqlalchemy import Boolean, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.enums import QuestType


class Quest(BaseModel):
    __tablename__ = "quests"

    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    type: Mapped[QuestType] = mapped_column(String(50))
    target: Mapped[int] = mapped_column(Integer)
    reward: Mapped[int] = mapped_column(Integer)  # e.g., gem amount

    # Relationships
    user_progress: Mapped[List["UserQuest"]] = relationship("UserQuest", back_populates="quest", cascade="all, delete-orphan")


class UserQuest(BaseModel):
    __tablename__ = "user_quests"
    __table_args__ = (
        UniqueConstraint("user_id", "quest_id", name="uq_user_quest"),
    )

    user_id: Mapped[str] = mapped_column(String(50), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    quest_id: Mapped[str] = mapped_column(String(50), ForeignKey("quests.id", ondelete="CASCADE"), index=True)
    
    progress: Mapped[int] = mapped_column(Integer, default=0)
    claimed: Mapped[bool] = mapped_column(Boolean, default=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="quests")
    quest: Mapped["Quest"] = relationship("Quest", back_populates="user_progress")
