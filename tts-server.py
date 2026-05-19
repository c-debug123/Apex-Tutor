#!/usr/bin/env python3
"""
Local Kokoro TTS server — runs on http://localhost:8880
Called by Next.js /api/tts route.
"""

import io
import json
import soundfile as sf
from http.server import BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
from http.server import HTTPServer
from kokoro_onnx import Kokoro

class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

print("Loading Kokoro model... (first run downloads ~330 MB, subsequent runs are instant)")
kokoro = Kokoro("kokoro-v1.0.int8.onnx", "voices-v1.0.bin")
print("Kokoro ready.")

print("Warming up model...")
kokoro.create("Hello", voice="af_heart", speed=1.0, lang="en-us")
print("Warm-up done.")

class TTSHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        print(f"[tts-server] {format % args}")

    def do_POST(self):
        if self.path != "/tts":
            self.send_response(404)
            self.end_headers()
            return

        length = int(self.headers.get("Content-Length", 0))
        body = json.loads(self.rfile.read(length) or b"{}")
        text = body.get("text", "").strip()

        if not text:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(b'{"error":"text required"}')
            return

        try:
            samples, sample_rate = kokoro.create(
                text,
                voice="af_heart",   # warm female voice — great for kids
                speed=1.0,
                lang="en-us",
            )

            buf = io.BytesIO()
            sf.write(buf, samples, sample_rate, format="WAV")
            audio_bytes = buf.getvalue()

            self.send_response(200)
            self.send_header("Content-Type", "audio/wav")
            self.send_header("Content-Length", str(len(audio_bytes)))
            self.send_header("Cache-Control", "no-store")
            self.end_headers()
            self.wfile.write(audio_bytes)

        except Exception as e:
            print(f"[tts-server] ERROR: {e}")
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())

if __name__ == "__main__":
    server = ThreadingHTTPServer(("127.0.0.1", 8880), TTSHandler)
    print("TTS server listening on http://127.0.0.1:8880")
    server.serve_forever()
