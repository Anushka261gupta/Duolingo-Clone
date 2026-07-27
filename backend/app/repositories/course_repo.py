from typing import List, Optional
from sqlalchemy.orm import Session, joinedload
from app.models.course import Course, Unit, Skill, Lesson

class CourseRepository:
    @staticmethod
    def list_courses(db: Session, limit: int = 100, offset: int = 0) -> List[Course]:
        return db.query(Course).offset(offset).limit(limit).all()

    @staticmethod
    def get_course(db: Session, course_id: str) -> Optional[Course]:
        return db.query(Course).options(joinedload(Course.units).joinedload(Unit.skills)).filter(Course.id == course_id).first()

    @staticmethod
    def list_units(db: Session, course_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> List[Unit]:
        query = db.query(Unit)
        if course_id:
            query = query.filter(Unit.course_id == course_id)
        return query.order_by(Unit.order).offset(offset).limit(limit).all()

    @staticmethod
    def list_skills(db: Session, unit_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> List[Skill]:
        query = db.query(Skill)
        if unit_id:
            query = query.filter(Skill.unit_id == unit_id)
        return query.order_by(Skill.order).offset(offset).limit(limit).all()

    @staticmethod
    def list_lessons(db: Session, skill_id: Optional[str] = None, limit: int = 100, offset: int = 0) -> List[Lesson]:
        query = db.query(Lesson)
        if skill_id:
            query = query.filter(Lesson.skill_id == skill_id)
        return query.order_by(Lesson.order).offset(offset).limit(limit).all()

    @staticmethod
    def get_lesson(db: Session, lesson_id: str) -> Optional[Lesson]:
        return db.query(Lesson).options(joinedload(Lesson.exercises)).filter(Lesson.id == lesson_id).first()
