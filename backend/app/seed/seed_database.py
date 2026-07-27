import os
import sys
from datetime import datetime, timedelta, timezone
import random

# Ensure we can import app modules when running as script
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.dirname(__file__))))

from sqlalchemy.orm import Session
from app.db.database import SessionLocal, engine, Base
from app.models.user import User, UserProgress
from app.models.course import Course, Unit, Skill, Lesson, Exercise
from app.models.quest import Quest, UserQuest
from app.models.achievement import Achievement, UserAchievement
from app.models.shop import ShopItem, Inventory
from app.models.activity import Activity
from app.models.enums import ExerciseType, QuestType, ActivityType, InventoryStatus

random.seed(42)
NOW = datetime.now(timezone.utc)

def seed_users(db: Session):
    demo = db.query(User).filter(User.username == "demo").first()
    if demo:
        return demo, False

    demo = User(
        id="user-demo",
        username="demo",
        email="demo@example.com",
        language="en",
        xp=250, daily_xp=50, weekly_xp=150, monthly_xp=250,
        gems=500, hearts=5, max_hearts=5,
        streak=7, longest_streak=12,
        created_at=NOW - timedelta(days=30),
        updated_at=NOW
    )
    db.add(demo)

    leaderboard_users = []
    for i in range(1, 11):
        xp = random.randint(100, 1000)
        u = User(
            id=f"user-learner-{i}",
            username=f"learner_{i}",
            email=f"learner_{i}@example.com",
            language="en",
            xp=xp, daily_xp=random.randint(0, 100), weekly_xp=random.randint(50, 300), monthly_xp=xp,
            gems=random.randint(10, 200), hearts=5, max_hearts=5,
            streak=random.randint(0, 50), longest_streak=random.randint(0, 50),
            created_at=NOW - timedelta(days=random.randint(10, 100)),
        )
        leaderboard_users.append(u)
    
    db.add_all(leaderboard_users)
    db.commit()
    db.refresh(demo)
    return demo, True


def seed_courses(db: Session):
    course = Course(id="course-spanish", title="Spanish", language="es", description="Learn Spanish from scratch!")
    db.add(course)
    db.commit()
    db.refresh(course)

    units = [
        Unit(id="unit-1", course_id=course.id, title="Basics", order=1),
        Unit(id="unit-2", course_id=course.id, title="Food", order=2),
        Unit(id="unit-3", course_id=course.id, title="Travel", order=3)
    ]
    db.add_all(units)
    db.commit()

    skills = [
        Skill(id="skill-greetings", unit_id="unit-1", title="Greetings", description="Say hello and goodbye", icon="hand-wave", order=1),
        Skill(id="skill-people", unit_id="unit-1", title="People", description="Talk about people", icon="user", order=2),
        Skill(id="skill-food", unit_id="unit-2", title="Food", description="Order at a restaurant", icon="pizza", order=1),
        Skill(id="skill-drinks", unit_id="unit-2", title="Drinks", description="Order drinks", icon="coffee", order=2),
        Skill(id="skill-travel", unit_id="unit-3", title="Travel", description="Navigate a city", icon="plane", order=1),
        Skill(id="skill-shopping", unit_id="unit-3", title="Shopping", description="Buy souvenirs", icon="shopping-bag", order=2),
    ]
    db.add_all(skills)
    db.commit()
    return course, skills

import json

def seed_lessons_and_exercises(db: Session, skills):
    # Load the exact MOCK_LESSONS from JSON
    json_path = os.path.join(os.path.dirname(__file__), "mock_lessons.json")
    with open(json_path, "r", encoding="utf-8") as f:
        mock_lessons = json.load(f)
        
    all_lessons = []
    
    # We want to create the lessons based on what's in the JSON.
    # The JSON keys are "lesson-Unit 4-node-0" etc.
    # We will just map them to the first skill to satisfy the DB schema (skill_id),
    # since frontend fetches by lesson_id directly, the skill linkage is just for DB consistency.
    
    default_skill = skills[0].id if skills else "skill-greetings"
    
    order_idx = 1
    for lesson_id, data in mock_lessons.items():
        lesson = Lesson(
            id=lesson_id, 
            skill_id=default_skill, 
            title=f"Lesson: {lesson_id}", 
            description="Restored frontend lesson", 
            order=order_idx
        )
        db.add(lesson)
        db.commit()
        db.refresh(lesson)
        all_lessons.append(lesson)
        
        q_idx = 1
        for q in data.get("questions", []):
            ex = Exercise(
                id=f"ex-{lesson_id}-{q_idx}",
                lesson_id=lesson_id,
                type=q["type"],
                question=q["question"],
                payload=q["payload"],
                hint=q.get("prompt"),
                order=q_idx
            )
            db.add(ex)
            q_idx += 1
            
        order_idx += 1
        
    db.commit()
    return all_lessons

def seed_quests_and_achievements(db: Session):
    quests = [
        Quest(id="quest-daily-xp", title="Daily XP", description="Earn 50 XP today", type=QuestType.XP, target=50, reward=10),
        Quest(id="quest-perfect", title="Perfect Lesson", description="Complete a lesson with 0 mistakes", type=QuestType.PERFECT_LESSON, target=1, reward=20),
        Quest(id="quest-lesson", title="Lesson Completion", description="Complete 3 lessons", type=QuestType.LESSON, target=3, reward=15),
    ]
    db.add_all(quests)

    achievements = [
        Achievement(id="ach-wildfire", title="Wildfire", description="Reach a 7 day streak", target=7, reward=50),
        Achievement(id="ach-scholar", title="Scholar", description="Earn 1000 XP", target=1000, reward=100),
        Achievement(id="ach-sage", title="Sage", description="Complete 100 lessons", target=100, reward=200),
        Achievement(id="ach-flawless", title="Flawless", description="Complete 10 perfect lessons", target=10, reward=50),
    ]
    db.add_all(achievements)
    db.commit()
    return quests, achievements


def seed_shop(db: Session, demo_user: User):
    items = [
        ShopItem(id="shop-heart-refill", title="Heart Refill", description="Refill all your hearts", category="hearts", price=50, is_consumable=True, effect_type="HEART_REFILL"),
        ShopItem(id="shop-single-heart", title="Single Heart", description="Refill one heart", category="hearts", price=10, is_consumable=True, effect_type="HEART_ADD", effect_value=1),
        ShopItem(id="shop-streak-freeze", title="Streak Freeze", description="Protect your streak for one missed day", category="powerups", price=200, is_consumable=True, effect_type="STREAK_FREEZE"),
        ShopItem(id="shop-double-xp", title="Double XP Boost", description="Double XP for 15 minutes", category="powerups", price=100, is_consumable=True, effect_type="DOUBLE_XP", effect_value=15),
    ]
    db.add_all(items)
    db.commit()

    db.add_all([
        Inventory(id="inv-1", user_id=demo_user.id, shop_item_id="shop-streak-freeze", status=InventoryStatus.OWNED),
        Inventory(id="inv-2", user_id=demo_user.id, shop_item_id="shop-double-xp", status=InventoryStatus.OWNED)
    ])
    db.commit()


def seed_progress(db: Session, demo_user: User, lessons, quests, achievements):
    progress_entries = []
    for i in range(5):
        lesson = lessons[i]
        progress_entries.append(UserProgress(
            id=f"up-demo-{lesson.id}", user_id=demo_user.id, lesson_id=lesson.id, completed=True,
            accuracy=0.9 if i % 2 == 0 else 1.0, xp_earned=15, mistakes=1 if i % 2 == 0 else 0,
            time_taken=120 + random.randint(-20, 40), completed_at=NOW - timedelta(days=2, hours=i)
        ))
    db.add_all(progress_entries)

    db.add_all([
        UserQuest(id="uq-demo-1", user_id=demo_user.id, quest_id=quests[0].id, progress=50, claimed=True, completed=True),
        UserQuest(id="uq-demo-2", user_id=demo_user.id, quest_id=quests[1].id, progress=0, claimed=False, completed=False)
    ])
    db.add_all([
        UserAchievement(id="ua-demo-1", user_id=demo_user.id, achievement_id=achievements[0].id, progress=7, claimed=True, completed=True),
        UserAchievement(id="ua-demo-2", user_id=demo_user.id, achievement_id=achievements[1].id, progress=250, claimed=False, completed=False)
    ])
    db.commit()


def seed_activities(db: Session, demo_user: User):
    db.add_all([
        Activity(id="act-1", user_id=demo_user.id, type=ActivityType.LESSON_COMPLETED, title="Completed Lesson 1", description="You completed Lesson 1 in Greetings!", metadata_payload={"xp": 15, "accuracy": 1.0}, created_at=NOW - timedelta(days=2)),
        Activity(id="act-2", user_id=demo_user.id, type=ActivityType.ACHIEVEMENT_UNLOCKED, title="Unlocked Wildfire!", description="You reached a 7 day streak.", metadata_payload={"achievementId": "ach-wildfire"}, created_at=NOW - timedelta(days=1)),
        Activity(id="act-3", user_id=demo_user.id, type=ActivityType.SHOP_PURCHASE, title="Purchased Streak Freeze", description="You bought a Streak Freeze.", metadata_payload={"itemId": "shop-streak-freeze", "cost": 200}, created_at=NOW - timedelta(hours=5)),
    ])
    db.commit()


def run_seed():
    Base.metadata.drop_all(bind=engine)
    Base.metadata.create_all(bind=engine)
    db = SessionLocal()
    try:
        demo_user, newly_created = seed_users(db)
        # Always seed
        
        course, skills = seed_courses(db)
        lessons = seed_lessons_and_exercises(db, skills)
        quests, achievements = seed_quests_and_achievements(db)
        seed_shop(db, demo_user)
        seed_progress(db, demo_user, lessons, quests, achievements)
        seed_activities(db, demo_user)

        print("Database seeded successfully with deterministic IDs!")
    except Exception as e:
        print(f"An error occurred: {e}")
        db.rollback()
    finally:
        db.close()

if __name__ == "__main__":
    run_seed()
