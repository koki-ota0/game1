import os
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer


class NoCacheStaticHandler(SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store, no-cache, must-revalidate, max-age=0")
        self.send_header("Pragma", "no-cache")
        self.send_header("Expires", "0")
        super().end_headers()


if __name__ == "__main__":
    port = int(os.environ.get("PORT", "4173"))
    ThreadingHTTPServer(("0.0.0.0", port), NoCacheStaticHandler).serve_forever()
