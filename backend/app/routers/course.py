from typing import List, Optional
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.course import CourseSchema, UnitSchema, SkillSchema, LessonSchema
from app.services.course_service import CourseService

router = APIRouter(tags=["Courses"])

@router.get("/courses", response_model=List[CourseSchema], summary="List courses", description="Returns all language courses.")
def list_courses(
    limit: int = Query(100, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return CourseService.list_courses(db, limit, offset)

@router.get("/courses/{course_id}", response_model=CourseSchema, summary="Get course", description="Returns a single course with nested units and skills.")
def get_course(course_id: str, db: Session = Depends(get_db)):
    return CourseService.get_course(db, course_id)

@router.get("/units", response_model=List[UnitSchema], summary="List units", description="Returns units, optionally filtered by course_id.")
def list_units(
    course_id: Optional[str] = Query(None, description="Filter by course ID"),
    limit: int = Query(100, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return CourseService.list_units(db, course_id, limit, offset)

@router.get("/skills", response_model=List[SkillSchema], summary="List skills", description="Returns skills, optionally filtered by unit_id.")
def list_skills(
    unit_id: Optional[str] = Query(None, description="Filter by unit ID"),
    limit: int = Query(100, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return CourseService.list_skills(db, unit_id, limit, offset)

@router.get("/lessons", response_model=List[LessonSchema], summary="List lessons", description="Returns lessons, optionally filtered by skill_id.")
def list_lessons(
    skill_id: Optional[str] = Query(None, description="Filter by skill ID"),
    limit: int = Query(100, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return CourseService.list_lessons(db, skill_id, limit, offset)

@router.get("/lessons/{lesson_id}", response_model=LessonSchema, summary="Get lesson", description="Returns a lesson with nested exercises.")
def get_lesson(lesson_id: str, db: Session = Depends(get_db)):
    return CourseService.get_lesson(db, lesson_id)
