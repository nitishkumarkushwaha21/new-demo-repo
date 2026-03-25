# Start Gateway
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/gateway'; npm start"

# Start Unified Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/services/unified-service'; npm start"

# Start YouTube Playlist Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/services/youtube-playlist-service'; npm start"

# Start Profile Analysis Service
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'backend/services/profile-analysis-service'; npm start"

Write-Host "All backend services are starting in separate windows..."
