from typing import List
from sqlalchemy.orm import Session
from app.repositories.misc_repos import QuestRepository, AchievementRepository, ShopRepository, ActivityRepository
from app.models.quest import Quest
from app.models.achievement import Achievement
from app.models.shop import ShopItem
from app.models.activity import Activity

class QuestService:
    @staticmethod
    def list_quests(db: Session, limit: int = 100, offset: int = 0) -> List[Quest]:
        return QuestRepository.list_quests(db, limit, offset)

class AchievementService:
    @staticmethod
    def list_achievements(db: Session, limit: int = 100, offset: int = 0) -> List[Achievement]:
        return AchievementRepository.list_achievements(db, limit, offset)

class ShopService:
    @staticmethod
    def list_shop_items(db: Session, limit: int = 100, offset: int = 0) -> List[ShopItem]:
        return ShopRepository.list_shop_items(db, limit, offset)

class ActivityService:
    @staticmethod
    def list_activities(db: Session, limit: int = 100, offset: int = 0) -> List[Activity]:
        return ActivityRepository.list_activities(db, limit, offset)
