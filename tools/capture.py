"""Full-page screenshots through the Chrome DevTools protocol.

Headless Chrome clamps its window to ~500px wide, so phone widths need real
device-metrics emulation. Usage:

  python tools/capture.py --url http://localhost:8773/ --out shot.png \
      --width 390 --height 844 [--scale 2] [--mobile] [--scheme light|dark]
"""
import argparse, base64, json, os, shutil, subprocess, sys, tempfile, time, urllib.request
import websocket  # websocket-client

CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

def capture(url, out, width, height, scale=1, mobile=False, scheme="light", reduced_motion=True, full_page=True, settle=1.2, port=9333, js=None, js_wait=0.0):
    profile = tempfile.mkdtemp(prefix="mwe-cdp-")
    args = [CHROME, "--headless=new", "--disable-gpu", "--no-sandbox", "--hide-scrollbars",
            "--no-first-run", "--disable-extensions", "--remote-allow-origins=*", f"--remote-debugging-port={port}",
            f"--user-data-dir={profile}", f"--window-size={max(width, 800)},{max(height, 600)}", "about:blank"]
    proc = subprocess.Popen(args, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
    try:
        ws_url = None
        for _ in range(60):
            try:
                targets = json.load(urllib.request.urlopen(f"http://127.0.0.1:{port}/json"))
                pages = [t for t in targets if t.get("type") == "page"]
                if pages:
                    ws_url = pages[0]["webSocketDebuggerUrl"]; break
            except Exception:
                pass
            time.sleep(0.25)
        if not ws_url:
            raise RuntimeError("Chrome did not expose a page target")
        ws = websocket.create_connection(ws_url, timeout=30)
        seq = [0]
        def send(method, params=None):
            seq[0] += 1
            ws.send(json.dumps({"id": seq[0], "method": method, "params": params or {}}))
            while True:
                msg = json.loads(ws.recv())
                if msg.get("id") == seq[0]:
                    if "error" in msg:
                        raise RuntimeError(f"{method}: {msg['error']}")
                    return msg.get("result", {})
        send("Page.enable")
        send("Emulation.setDeviceMetricsOverride", {"width": width, "height": height, "deviceScaleFactor": scale, "mobile": mobile})
        if mobile:
            send("Emulation.setTouchEmulationEnabled", {"enabled": True})
        features = [{"name": "prefers-color-scheme", "value": scheme}]
        if reduced_motion:
            features.append({"name": "prefers-reduced-motion", "value": "reduce"})
        send("Emulation.setEmulatedMedia", {"features": features})
        send("Page.navigate", {"url": url})
        # wait for load
        deadline = time.time() + 30
        while time.time() < deadline:
            msg = json.loads(ws.recv())
            if msg.get("method") == "Page.loadEventFired":
                break
        time.sleep(settle)
        # fonts + layout settle
        send("Runtime.evaluate", {"expression": "document.fonts.ready.then(()=>true)", "awaitPromise": True})
        if js:
            send("Runtime.evaluate", {"expression": js, "awaitPromise": True})
            time.sleep(js_wait)
        metrics = send("Runtime.evaluate", {"expression": "JSON.stringify({w: document.documentElement.scrollWidth, h: document.documentElement.scrollHeight, cw: document.documentElement.clientWidth})", "returnByValue": True})["result"]["value"]
        m = json.loads(metrics)
        if full_page:
            send("Emulation.setDeviceMetricsOverride", {"width": width, "height": m["h"], "deviceScaleFactor": scale, "mobile": mobile})
            time.sleep(0.3)
        shot = send("Page.captureScreenshot", {"format": "png", "captureBeyondViewport": bool(full_page)})
        os.makedirs(os.path.dirname(os.path.abspath(out)), exist_ok=True)
        with open(out, "wb") as f:
            f.write(base64.b64decode(shot["data"]))
        ws.close()
        return m
    finally:
        proc.kill()
        try: proc.wait(timeout=5)
        except Exception: pass
        shutil.rmtree(profile, ignore_errors=True)

if __name__ == "__main__":
    ap = argparse.ArgumentParser()
    ap.add_argument("--url", required=True); ap.add_argument("--out", required=True)
    ap.add_argument("--width", type=int, default=1440); ap.add_argument("--height", type=int, default=900)
    ap.add_argument("--scale", type=float, default=1); ap.add_argument("--mobile", action="store_true")
    ap.add_argument("--scheme", default="light"); ap.add_argument("--motion", action="store_true", help="keep animations (default: reduced motion)")
    ap.add_argument("--viewport-only", action="store_true"); ap.add_argument("--port", type=int, default=9333)
    ap.add_argument("--js", default=None, help="JavaScript to run after load (e.g. click a control)")
    ap.add_argument("--js-wait", type=float, default=0.0, help="seconds to wait after --js")
    a = ap.parse_args()
    m = capture(a.url, a.out, a.width, a.height, a.scale, a.mobile, a.scheme, not a.motion, not a.viewport_only, port=a.port, js=a.js, js_wait=a.js_wait)
    print(f"{a.out}: viewport {a.width}x{a.height} scheme={a.scheme} doc {m['w']}x{m['h']} clientWidth={m['cw']}")
