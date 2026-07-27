from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.user import UserSchema
from app.services.user_service import UserService

router = APIRouter(tags=["Users"])

@router.get("/users/demo", response_model=UserSchema, summary="Get demo user", description="Returns the demo learner profile.")
def get_demo_user(db: Session = Depends(get_db)):
    return UserService.get_user_by_username(db, "demo")

@router.get("/leaderboard", response_model=List[UserSchema], summary="Get leaderboard", description="Returns users sorted by XP descending.")
def get_leaderboard(
    limit: int = Query(10, description="Max users to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return UserService.get_leaderboard(db, limit, offset)
