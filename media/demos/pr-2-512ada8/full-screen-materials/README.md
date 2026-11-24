# ASTERIA — full-screen gameplay edit materials

- **Playable build:** exact playable code at PR #2 merge `512ada8aa430c8b1a329063e8d715603cfc6f51f` (the later archive commits changed no game code).
- **Captured:** 2026-11-23 (UTC).
- **Capture:** 540 × 960 mobile viewport, shown in full and uniformly enlarged to 1080 × 1920; no zoom or crop. Source capture cadence is 4 fps; delivered H.264 MP4s use 24 fps.
- **Audio:** original synthesized ambient score and soft UI-like chimes. The portrait walkthrough and individual scene clips have AAC stereo audio. The standalone WAV is a 48 kHz stereo edit mix. `full-walkthrough-silent.mp4` is the matching picture-only master.
- **Editing metadata:** `capture-index.json` has the viewport/output dimensions and each clip's start frame, frame count, duration, and timeline in-point. Scene MP4s are separated for quick selects; the full soundtrack can be used when rebuilding a cut.

## Full-length masters

| File | Format | Duration | Use |
|---|---|---:|---|
| `full-walkthrough-portrait-1080x1920.mp4` | 1080 × 1920, H.264 + AAC, 24 fps | 50.5 s | Complete, sound-backed walkthrough. |
| `full-walkthrough-silent.mp4` | 1080 × 1920, H.264, 24 fps | 50.5 s | Silent picture master. Pair with the WAV or a replacement mix. |
| `full-walkthrough-soundtrack.wav` | Stereo PCM, 48 kHz | 52 s | Separate edit-ready soundtrack with slight head/tail handles. |

## Scene clips in actual play order

| Clip | Duration | Recorded interaction |
|---|---:|---|
| `01-overview.mp4` | 3.5 s | Full-screen resort overview and starting state. |
| `02-reservations-and-room-assignment.mp4` | 6 s | Guest requests and automatic room assignment. |
| `03-night-report.mp4` | 5 s | Open the first night and inspect the complete report. |
| `04-island-map.mp4` | 5 s | Switch to and inspect the resort map. |
| `05-module-inspector.mp4` | 2.5 s | Select the observatory and open its inspector. |
| `06-module-upgrade-confirmation.mp4` | 2.5 s | Actually upgrade the observatory to level 2. |
| `07-blueprint-catalog.mp4` | 4 s | Browse the build catalog. |
| `08-placement-preview.mp4` | 3 s | Select the solar blueprint and preview placement. |
| `09-facility-placed.mp4` | 3 s | Place the solar facility on the island. |
| `10-night-report-after-build.mp4` | 4 s | Run another night after construction. |
| `11-season-finale.mp4` | 4 s | Advance through the remaining nights to the season-end report. |
| `12-memory-album-overview.mp4` | 4 s | Open the accumulated travel-memory album. |
| `13-postcard-artwork-and-story.mp4` | 4 s | Scroll through postcard art and guest stories. |

Each clip has the original stereo mix. This package supplements (and does not replace) the earlier portrait, landscape, and square social cuts in the parent folder. For later release videos, record only the newly added or changed elements; keep this full walkthrough as the baseline reference.
