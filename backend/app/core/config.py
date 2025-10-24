import os
from dotenv import load_dotenv
load_dotenv()
PORT = int(os.getenv("PORT", "5000"))
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "5432"))
DB_NAME = os.getenv("DB_NAME", "hubdb")
DB_USER = os.getenv("DB_USER", "hub")
DB_PASSWORD = os.getenv("DB_PASSWORD", "hubpass")
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"

# JWT Configuration
JWT_SECRET = os.getenv("JWT_SECRET", "change-me-to-a-secure-random-string-in-production")
JWT_ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")
ACCESS_TOKEN_MIN = int(os.getenv("ACCESS_TOKEN_MIN", "15"))
REFRESH_TOKEN_DAYS = int(os.getenv("REFRESH_TOKEN_DAYS", "7"))
