import asyncpg
from .core.config import DATABASE_URL
_pool = None

async def get_pool():
    global _pool
    if _pool is None:
        _pool = await asyncpg.create_pool(DATABASE_URL, min_size=1, max_size=5)
    return _pool

async def fetchrow(query, *args):
    pool = await get_pool()
    async with pool.acquire() as conn:
        return await conn.fetchrow(query, *args)

async def fetchval(query, *args):
    pool = await get_pool()
    async with pool.acquire() as conn:
        return await conn.fetchval(query, *args)

async def execute(query, *args):
    pool = await get_pool()
    async with pool.acquire() as conn:
        return await conn.execute(query, *args)

async def fetch(query, *args):
    pool = await get_pool()
    async with pool.acquire() as conn:
        return await conn.fetch(query, *args)
