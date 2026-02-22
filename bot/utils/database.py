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

        # 프로필 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS profiles (
                user_id INTEGER PRIMARY KEY,
                github TEXT,
                blog TEXT,
                intro TEXT,
                tech_stack TEXT,
                goal TEXT,
                updated_at TEXT NOT NULL
            )
        """)

        # 벌금 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS fines (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                amount INTEGER NOT NULL,
                reason TEXT NOT NULL,
                issued_at TEXT NOT NULL,
                issued_by INTEGER,
                is_paid INTEGER DEFAULT 0,
                paid_at TEXT,
                FOREIGN KEY (user_id) REFERENCES members (user_id)
            )
        """)

        # 팀 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS teams (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                name TEXT NOT NULL UNIQUE,
                created_at TEXT NOT NULL
            )
        """)

        # 팀 멤버 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS team_members (
                user_id INTEGER PRIMARY KEY,
                team_id INTEGER NOT NULL,
                assigned_at TEXT NOT NULL,
                FOREIGN KEY (team_id) REFERENCES teams (id)
            )
        """)

        # 자료실 테이블
        await db.execute("""
            CREATE TABLE IF NOT EXISTS resources (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                user_id INTEGER NOT NULL,
                title TEXT NOT NULL,
                url TEXT,
                description TEXT,
                category TEXT NOT NULL,
                tags TEXT,
                created_at TEXT NOT NULL,
                FOREIGN KEY (user_id) REFERENCES members (user_id)
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


async def get_session_attendees(session_type: str, session_date: str = None) -> list:
    """특정 세션의 출석자 목록 조회"""
    if session_date is None:
        session_date = datetime.now().strftime("%Y-%m-%d")

    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute(
            """SELECT user_id FROM attendance
               WHERE session_type = ? AND session_date = ?""",
            (session_type, session_date)
        ) as cursor:
            rows = await cursor.fetchall()
            return [row[0] for row in rows]


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


# ============ 프로필 ============

async def set_profile(user_id: int, github: str = None, blog: str = None,
                      intro: str = None, tech_stack: str = None, goal: str = None):
    """프로필 설정/업데이트"""
    async with aiosqlite.connect(DB_PATH) as db:
        # 기존 프로필 가져오기
        existing = await get_profile(user_id)

        if existing:
            # 업데이트 (None이 아닌 값만)
            await db.execute("""
                UPDATE profiles SET
                    github = COALESCE(?, github),
                    blog = COALESCE(?, blog),
                    intro = COALESCE(?, intro),
                    tech_stack = COALESCE(?, tech_stack),
                    goal = COALESCE(?, goal),
                    updated_at = ?
                WHERE user_id = ?
            """, (github, blog, intro, tech_stack, goal, datetime.now().isoformat(), user_id))
        else:
            # 새로 생성
            await db.execute("""
                INSERT INTO profiles (user_id, github, blog, intro, tech_stack, goal, updated_at)
                VALUES (?, ?, ?, ?, ?, ?, ?)
            """, (user_id, github, blog, intro, tech_stack, goal, datetime.now().isoformat()))

        await db.commit()


async def get_profile(user_id: int) -> Optional[dict]:
    """프로필 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM profiles WHERE user_id = ?", (user_id,)
        ) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None


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


# ============ 벌금 관리 ============

async def add_fine(user_id: int, amount: int, reason: str, issued_by: int = None) -> int:
    """벌금 부과, 벌금 ID 반환"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            """INSERT INTO fines (user_id, amount, reason, issued_at, issued_by)
               VALUES (?, ?, ?, ?, ?)""",
            (user_id, amount, reason, datetime.now().isoformat(), issued_by)
        )
        await db.commit()
        return cursor.lastrowid


async def get_fines(user_id: int) -> list:
    """특정 멤버의 벌금 기록 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT * FROM fines WHERE user_id = ? ORDER BY issued_at DESC""",
            (user_id,)
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


async def get_user_fine_summary(user_id: int) -> dict:
    """특정 멤버의 벌금 요약 (총액, 납부액, 미납액)"""
    async with aiosqlite.connect(DB_PATH) as db:
        # 총 벌금액
        async with db.execute(
            "SELECT COALESCE(SUM(amount), 0) FROM fines WHERE user_id = ?",
            (user_id,)
        ) as cursor:
            total_amount = (await cursor.fetchone())[0]

        # 납부된 벌금액
        async with db.execute(
            "SELECT COALESCE(SUM(amount), 0) FROM fines WHERE user_id = ? AND is_paid = 1",
            (user_id,)
        ) as cursor:
            paid_amount = (await cursor.fetchone())[0]

        # 미납 벌금 건수
        async with db.execute(
            "SELECT COUNT(*) FROM fines WHERE user_id = ? AND is_paid = 0",
            (user_id,)
        ) as cursor:
            unpaid_count = (await cursor.fetchone())[0]

        return {
            "total_amount": total_amount,
            "paid_amount": paid_amount,
            "unpaid_amount": total_amount - paid_amount,
            "unpaid_count": unpaid_count
        }


async def get_all_fines_summary() -> list:
    """전체 멤버의 벌금 현황 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT
                   f.user_id,
                   m.username,
                   SUM(f.amount) as total_amount,
                   SUM(CASE WHEN f.is_paid = 1 THEN f.amount ELSE 0 END) as paid_amount,
                   SUM(CASE WHEN f.is_paid = 0 THEN f.amount ELSE 0 END) as unpaid_amount,
                   COUNT(CASE WHEN f.is_paid = 0 THEN 1 END) as unpaid_count
               FROM fines f
               LEFT JOIN members m ON f.user_id = m.user_id
               GROUP BY f.user_id
               ORDER BY unpaid_amount DESC"""
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


async def pay_fine(user_id: int, amount: int) -> int:
    """벌금 납부 처리 (미납 벌금 중 오래된 것부터 납부), 실제 납부 처리된 금액 반환"""
    async with aiosqlite.connect(DB_PATH) as db:
        # 미납 벌금 조회 (오래된 순)
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT id, amount FROM fines
               WHERE user_id = ? AND is_paid = 0
               ORDER BY issued_at ASC""",
            (user_id,)
        ) as cursor:
            unpaid_fines = [dict(row) for row in await cursor.fetchall()]

        if not unpaid_fines:
            return 0

        remaining = amount
        paid_total = 0
        now = datetime.now().isoformat()

        for fine in unpaid_fines:
            if remaining <= 0:
                break

            if remaining >= fine["amount"]:
                # 전액 납부
                await db.execute(
                    "UPDATE fines SET is_paid = 1, paid_at = ? WHERE id = ?",
                    (now, fine["id"])
                )
                remaining -= fine["amount"]
                paid_total += fine["amount"]
            # 부분 납부는 지원하지 않음 (전액 납부만)

        await db.commit()
        return paid_total


# ============ 팀 관리 ============

async def create_team(name: str) -> Optional[int]:
    """팀 생성, 팀 ID 반환. 이미 존재하면 None 반환"""
    async with aiosqlite.connect(DB_PATH) as db:
        try:
            cursor = await db.execute(
                "INSERT INTO teams (name, created_at) VALUES (?, ?)",
                (name, datetime.now().isoformat())
            )
            await db.commit()
            return cursor.lastrowid
        except aiosqlite.IntegrityError:
            return None


async def get_team(team_id: int) -> Optional[dict]:
    """팀 정보 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM teams WHERE id = ?", (team_id,)
        ) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None


async def get_team_by_name(name: str) -> Optional[dict]:
    """팀 이름으로 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM teams WHERE name = ?", (name,)
        ) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None


async def get_all_teams() -> list:
    """모든 팀 목록 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            "SELECT * FROM teams ORDER BY created_at"
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


async def delete_team(team_id: int) -> bool:
    """팀 삭제 (팀 멤버도 함께 삭제)"""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("DELETE FROM team_members WHERE team_id = ?", (team_id,))
        cursor = await db.execute("DELETE FROM teams WHERE id = ?", (team_id,))
        await db.commit()
        return cursor.rowcount > 0


async def assign_team_member(user_id: int, team_id: int) -> bool:
    """멤버를 팀에 배정 (기존 팀에서 제거 후 새 팀에 배정)"""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute(
            """INSERT OR REPLACE INTO team_members (user_id, team_id, assigned_at)
               VALUES (?, ?, ?)""",
            (user_id, team_id, datetime.now().isoformat())
        )
        await db.commit()
        return True


async def remove_team_member(user_id: int) -> bool:
    """멤버를 팀에서 제거"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "DELETE FROM team_members WHERE user_id = ?", (user_id,)
        )
        await db.commit()
        return cursor.rowcount > 0


async def get_user_team(user_id: int) -> Optional[dict]:
    """사용자가 속한 팀 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT t.*, tm.assigned_at
               FROM teams t
               JOIN team_members tm ON t.id = tm.team_id
               WHERE tm.user_id = ?""",
            (user_id,)
        ) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None


async def get_team_members(team_id: int) -> list:
    """팀의 멤버 목록 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT tm.user_id, tm.assigned_at, m.username
               FROM team_members tm
               LEFT JOIN members m ON tm.user_id = m.user_id
               WHERE tm.team_id = ?
               ORDER BY tm.assigned_at""",
            (team_id,)
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


async def get_all_teams_with_members() -> list:
    """모든 팀과 멤버 목록 조회"""
    teams = await get_all_teams()
    result = []
    for team in teams:
        members = await get_team_members(team["id"])
        result.append({
            **team,
            "members": members
        })
    return result


async def clear_all_team_members():
    """모든 팀 멤버 배정 초기화"""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("DELETE FROM team_members")
        await db.commit()


# ============ 스트라이크 3회 대상자 조회 ============

async def get_members_with_3_strikes() -> list:
    """스트라이크 3회 이상인 활성 멤버 목록 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT * FROM members
               WHERE is_active = 1 AND strike_count >= 3"""
        ) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


# ============ 자료실 관리 ============

async def add_resource(
    user_id: int,
    title: str,
    category: str,
    url: str = None,
    description: str = None,
    tags: str = None
) -> int:
    """자료 추가, ID 반환"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            """INSERT INTO resources (user_id, title, url, description, category, tags, created_at)
               VALUES (?, ?, ?, ?, ?, ?, ?)""",
            (user_id, title, url, description, category, tags, datetime.now().isoformat())
        )
        await db.commit()
        return cursor.lastrowid


async def get_resource(resource_id: int) -> Optional[dict]:
    """자료 조회"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        async with db.execute(
            """SELECT r.*, m.username
               FROM resources r
               LEFT JOIN members m ON r.user_id = m.user_id
               WHERE r.id = ?""",
            (resource_id,)
        ) as cursor:
            row = await cursor.fetchone()
            return dict(row) if row else None


async def delete_resource(resource_id: int, user_id: int) -> bool:
    """자료 삭제 (본인만 가능)"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "DELETE FROM resources WHERE id = ? AND user_id = ?",
            (resource_id, user_id)
        )
        await db.commit()
        return cursor.rowcount > 0


async def search_resources(
    keyword: str = None,
    category: str = None,
    user_id: int = None,
    limit: int = 20
) -> list:
    """자료 검색"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row

        query = """
            SELECT r.*, m.username
            FROM resources r
            LEFT JOIN members m ON r.user_id = m.user_id
            WHERE 1=1
        """
        params = []

        if keyword:
            query += " AND (r.title LIKE ? OR r.description LIKE ? OR r.tags LIKE ?)"
            keyword_pattern = f"%{keyword}%"
            params.extend([keyword_pattern, keyword_pattern, keyword_pattern])

        if category:
            query += " AND r.category = ?"
            params.append(category)

        if user_id:
            query += " AND r.user_id = ?"
            params.append(user_id)

        query += " ORDER BY r.created_at DESC LIMIT ?"
        params.append(limit)

        async with db.execute(query, params) as cursor:
            rows = await cursor.fetchall()
            return [dict(row) for row in rows]


async def get_resources_by_category(category: str, limit: int = 20) -> list:
    """카테고리별 자료 조회"""
    return await search_resources(category=category, limit=limit)


async def get_user_resources(user_id: int, limit: int = 20) -> list:
    """사용자가 등록한 자료 조회"""
    return await search_resources(user_id=user_id, limit=limit)


async def get_all_categories() -> list:
    """모든 카테고리 목록"""
    async with aiosqlite.connect(DB_PATH) as db:
        async with db.execute(
            "SELECT DISTINCT category FROM resources ORDER BY category"
        ) as cursor:
            rows = await cursor.fetchall()
            return [row[0] for row in rows]


async def get_resource_stats() -> dict:
    """자료실 통계"""
    async with aiosqlite.connect(DB_PATH) as db:
        # 총 자료 수
        async with db.execute("SELECT COUNT(*) FROM resources") as cursor:
            total = (await cursor.fetchone())[0]

        # 카테고리별 수
        async with db.execute(
            "SELECT category, COUNT(*) FROM resources GROUP BY category"
        ) as cursor:
            by_category = {row[0]: row[1] for row in await cursor.fetchall()}

        # 기여자 수
        async with db.execute(
            "SELECT COUNT(DISTINCT user_id) FROM resources"
        ) as cursor:
            contributors = (await cursor.fetchone())[0]

        return {
            "total": total,
            "by_category": by_category,
            "contributors": contributors
        }
