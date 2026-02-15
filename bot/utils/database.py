import aiosqlite
from datetime import datetime
from typing import Optional
import os

DB_PATH = os.getenv("DB_PATH", "study.db")


async def init_db():
    """데이터베이스 초기화 및 테이블 생성"""
    async with aiosqlite.connect(DB_PATH) as db:
        # 멤버 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS members (
                user_id INTEGER PRIMARY KEY,
                username TEXT NOT NULL,
                join_date TEXT NOT NULL,
                strike_count INTEGER DEFAULT 0,
                is_active INTEGER DEFAULT 1,
                main_output TEXT,
                current_status TEXT
            )
        """)

        # 산출물 제출 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS submissions (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                week_number INTEGER NOT NULL,
                year INTEGER NOT NULL,
                submission_type TEXT NOT NULL,
                description TEXT,
                submitted_at TEXT NOT NULL,
                message_link TEXT,
                FOREIGN KEY (user_id) REFERENCES members (user_id),
                UNIQUE (user_id, week_number, year)
            )
        """)

        # 출석 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS attendance (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                session_type TEXT NOT NULL,
                session_date TEXT NOT NULL,
                checked_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES members (user_id),
                UNIQUE (user_id, session_type, session_date)
            )
        """)

        # 스트라이크 기록 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS strikes (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                reason TEXT NOT NULL,
                issued_at TEXT NOT NULL,
                issued_by INTEGER,
                FOREIGN KEY (user_id) REFERENCES members (user_id)
            )
        """)

        # 익명 피드백 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS feedbacks (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                target_user_id INTEGER,
                content TEXT NOT NULL,
                created_at TEXT NOT NULL,
                is_general INTEGER DEFAULT 0
            )
        """)

        await db.commit()


# ============ 멤버 관리 ============

async def add_member(user_id: int, username: str, main_output: str = None, current_status: str = None):
    """새 멤버 등록"""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """INSERT OR REPLACE INTO members
               (user_id, username, join_date, main_output, current_status, strike_count, is_active)
               VALUES (?, ?, ?, ?, ?,
                       COALESCE((SELECT strike_count FROM members WHERE user_id = ?), 0),
                       1)""",
            (user_id, username, datetime.now().isoformat(), main_output, current_status, user_id)
        )
        await db.commit()


async def get_member(user_id: int) -> Optional[dict]:
    """멤버 정보 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM members WHERE user_id = ?", (user_id,)
        ) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None


async def get_all_active_members() -> list:
    """활성 멤버 목록 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM members WHERE is_active = 1"
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


async def deactivate_member(user_id: int):
    """멤버 비활성화 (아웃)"""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "UPDATE members SET is_active = 0 WHERE user_id = ?", (user_id,)
        )
        await db.commit()


# ============ 스트라이크 관리 ============

async def add_strike(user_id: int, reason: str, issued_by: int = None) -> int:
    """스트라이크 추가, 현재 스트라이크 수 반환"""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            "INSERT INTO strikes (user_id, reason, issued_at, issued_by) VALUES (?, ?, ?, ?)",
            (user_id, reason, datetime.now().isoformat(), issued_by)
        )
        await db.execute(
            "UPDATE members SET strike_count = strike_count + 1 WHERE user_id = ?",
            (user_id,)
        )
        await db.commit()

        async with db.execute(
            "SELECT strike_count FROM members WHERE user_id = ?", (user_id,)
        ) as cursor:
            row = await cursor.fetchone()
            return row[0] if row else 0


async def get_strikes(user_id: int) -> list:
    """멤버의 스트라이크 기록 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM strikes WHERE user_id = ? ORDER BY issued_at DESC",
            (user_id,)
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


# ============ 산출물 제출 ============

async def submit_output(user_id: int, submission_type: str, description: str, message_link: str = None) -> bool:
    """산출물 제출 (주 1회)"""
    now = datetime.now()
    week_number = now.isocalendar()[1]
    year = now.year

    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute(
                """INSERT INTO submissions
                   (user_id, week_number, year, submission_type, description, submitted_at, message_link)
                   VALUES (?, ?, ?, ?, ?, ?, ?)""",
                (user_id, week_number, year, submission_type, description, now.isoformat(), message_link)
            )
            await db.commit()
            return True
        except aiosqlite.IntegrityError:
            # 이미 이번 주에 제출함
            return False


async def get_weekly_submissions(week_number: int = None, year: int = None) -> list:
    """주간 제출 현황 조회"""
    if week_number is None:
        week_number = datetime.now().isocalendar()[1]
    if year is None:
        year = datetime.now().year

    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT s.*, m.username
               FROM submissions s
               JOIN members m ON s.user_id = m.user_id
               WHERE s.week_number = ? AND s.year = ?""",
            (week_number, year)
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


async def get_missing_submissions() -> list:
    """이번 주 미제출자 목록"""
    now = datetime.now()
    week_number = now.isocalendar()[1]
    year = now.year

    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT m.* FROM members m
               WHERE m.is_active = 1
               AND m.user_id NOT IN (
                   SELECT user_id FROM submissions
                   WHERE week_number = ? AND year = ?
               )""",
            (week_number, year)
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


# ============ 출석 ============

async def check_attendance(user_id: int, session_type: str) -> bool:
    """출석 체크"""
    today = datetime.now().strftime("%Y-%m-%d")

    async with aiosqlite.connect(DB_PATH) as db:
        try:
            await db.execute(
                """INSERT INTO attendance (user_id, session_type, session_date, checked_at)
                   VALUES (?, ?, ?, ?)""",
                (user_id, session_type, today, datetime.now().isoformat())
            )
            await db.commit()
            return True
        except aiosqlite.IntegrityError:
            return False


async def get_attendance_stats(user_id: int) -> dict:
    """출석 통계 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute(
            """SELECT session_type, COUNT(*) as count
               FROM attendance WHERE user_id = ?
               GROUP BY session_type""",
            (user_id,)
        ) as cursor:
            rows = await cursor.fetchall()
            return {row[0]: row[1] for row in rows}


# ============ 익명 피드백 ============

async def add_feedback(content: str, target_user_id: int = None) -> int:
    """익명 피드백 추가"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            """INSERT INTO feedbacks (target_user_id, content, created_at, is_general)
               VALUES (?, ?, ?, ?)""",
            (target_user_id, content, datetime.now().isoformat(), 1 if target_user_id is None else 0)
        )
        await db.commit()
        return cursor.lastrowid


async def get_recent_feedbacks(limit: int = 10) -> list:
    """최근 피드백 조회 (관리자용)"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT f.*, m.username as target_username
               FROM feedbacks f
               LEFT JOIN members m ON f.target_user_id = m.user_id
               ORDER BY f.created_at DESC LIMIT ?""",
            (limit,)
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


# ============ 통계 ============

async def get_member_stats(user_id: int) -> dict:
    """멤버별 통계"""
    async with aiosqlite.connect(DB_PATH) as db:
        # 총 제출 수
        async with db.execute(
            "SELECT COUNT(*) FROM submissions WHERE user_id = ?", (user_id,)
        ) as cursor:
            total_submissions = (await cursor.fetchone())[0]

        # 출석 수
        async with db.execute(
            "SELECT COUNT(*) FROM attendance WHERE user_id = ?", (user_id,)
        ) as cursor:
            total_attendance = (await cursor.fetchone())[0]

        # 스트라이크 수
        async with db.execute(
            "SELECT strike_count FROM members WHERE user_id = ?", (user_id,)
        ) as cursor:
            row = await cursor.fetchone()
            strikes = row[0] if row else 0

        # 제출 타입별 분포
        async with db.execute(
            """SELECT submission_type, COUNT(*)
               FROM submissions WHERE user_id = ?
               GROUP BY submission_type""",
            (user_id,)
        ) as cursor:
            type_dist = {row[0]: row[1] for row in await cursor.fetchall()}

        return {
            "total_submissions": total_submissions,
            "total_attendance": total_attendance,
            "strikes": strikes,
            "submission_types": type_dist
        }


async def get_weekly_report() -> dict:
    """주간 리포트 데이터"""
    now = datetime.now()
    week_number = now.isocalendar()[1]
    year = now.year

    async with aiosqlite.connect(DB_PATH) as db:
        # 이번 주 제출 현황
        async with db.execute(
            """SELECT submission_type, COUNT(*)
               FROM submissions
               WHERE week_number = ? AND year = ?
               GROUP BY submission_type""",
            (week_number, year)
        ) as cursor:
            submissions_by_type = {row[0]: row[1] for row in await cursor.fetchall()}

        # 총 제출자 수
        async with db.execute(
            """SELECT COUNT(DISTINCT user_id)
               FROM submissions
               WHERE week_number = ? AND year = ?""",
            (week_number, year)
        ) as cursor:
            submitted_count = (await cursor.fetchone())[0]

        # 활성 멤버 수
        async with db.execute(
            "SELECT COUNT(*) FROM members WHERE is_active = 1"
        ) as cursor:
            total_members = (await cursor.fetchone())[0]

        # 이번 주 출석
        week_start = datetime.now().strftime("%Y-%m-") + str(now.day - now.weekday())
        async with db.execute(
            """SELECT session_type, COUNT(DISTINCT user_id)
               FROM attendance
               WHERE session_date >= ?
               GROUP BY session_type""",
            (week_start,)
        ) as cursor:
            attendance_by_type = {row[0]: row[1] for row in await cursor.fetchall()}

        return {
            "week_number": week_number,
            "year": year,
            "submissions_by_type": submissions_by_type,
            "submitted_count": submitted_count,
            "total_members": total_members,
            "submission_rate": (submitted_count / total_members * 100) if total_members > 0 else 0,
            "attendance_by_type": attendance_by_type
        }
