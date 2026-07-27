from typing import List
from sqlalchemy.orm import Session
from app.models.quest import Quest
from app.models.achievement import Achievement
from app.models.shop import ShopItem
from app.models.activity import Activity

class QuestRepository:
    @staticmethod
    def list_quests(db: Session, limit: int = 100, offset: int = 0) -> List[Quest]:
        return db.query(Quest).offset(offset).limit(limit).all()

class AchievementRepository:
    @staticmethod
    def list_achievements(db: Session, limit: int = 100, offset: int = 0) -> List[Achievement]:
        return db.query(Achievement).offset(offset).limit(limit).all()

class ShopRepository:
    @staticmethod
    def list_shop_items(db: Session, limit: int = 100, offset: int = 0) -> List[ShopItem]:
        return db.query(ShopItem).offset(offset).limit(limit).all()

class ActivityRepository:
    @staticmethod
    def list_activities(db: Session, limit: int = 100, offset: int = 0) -> List[Activity]:
        return db.query(Activity).order_by(Activity.created_at.desc()).offset(offset).limit(limit).all()
