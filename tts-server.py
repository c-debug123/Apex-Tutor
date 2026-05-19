#!/usr/bin/env python3
"""
Kokoro TTS server — runs locally on port 8880, or on Railway via $PORT.
Called by Next.js /api/tts route.
"""

import io
import json
import os
import urllib.request
import soundfile as sf
from http.server import BaseHTTPRequestHandler
from socketserver import ThreadingMixIn
from http.server import HTTPServer
from kokoro_onnx import Kokoro

MODEL_URL   = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/kokoro-v1.0.int8.onnx"
VOICES_URL  = "https://github.com/thewh1teagle/kokoro-onnx/releases/download/model-files-v1.0/voices-v1.0.bin"
MODEL_PATH  = "kokoro-v1.0.int8.onnx"
VOICES_PATH = "voices-v1.0.bin"

def download_if_missing(path: str, url: str) -> None:
    if not os.path.exists(path):
        print(f"Downloading {path} ...")
        urllib.request.urlretrieve(url, path)
        print(f"Downloaded {path}.")

download_if_missing(MODEL_PATH,  MODEL_URL)
download_if_missing(VOICES_PATH, VOICES_URL)

class ThreadingHTTPServer(ThreadingMixIn, HTTPServer):
    daemon_threads = True

print("Loading Kokoro model...")
kokoro = Kokoro(MODEL_PATH, VOICES_PATH)
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
                voice="af_heart",
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
    port = int(os.environ.get("PORT", 8880))
    host = "0.0.0.0" if os.environ.get("PORT") else "127.0.0.1"
    server = ThreadingHTTPServer((host, port), TTSHandler)
    print(f"TTS server listening on {host}:{port}")
    server.serve_forever()
