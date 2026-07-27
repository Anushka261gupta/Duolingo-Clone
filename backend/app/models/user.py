from datetime import datetime
from typing import List, Optional

from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel


class User(BaseModel):
    __tablename__ = "users"

    username: Mapped[str] = mapped_column(String(50), unique=True, index=True)
    email: Mapped[str] = mapped_column(String(255), unique=True, index=True)
    avatar: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    language: Mapped[str] = mapped_column(String(10), default="en")

    xp: Mapped[int] = mapped_column(Integer, default=0)
    daily_xp: Mapped[int] = mapped_column(Integer, default=0)
    weekly_xp: Mapped[int] = mapped_column(Integer, default=0)
    monthly_xp: Mapped[int] = mapped_column(Integer, default=0)

    gems: Mapped[int] = mapped_column(Integer, default=500)
    
    hearts: Mapped[int] = mapped_column(Integer, default=5)
    max_hearts: Mapped[int] = mapped_column(Integer, default=5)

    streak: Mapped[int] = mapped_column(Integer, default=0)
    longest_streak: Mapped[int] = mapped_column(Integer, default=0)

    # Relationships
    progress: Mapped[List["UserProgress"]] = relationship("UserProgress", back_populates="user", cascade="all, delete-orphan")
    quests: Mapped[List["UserQuest"]] = relationship("UserQuest", back_populates="user", cascade="all, delete-orphan")
    achievements: Mapped[List["UserAchievement"]] = relationship("UserAchievement", back_populates="user", cascade="all, delete-orphan")
    inventory: Mapped[List["Inventory"]] = relationship("Inventory", back_populates="user", cascade="all, delete-orphan")
    activities: Mapped[List["Activity"]] = relationship("Activity", back_populates="user", cascade="all, delete-orphan")


class UserProgress(BaseModel):
    __tablename__ = "user_progress"
    __table_args__ = (
        UniqueConstraint("user_id", "lesson_id", name="uq_user_lesson_progress"),
    )

    user_id: Mapped[str] = mapped_column(String(50), ForeignKey("users.id", ondelete="CASCADE"), index=True)
    lesson_id: Mapped[str] = mapped_column(String(50), ForeignKey("lessons.id", ondelete="CASCADE"), index=True)
    
    completed: Mapped[bool] = mapped_column(Boolean, default=False)
    accuracy: Mapped[Optional[float]] = mapped_column(Float, nullable=True)
    xp_earned: Mapped[int] = mapped_column(Integer, default=0)
    mistakes: Mapped[int] = mapped_column(Integer, default=0)
    time_taken: Mapped[Optional[int]] = mapped_column(Integer, nullable=True)  # in seconds
    
    completed_at: Mapped[Optional[datetime]] = mapped_column(DateTime(timezone=True), nullable=True)

    # Relationships
    user: Mapped["User"] = relationship("User", back_populates="progress")
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="progress")
