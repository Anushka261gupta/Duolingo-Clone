from typing import List, Optional

from sqlalchemy import Boolean, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class Achievement(BaseModel):
    __tablename__ = "achievements"

    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    target: Mapped[int] = mapped_column(Integer)
    reward: Mapped[int] = mapped_column(Integer)

    # Relationships
    user_progress: Mapped[List["UserAchievement"]] = relationship("UserAchievement", back_populates="achievement", cascade="all, delete-orphan")


class UserAchievement(BaseModel):
    __tablename__ = "user_achievements"
    __table_args__ = (
        UniqueConstraint("user_id", "achievement_id", name="uq_user_achievement"),
    )

    user_id: Mapped[str] = mapped_column(String(50), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    achievement_id: Mapped[str] = mapped_column(String(50), ForeignKey("achievements.id", ondelete="CASCADE"), index=True)
    
    progress: Mapped[int] = mapped_column(Integer, default=0)
    claimed: Mapped[bool] = mapped_column(Boolean, default=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="achievements")
    achievement: Mapped["Achievement"] = relationship("Achievement", back_populates="user_progress")
