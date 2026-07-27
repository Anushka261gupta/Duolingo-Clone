from typing import List
from fastapi import HTTPException
from sqlalchemy.orm import Session
from app.repositories.user_repo import UserRepository
from app.models.user import User

class UserService:
    @staticmethod
    def get_user_by_username(db: Session, username: str) -> User:
        user = UserRepository.get_by_username(db, username)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        return user

    @staticmethod
    def get_leaderboard(db: Session, limit: int = 100, offset: int = 0) -> List[User]:
        return UserRepository.get_leaderboard(db, limit, offset)
