import os
from dotenv import load_dotenv
load_dotenv()
PORT = int(os.getenv("PORT", "8080"))
DB_HOST = os.getenv("DB_HOST", "localhost")
DB_PORT = int(os.getenv("DB_PORT", "5432"))
DB_NAME = os.getenv("DB_NAME", "hubdb")
DB_USER = os.getenv("DB_USER", "hub")
DB_PASSWORD = os.getenv("DB_PASSWORD", "hubpass")
DATABASE_URL = f"postgresql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}:{DB_PORT}/{DB_NAME}"
