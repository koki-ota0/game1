# ASTERIA · PR #6 island-first game demo

- **PR:** [#6 — Make ASTERIA's island the game screen](https://github.com/koki-ota0/game1/pull/6)
- **Playable build merge SHA:** `c40af3b0f1b9685a8c690136b03be3b06774c122`
- **Source commit captured:** `5156844`
- **Captured:** 2026-11-23 (UTC)
- **Focus:** the island map as the main game surface; direct guest-to-room assignment; auto-assignment; night results; solar-facility construction; and the memory album.
- **Audio:** original synthesized ambient score, composed for this edit; no third-party music. Social MP4s use H.264 + AAC stereo at 48 kHz. Silent picture masters and separate 48 kHz stereo PCM WAV mixes are included.
- **Capture:** Playwright 1.65.1 operating the merged responsive build in Chromium at native 432 × 768 portrait and 1280 × 720 landscape viewports. The picture is uncropped and upscaled to delivery dimensions; variable screen-capture cadence is frame-blended to 30 fps for smooth playback. No layout changes were applied during capture.

## Deliverables

| File | Format | Duration | Use |
|---|---|---:|---|
| `portrait-1080x1920.mp4` | 1080 × 1920, H.264 + AAC stereo, 30 fps | 25.92 s | Social-ready 9:16 demo with original score. |
| `portrait-1080x1920-silent.mp4` | 1080 × 1920, H.264, 30 fps | 25.90 s | Silent vertical picture master. |
| `portrait-1080x1920-mix.wav` | Stereo PCM, 48 kHz | 25.90 s | Edit-ready vertical mix. |
| `landscape-1920x1080.mp4` | 1920 × 1080, H.264 + AAC stereo, 30 fps | 30.19 s | Social-ready 16:9 demo with original score. |
| `landscape-1920x1080-silent.mp4` | 1920 × 1080, H.264, 30 fps | 30.17 s | Silent widescreen picture master. |
| `landscape-1920x1080-mix.wav` | Stereo PCM, 48 kHz | 30.17 s | Edit-ready widescreen mix. |
| `capture-index.json` | JSON | — | Build SHA, viewports, scene order, and export properties. |

## Interaction sequence

1. Open on the playable island map and HUD.
2. Open tonight's guest sheet, choose a guest, and assign a room directly on the island.
3. Use auto-assignment for the remaining guests and open the night.
4. Review the night results, then open the blueprint sheet.
5. Choose and place a petal-shaped solar facility on a highlighted island tile.
6. End on the three earned postcards in the memory album.

The browser save is cleared before each recording; all shown guest assignments, the night report, construction, and postcards are earned during the captured playthrough.
