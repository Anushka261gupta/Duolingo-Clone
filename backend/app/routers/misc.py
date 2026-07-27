from typing import List
from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from app.db.database import get_db
from app.schemas.quest import QuestSchema
from app.schemas.achievement import AchievementSchema
from app.schemas.shop import ShopItemSchema
from app.schemas.activity import ActivitySchema
from app.services.misc_services import QuestService, AchievementService, ShopService, ActivityService

router = APIRouter(tags=["Misc"])

@router.get("/quests", response_model=List[QuestSchema], summary="List quests", description="Returns available global quests.")
def list_quests(
    limit: int = Query(100, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return QuestService.list_quests(db, limit, offset)

@router.get("/achievements", response_model=List[AchievementSchema], summary="List achievements", description="Returns global achievements.")
def list_achievements(
    limit: int = Query(100, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return AchievementService.list_achievements(db, limit, offset)

@router.get("/shop", response_model=List[ShopItemSchema], summary="List shop items", description="Returns available shop items.")
def list_shop_items(
    limit: int = Query(100, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return ShopService.list_shop_items(db, limit, offset)

@router.get("/activities", response_model=List[ActivitySchema], summary="List activities", description="Returns recent activity sorted by created_at descending.")
def list_activities(
    limit: int = Query(50, description="Max items to return"),
    offset: int = Query(0, description="Offset for pagination"),
    db: Session = Depends(get_db)
):
    return ActivityService.list_activities(db, limit, offset)
