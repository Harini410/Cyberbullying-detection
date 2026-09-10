from backend.app.database.database import get_db

# Re-export get_db for clean modular imports
__all__ = ["get_db"]
