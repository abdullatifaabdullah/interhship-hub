#!/usr/bin/env python3
import os
import uvicorn
from app.main import app

if __name__ == "__main__":
    # Set the port to 5000
    port = int(os.getenv("PORT", "5000"))
    uvicorn.run(app, host="0.0.0.0", port=port)
