@echo off
rem Serves the portfolio on http://localhost:4174 (public via the Tailscale
rem funnel at https://desktop-19v84r1-1.tailcca76a.ts.net:8443).
rem Safe to double-click twice: the second copy just exits if the port's taken.
cd /d "%~dp0"
start "portfolio site" /min python serve.py
