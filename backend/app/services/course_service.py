from typing import List, Optional
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.course_repo import CourseRepository
from app.models.course import Course, Unit, Skill, Lesson

class CourseService:
    @staticmethod
    def list_courses(db: Session, limit: int = 100, offset: int = 0) -> List[Course]:
        return CourseRepository.list_courses(db, limit, offset)

    @staticmethod
    def get_course(db: Session, course_id: str) -> Course:
        course = CourseRepository.get_course(db, course_id)
        if not course:
            raise HTTPException(status_code=404, detail="Course not found")
        return course

    @staticmethod
    def list_units(db: Session, course_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> List[Unit]:
        return CourseRepository.list_units(db, course_id, limit, offset)

    @staticmethod
    def list_skills(db: Session, unit_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> List[Skill]:
        return CourseRepository.list_skills(db, unit_id, limit, offset)

    @staticmethod
    def list_lessons(db: Session, skill_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> List[Lesson]:
        return CourseRepository.list_lessons(db, skill_id, limit, offset)

    @staticmethod
    def get_lesson(db: Session, lesson_id: str) -> Lesson:
        lesson = CourseRepository.get_lesson(db, lesson_id)
        if not lesson:
            raise HTTPException(status_code=404, detail="Lesson not found")
        return lesson
