@echo off

REM Set the path to the python folder
set PYTHON_DIR=python

REM Check if venv exists, if not create it
if not exist "%PYTHON_DIR%\venv" (
    echo Creating virtual environment...
    python -m venv %PYTHON_DIR%\venv
) else (
    echo Virtual environment exists.
)

REM Activate the virtual environment
call %PYTHON_DIR%\venv\Scripts\activate

REM Check if requirements are installed, if not install them
pip freeze | findstr /C:"-r %PYTHON_DIR%\requirements.txt" 1>nul
if errorlevel 1 (
    echo Installing requirements...
    pip install -r %PYTHON_DIR%\requirements.txt
) else (
    echo Requirements already installed.
)

REM Run the script
python %PYTHON_DIR%\convert_webp.py

REM Deactivate the virtual environment
deactivate