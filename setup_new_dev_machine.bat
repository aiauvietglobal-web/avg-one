@echo off
chcp 65001 > NUL
echo ======================================================================
echo           PLATFORM AVG ONE - SCRIPT KHÔI PHỤC MÁY MỚI (1-CLICK SETUP)
echo ======================================================================
echo.

echo [1/3] Dang kiem tra Node.js & Git environment...
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] Chưa cai dat Git! Vui long cai dat Git tai https://git-scm.com
    pause
    exit /b
)

where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [LOI] Chưa cai dat Node.js! Vui long cai dat Node.js 20+ tai https://nodejs.org
    pause
    exit /b
)

echo [OK] Git va Node.js da san sang!
echo.

echo [2/3] Dang cai datDependencies cho toan bo Monorepo...
call npm install
echo [OK] Cai dat xong Dependencies!
echo.

echo [3/3] Dang sinh ma Prisma Client cho Database...
cd packages\database
call npm run generate
cd ..\..
echo [OK] Sync Prisma Schema thanh cong!
echo.

echo ======================================================================
echo    🎉 KHÔI PHỤC NỀN TẢNG THANH CÔNG! BẮT ĐẦU CHẠY SERVERS (DEV)...
echo ======================================================================
echo.
call npm run dev
pause
