@echo off
title Beawar Election Attendance Software - GitHub Deployer
color 0A
echo =========================================================================
echo       BEAWAR DISTRICT ELECTION TRAINING ATTENDANCE SOFTWARE
echo                 AUTOMATED GITHUB UPLOAD TOOL
echo =========================================================================
echo.

echo Checking Git installation...
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo [ERROR] Git is not installed or not in PATH.
    echo Please install Git from https://git-scm.com/ and try again.
    pause
    exit /b
)

echo.
echo [1/4] Initializing Git repository...
git init
git branch -M main

echo.
echo [2/4] Staging project files...
git add .

echo.
echo [3/4] Creating initial commit...
git commit -m "Initial release: Beawar District Election Training Attendance Portal v1.0"

echo.
echo =========================================================================
echo  Please enter your GitHub Repository URL (e.g. https://github.com/YOUR_USERNAME/beawar-election-attendance.git)
echo =========================================================================
set /p REPO_URL="Repository URL: "

if "%REPO_URL%"=="" (
    echo [WARNING] No repository URL provided. Git commit completed locally.
    pause
    exit /b
)

echo.
echo [4/4] Connecting remote and pushing to GitHub...
git remote remove origin >nul 2>&1
git remote add origin %REPO_URL%
git push -u origin main

echo.
echo =========================================================================
echo [SUCCESS] Code successfully uploaded to GitHub!
echo To enable GitHub Pages (Free Hosting):
echo 1. Go to your repo on github.com
echo 2. Go to Settings > Pages
echo 3. Select Source: 'main' branch / root '/' folder
echo 4. Save and copy your live Web App URL!
echo =========================================================================
pause
