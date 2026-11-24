# ASTERIA — PR #10 five-night rebuild demo

- **Pull request:** [#10 — Rebuild ASTERIA as a cozy five-night game](https://github.com/kokilux/game1/pull/10)
- **Merged:** 2026-11-24 UTC
- **Playable-build merge SHA:** `4ba2766a28dde8e91855bbcb348e0bc125e50463`
- **Captured from checkout:** `a1ae2ecc7e1ab53a89ee022833224947371115fe`
- **Build verification:** the captured checkout and merge commit have identical tree SHA `7ff137c6a91b505b404a3b3342adc86cd94868c8`; the recordings show the exact merged playable files.
- **Captured:** 2026-11-24 UTC (portrait at 15:17:44Z; landscape at 15:23:43Z)
- **Capture tool:** Playwright 1.65.1 with Chromium 153.0.0; each take starts with a fresh local save. Native browser recordings were exported with FFmpeg 9.0.2.
- **Source viewports:** portrait 432 × 768 (9:16); landscape 1280 × 720 (16:9).
- **Delivery:** 30 fps H.264 High, 8-bit 4:2:0 limited-range video (`yuv420p`); social MP4s include AAC-LC stereo at 48 kHz. Silent picture masters and separate 16-bit stereo PCM WAV mixes at 48 kHz are included.
- **Music:** original ambient score synthesized for this capture; no third-party music or samples. The game itself has no audio track, so the newly composed score is mixed separately. No narration or subtitles.
- **Framing:** portrait preserves the game’s native layout. The landscape take uses a capture-only two-column reframe (illustrated scene at left, choices and action at right) so the portrait-oriented game art and readable controls both remain prominent in 16:9; gameplay, text, and game code are unchanged.

## What’s shown

1. Meet each traveler and read their wish in the moonberry night camp.
2. Choose among telescope stargazing, star-berry tea, and glowing flowers; see the response and star reward.
3. Welcome all five visitors, then finish the constellation and keepsake screen.

Both takes were played through to the five-night finale with fresh saves, recording the interactions in real time. All five selected activities match the visitors’ wishes.

## Deliverables

| File | Format | Duration | Use |
|---|---|---:|---|
| `portrait-1080x1920.mp4` | 1080 × 1920, H.264 + AAC stereo, 30 fps | 23.80 s | Social-ready 9:16 cut with original score. |
| `portrait-1080x1920-silent.mp4` | 1080 × 1920, H.264, 30 fps | 23.80 s | Silent vertical picture master. |
| `portrait-1080x1920-mix.wav` | Stereo PCM, 48 kHz | 23.80 s | Edit-ready original score mix. |
| `landscape-1920x1080.mp4` | 1920 × 1080, H.264 + AAC stereo, 30 fps | 31.67 s | Social-ready 16:9 cut with original score. |
| `landscape-1920x1080-silent.mp4` | 1920 × 1080, H.264, 30 fps | 31.67 s | Silent widescreen picture master. |
| `landscape-1920x1080-mix.wav` | Stereo PCM, 48 kHz | 31.68 s | Edit-ready original score mix. |
| `capture-index.json` | JSON | — | Full commit provenance, capture metadata, scene order, and export properties. |
