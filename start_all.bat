@echo off
title CyberSafe AI Launcher
echo ============================================================
echo   Launching CyberSafe AI Full-Stack Platform
echo ============================================================
echo.
cd /d "%~dp0"

echo 1. Starting FastAPI Backend (Port 8000)...
start "CyberSafe AI - Backend (FastAPI)" cmd /k "set PYTHONPATH=. && python -m uvicorn backend.app.main:app --host 127.0.0.1 --port 8000 --reload"

echo Waiting 3 seconds for backend initialization...
timeout /t 3 /nobreak >nul

echo 2. Starting Next.js Frontend (Port 3000)...
start "CyberSafe AI - Frontend (Next.js)" cmd /k "pnpm dev"

echo.
echo ============================================================
echo   CyberSafe AI Services Running:
echo     - Web Platform:  http://localhost:3000
echo     - Detect Engine: http://localhost:3000/detect
echo     - Backend Docs:  http://127.0.0.1:8000/docs
echo ============================================================
echo.
echo You can minimize this window.
pause
