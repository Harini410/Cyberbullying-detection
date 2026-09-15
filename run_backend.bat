@echo off
title CyberSafe AI - Backend (FastAPI)
echo ============================================================
echo Starting CyberSafe AI FastAPI Backend on http://127.0.0.1:8000
echo ============================================================
cd /d "%~dp0"
set PYTHONPATH=.
python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload
pause
