# ASTERIA · PR #4 main-screen gameplay demo

- **PR:** [#4](https://github.com/koki-ota0/game1/pull/4)
- **Playable build merge SHA:** `293a37f2b5bc26109b0c2ef4cf39012a937a970c`
- **Captured:** 2026-11-23 (UTC)
- **Focus:** only the features added in PR #4: the always-visible island command deck, direct guest-to-room assignment, build/album sheets, and the new interaction feedback. This is not a repeat of the full-game walkthrough in PR #2.
- **Audio:** original synthesized ambient score and soft UI chimes; no voice-over. Audio-backed exports use H.264 + AAC stereo at 48 kHz. The silent edits and separate 48 kHz stereo PCM WAV are included.
- **Capture:** Playwright-operated, native responsive layouts at 540 × 960 (portrait) and 960 × 540 (landscape), delivered at 1080 × 1920 and 1920 × 1080, 24 fps. The screen stays uncropped. The postcard sheet is held on a final still captured from the live build, so its details remain readable.

## Deliverables

| File | Format | Duration | Use |
|---|---|---:|---|
| `portrait-1080x1920.mp4` | 1080 × 1920, H.264 + AAC, 24 fps | 40.9 s | Social-ready vertical demo with original score. |
| `portrait-1080x1920-silent.mp4` | 1080 × 1920, H.264, 24 fps | 40.9 s | Silent vertical picture master. |
| `landscape-1920x1080.mp4` | 1920 × 1080, H.264 + AAC, 24 fps | 37.0 s | Social-ready widescreen demo with original score. |
| `landscape-1920x1080-silent.mp4` | 1920 × 1080, H.264, 24 fps | 37.0 s | Silent widescreen picture master. |
| `soundtrack.wav` | Stereo PCM, 48 kHz, 43 s | — | Separate edit-ready score/mix with short tail handle. |
| `capture-index.json` | JSON | — | Build SHA, viewports, output properties, and scene order. |

## Interaction sequence

1. Open on the always-visible island command deck—no management tabs.
2. Select an arriving guest, then tap a glowing room tile on the island.
3. Show the guest's assigned room on the map and one-tap planning for the rest of the arrivals.
4. Open a night and show the results report.
5. Open the blueprint sheet from the main screen, select the solar module, and place it on a glowing connected tile.
6. Inspect the completed facility and open the travel-memory sheet with the newly collected postcards.

The capture clears the local save before the run; the postcards are earned through the played night rather than seeded into the album. The separate full walkthrough and earlier social cuts remain in the PR #2 archive.
