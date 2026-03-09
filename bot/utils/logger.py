# 뽀삐 로깅 시스템
import logging
import os
import sys
import traceback
from datetime import datetime
from logging.handlers import TimedRotatingFileHandler
from pathlib import Path

# 로그 디렉토리 (output/logs/)
LOG_DIR = Path(__file__).parent.parent.parent / "logs"
LOG_DIR.mkdir(exist_ok=True)

# 로그 포맷
DETAILED_FORMAT = "%(asctime)s [%(levelname)s] %(name)s:%(lineno)d - %(message)s"
SIMPLE_FORMAT = "%(asctime)s [%(levelname)s] %(message)s"
DATE_FORMAT = "%Y-%m-%d %H:%M:%S"


def setup_logger(name: str = "poppi") -> logging.Logger:
    """
    로거 설정
    - logs/poppi.log: 전체 로그 (INFO 이상), 날짜별 로테이션
    - logs/error.log: 에러 로그만 (ERROR 이상), 날짜별 로테이션
    - 콘솔: 전체 로그 출력
    """
    logger = logging.getLogger(name)

    # 이미 핸들러가 설정되어 있으면 스킵
    if logger.handlers:
        return logger

    logger.setLevel(logging.DEBUG)

    # 1. 전체 로그 파일 (INFO 이상, 날짜별 로테이션)
    main_handler = TimedRotatingFileHandler(
        LOG_DIR / "poppi.log",
        when="midnight",      # 자정마다 로테이션
        interval=1,
        backupCount=30,       # 30일치 보관
        encoding="utf-8"
    )
    main_handler.suffix = "%Y-%m-%d"  # poppi.log.2024-03-09 형식
    main_handler.setLevel(logging.INFO)
    main_handler.setFormatter(logging.Formatter(DETAILED_FORMAT, DATE_FORMAT))

    # 2. 에러 전용 로그 파일 (ERROR 이상)
    error_handler = TimedRotatingFileHandler(
        LOG_DIR / "error.log",
        when="midnight",
        interval=1,
        backupCount=90,       # 에러는 90일치 보관
        encoding="utf-8"
    )
    error_handler.suffix = "%Y-%m-%d"
    error_handler.setLevel(logging.ERROR)
    error_handler.setFormatter(logging.Formatter(DETAILED_FORMAT, DATE_FORMAT))

    # 3. 콘솔 출력
    console_handler = logging.StreamHandler(sys.stdout)
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(logging.Formatter(SIMPLE_FORMAT, DATE_FORMAT))

    logger.addHandler(main_handler)
    logger.addHandler(error_handler)
    logger.addHandler(console_handler)

    return logger


def log_exception(logger: logging.Logger, e: Exception, context: str = ""):
    """예외 발생 시 전체 traceback 로깅"""
    tb = traceback.format_exc()
    if context:
        logger.error(f"[{context}] {type(e).__name__}: {e}\n{tb}")
    else:
        logger.error(f"{type(e).__name__}: {e}\n{tb}")


# 기본 로거
logger = setup_logger()
