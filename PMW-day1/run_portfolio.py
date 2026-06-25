#!/usr/bin/env python3
"""
Ruwaida's Portfolio Dev Server
------------------------------
A lightweight, clean development server written in Python.
It hosts the portfolio locally, opens it in the browser, and logs requests.
"""

import http.server
import socketserver
import webbrowser
import threading
import os
import sys

# Define port and server settings
PORT = 8000
DIRECTORY = os.path.dirname(os.path.abspath(__file__))

class CustomHTTPHandler(http.server.SimpleHTTPRequestHandler):
    """Custom request handler that points to the correct directory and logs request info."""
    
    def __init__(self, *args, **kwargs):
        # Serve files relative to the script's directory (where index.html is located)
        super().__init__(*args, directory=DIRECTORY, **kwargs)
        
    def log_message(self, format, *args):
        """Overrides the default log to print nice formatted statements in console."""
        sys.stdout.write("[DevServer] -> %s\n" % (format % args))

def open_browser():
    """Automatically launches the system web browser pointing to the server address."""
    url = f"http://localhost:{PORT}/index.html"
    print(f"[DevServer] Opening browser pointing to: {url}")
    webbrowser.open(url)

def start_server():
    """Initializes and runs the TCP server."""
    # Use socketserver to handle address reuse immediately
    socketserver.TCPServer.allow_reuse_address = True
    
    try:
        with socketserver.TCPServer(("", PORT), CustomHTTPHandler) as httpd:
            print(f"[DevServer] Server active on port {PORT}")
            print(f"[DevServer] Serving directory: {DIRECTORY}")
            print("[DevServer] Press Ctrl+C to terminate this server.")
            
            # Start browser in a separate thread so it doesn't block the server startup
            threading.Timer(1.0, open_browser).start()
            
            # Run server loop
            httpd.serve_forever()
            
    except KeyboardInterrupt:
        print("\n[DevServer] Server terminated by user request. Exiting...")
    except Exception as e:
        print(f"\n[DevServer] Error starting server: {e}")

if __name__ == "__main__":
    start_server()
