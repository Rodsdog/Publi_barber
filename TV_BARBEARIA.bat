@echo off
cd /d "C:\Users\Casa\Desktop\Publi_barber"
start node server.js
start chrome --kiosk http://localhost:3000