# PowerShell script to start both backend and frontend for the Amazon project
# Usage: Right-click and 'Run with PowerShell' or run in a PowerShell terminal

Write-Host "Starting backend..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd backend; npm install; node server.js'

Start-Sleep -Seconds 2

Write-Host "Starting frontend..."
Start-Process powershell -ArgumentList '-NoExit', '-Command', 'cd frontend; npm install; npm start'

Write-Host "\nBoth backend (http://localhost:5000) and frontend (http://localhost:3000) are starting."
Write-Host "If you see a browser window, visit http://localhost:3000."
