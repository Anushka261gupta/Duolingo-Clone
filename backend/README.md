# Duolingo Clone Backend

This is the Python/FastAPI backend for the Duolingo Clone application. It handles the database, business logic, and API endpoints for the web frontend.

## Architecture Overview

The backend uses **FastAPI**, **SQLAlchemy 2.0**, and **Pydantic v2**. It follows a clear separation of concerns (Layered Architecture):

- **`app/models/`**: SQLAlchemy declarative models representing database tables.
- **`app/schemas/`**: Pydantic models for request validation and response serialization.
- **`app/routers/`**: FastAPI API endpoints (controllers).
- **`app/services/`**: Core business logic and orchestration.
- **`app/repositories/`**: Database interaction logic to isolate queries from services.
- **`app/db/`**: Database connection and session management.
- **`app/core/`**: Application configuration and settings.
- **`app/utils/`**: Shared helper functions.
- **`app/seed/`**: Scripts and data for database seeding.

## Setup and Installation

### 1. Prerequisites
- Python 3.12+

### 2. Environment Setup
Create a virtual environment:
```bash
python -m venv venv
```
Activate it:
- Windows: `.\venv\Scripts\activate`
- macOS/Linux: `source venv/bin/activate`

### 3. Install Dependencies
```bash
pip install -r requirements.txt
```

### 4. Configuration
Create a `.env` file from the example:
```bash
cp .env.example .env
```

### 5. Run the Server
```bash
uvicorn app.main:app --reload
```
The server will start at `http://localhost:8000`.

## Database & Migrations (Alembic)

This project uses Alembic for database migrations.

## Database & Migrations (Alembic)

This project uses Alembic for database migrations, tied to SQLAlchemy 2.0 metadata.

**To run migrations (apply to database):**
```bash
alembic upgrade head
```

**To create a new migration after updating models:**
```bash
alembic revision --autogenerate -m "Description of changes"
```

## Database Seeding

To populate the database with realistic initial data (e.g., users, courses, skills, lessons, exercises, quests, shop items, etc.), run the seed script.

```bash
python -m app.seed.seed_database
```
*Note: This script is idempotent and will only populate the database if it is empty.*

### Database Schema Overview

The relational schema is highly normalized and utilizes composite unique constraints and optimal indexing. Key domains include:

- **Users**: `users` table storing core metrics (XP, gems, hearts, streaks). `user_progress` maps completions and accuracy for lessons.
- **Courses**: A hierarchy containing `courses` -> `units` -> `skills` -> `lessons` -> `exercises`. Exercises utilize a `JSON` payload column for robust structural variance.
- **Quests & Achievements**: Dedicated tables (`quests`, `achievements`) and many-to-many user tracking tables (`user_quests`, `user_achievements`).
- **Shop & Inventory**: `shop_items` tracks consumables/effects, and `inventory` stores user ownership state.
- **Activities**: The `activities` table provides an append-only feed of user actions, heavily leaning on JSON metadata payloads for context.

## Future Roadmap

- **Phase 2 (Completed):** Implement Domain Models (Users, Courses, Units, Lessons, Exercises).
- **Phase 3:** Authentication and User Management.
- **Phase 4:** Core Game Loop (Progress tracking, XP, Hearts, Quests).
- **Phase 5:** Shop and Economy (Gems, Power-ups).
- **Phase 6:** Frontend Integration.
