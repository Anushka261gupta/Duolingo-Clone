from typing import List, Optional, Any

from sqlalchemy import ForeignKey, Integer, String, JSON
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.base import BaseModel
from app.models.enums import ExerciseType


class Course(BaseModel):
    __tablename__ = "courses"

    title: Mapped[str] = mapped_column(String(100), index=True)
    language: Mapped[str] = mapped_column(String(10), index=True)
    description: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)

    # Relationships
    units: Mapped[List["Unit"]] = relationship("Unit", back_populates="course", cascade="all, delete-orphan")


class Unit(BaseModel):
    __tablename__ = "units"

    course_id: Mapped[str] = mapped_column(String(50), ForeignKey("courses.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(100))
    order: Mapped[int] = mapped_column(Integer)

    # Relationships
    course: Mapped["Course"] = relationship("Course", back_populates="units")
    skills: Mapped[List["Skill"]] = relationship("Skill", back_populates="unit", cascade="all, delete-orphan")


class Skill(BaseModel):
    __tablename__ = "skills"

    unit_id: Mapped[str] = mapped_column(String(50), ForeignKey("units.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    icon: Mapped[str] = mapped_column(String(100))
    order: Mapped[int] = mapped_column(Integer)

    # Relationships
    unit: Mapped["Unit"] = relationship("Unit", back_populates="skills")
    lessons: Mapped[List["Lesson"]] = relationship("Lesson", back_populates="skill", cascade="all, delete-orphan")


class Lesson(BaseModel):
    __tablename__ = "lessons"

    skill_id: Mapped[str] = mapped_column(String(50), ForeignKey("skills.id", ondelete="CASCADE"), index=True)
    title: Mapped[str] = mapped_column(String(100))
    description: Mapped[Optional[str]] = mapped_column(String(500), nullable=True)
    order: Mapped[int] = mapped_column(Integer)

    # Relationships
    skill: Mapped["Skill"] = relationship("Skill", back_populates="lessons")
    exercises: Mapped[List["Exercise"]] = relationship("Exercise", back_populates="lesson", cascade="all, delete-orphan")
    progress: Mapped[List["UserProgress"]] = relationship("UserProgress", back_populates="lesson", cascade="all, delete-orphan")


class Exercise(BaseModel):
    __tablename__ = "exercises"

    lesson_id: Mapped[str] = mapped_column(String(50), ForeignKey("lessons.id", ondelete="CASCADE"), index=True)
    type: Mapped[ExerciseType] = mapped_column(String(50))
    question: Mapped[str] = mapped_column(String(500))
    
    # A single JSON payload containing options, answers, and any type-specific data
    payload: Mapped[dict[str, Any]] = mapped_column(JSON)
    
    hint: Mapped[Optional[str]] = mapped_column(String(255), nullable=True)
    order: Mapped[int] = mapped_column(Integer)

    # Relationships
    lesson: Mapped["Lesson"] = relationship("Lesson", back_populates="exercises")
