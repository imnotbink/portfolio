# Minimal static server with Range support (audio scrubbing needs 206s).
# Windows twin of server.js: python serve.py
import os, re, mimetypes
from http.server import BaseHTTPRequestHandler, ThreadingHTTPServer
from urllib.parse import unquote, urlparse

ROOT = os.path.dirname(os.path.abspath(__file__))
PORT = 4174
mimetypes.add_type("audio/mp4", ".m4a")

class H(BaseHTTPRequestHandler):
    def do_GET(self):
        path = unquote(urlparse(self.path).path)
        file = os.path.normpath(os.path.join(ROOT, path.lstrip("/") or "index.html"))
        if os.path.isdir(file):
            file = os.path.join(file, "index.html")
        # separator-anchored so "..\Portfolio - Copy" style siblings can't slip past
        if not (file == ROOT or file.startswith(ROOT + os.sep)) or not os.path.isfile(file):
            self.send_response(404); self.end_headers(); return
        size = os.path.getsize(file)
        ctype = mimetypes.guess_type(file)[0] or "application/octet-stream"
        m = re.match(r"bytes=(\d*)-(\d*)", self.headers.get("Range", ""))
        with open(file, "rb") as f:
            if m:
                start = int(m.group(1) or 0)
                end = int(m.group(2)) if m.group(2) else size - 1
                self.send_response(206)
                self.send_header("Content-Range", f"bytes {start}-{end}/{size}")
                self.send_header("Content-Length", str(end - start + 1))
                self.send_header("Content-Type", ctype)
                self.send_header("Accept-Ranges", "bytes")
                self.end_headers()
                f.seek(start)
                self.wfile.write(f.read(end - start + 1))
            else:
                self.send_response(200)
                self.send_header("Content-Length", str(size))
                self.send_header("Content-Type", ctype)
                self.send_header("Accept-Ranges", "bytes")
                self.end_headers()
                self.wfile.write(f.read())

    def log_message(self, *a):
        pass

if __name__ == "__main__":
    print(f"portfolio preview on http://localhost:{PORT}")
    ThreadingHTTPServer(("127.0.0.1", PORT), H).serve_forever()
