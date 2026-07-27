from typing import Optional, List, Any, Dict
from pydantic import BaseModel, ConfigDict
from app.models.enums import ExerciseType

class ExerciseSchema(BaseModel):
    id: str
    lesson_id: str
    type: ExerciseType
    question: str
    payload: Dict[str, Any]
    hint: Optional[str]
    order: int

    model_config = ConfigDict(from_attributes=True)

class LessonSchema(BaseModel):
    id: str
    skill_id: str
    title: str
    description: Optional[str]
    order: int
    # Exposing nested resources as requested
    exercises: Optional[List[ExerciseSchema]] = None

    model_config = ConfigDict(from_attributes=True)

class SkillSchema(BaseModel):
    id: str
    unit_id: str
    title: str
    description: Optional[str]
    icon: str
    order: int

    model_config = ConfigDict(from_attributes=True)

class UnitSchema(BaseModel):
    id: str
    course_id: str
    title: str
    order: int
    skills: Optional[List[SkillSchema]] = None

    model_config = ConfigDict(from_attributes=True)

class CourseSchema(BaseModel):
    id: str
    title: str
    language: str
    description: Optional[str]
    units: Optional[List[UnitSchema]] = None

    model_config = ConfigDict(from_attributes=True)
