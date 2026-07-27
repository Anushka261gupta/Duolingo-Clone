from typing import List, Optional
from sqlalchemy.orm import Session
from app.models.user import User

class UserRepository:
    @staticmethod
    def get_by_username(db: Session, username: str) -> Optional[User]:
        return db.query(User).filter(User.username == username).first()

    @staticmethod
    def get_leaderboard(db: Session, limit: int = 100, offset: int = 0) -> List[User]:
        return db.query(User).order_by(User.xp.desc()).offset(offset).limit(limit).all()
