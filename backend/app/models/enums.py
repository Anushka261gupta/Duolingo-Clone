import enum

class ExerciseType(str, enum.Enum):
    MULTIPLE_CHOICE = "MULTIPLE_CHOICE"
    WORD_BANK = "WORD_BANK"
    MATCH_PAIRS = "MATCH_PAIRS"
    FILL_BLANK = "FILL_BLANK"
    TYPE_ANSWER = "TYPE_ANSWER"

class QuestType(str, enum.Enum):
    XP = "XP"
    LESSON = "LESSON"
    PERFECT_LESSON = "PERFECT_LESSON"

class ActivityType(str, enum.Enum):
    LESSON_COMPLETED = "LESSON_COMPLETED"
    SHOP_PURCHASE = "SHOP_PURCHASE"
    ACHIEVEMENT_UNLOCKED = "ACHIEVEMENT_UNLOCKED"
    QUEST_CLAIMED = "QUEST_CLAIMED"

class InventoryStatus(str, enum.Enum):
    OWNED = "OWNED"
    ACTIVE = "ACTIVE"
    USED = "USED"
