# ASTERIA demo video archive

Store social-ready footage in Git by playable release/PR version. Include audio-backed MP4 exports plus silent picture masters and separate WAV mixes when practical, so the footage can be recut and remixed for different platforms. Use original or properly licensed music and effects; add narration, subtitles, and titles in a separate edit.

## Persistent release rule

After **every pull request merge**, archive a demo of the exact merged playable build, keyed to the PR number and merge commit:

```text
media/demos/pr-<number>-<merge-sha-short>/
```

Include at least portrait 9:16 footage for short-form social posts, plus useful 16:9 or 1:1 cuts. Each social-ready MP4 should have an audible original/properly licensed soundtrack or captured game audio; include silent picture masters and separate WAV mixes when practical for later editing. Add a README in that version folder with the full merge SHA, date, video dimensions/durations, scenes covered, codec/audio notes, and any capture-specific layout changes. If footage is captured before merge, verify it against the merged commit and record the final merge SHA afterward. If the merge changes no playable behavior (for example, an archive-only change), retain/reuse the existing playable-build footage and note that in the manifest rather than inventing a new gameplay version.

Keep the video files and edit-friendly audio masters in Git alongside their manifest; avoid committing raw frame sequences or scratch renders. Use H.264 MP4 with AAC audio for compatibility and practical editing. The video-only archive commit/PR should be associated with the version it documents.

## Archived versions

- [`pr-1-4b0ceea/`](pr-1-4b0ceea/) — PR #1, the first ASTERIA playable build.
- [`pr-2-512ada8/`](pr-2-512ada8/) — PR #2, the generated-art and animation redesign; archive keyed to merged commit `512ada8aa430c8b1a329063e8d715603cfc6f51f`.
- [`pr-4-293a37f/`](pr-4-293a37f/) — PR #4, the map-first command-deck redesign; archive keyed to merged commit `293a37f2b5bc26109b0c2ef4cf39012a937a970c`.
- PR #5 is archive-only: it records these PR #4 demo assets and changes no playable behavior, so no second gameplay video is needed.
- [`pr-6-c40af3b/`](pr-6-c40af3b/) — PR #6, the island-first game screen; archive keyed to merged commit `c40af3b0f1b9685a8c690136b03be3b06774c122`.
- The PR carrying the PR #6 archive is archive-only and changes no playable behavior; this PR #6 footage is the correct version to reuse.
- [`pr-8-082f88b/`](pr-8-082f88b/) — PR #8, the guided first-night and staged day-two introduction; archive keyed to merged commit `082f88b6ba9da32ea8b5af24c3758934541d4182`.
- [`pr-10-4ba2766/`](pr-10-4ba2766/) — PR #10, the cozy five-night ASTERIA rebuild; archive keyed to merged commit `4ba2766a28dde8e91855bbcb348e0bc125e50463`. Its post-merge video archive is archive-only, with no gameplay changes; this PR #10 footage is the correct build to reuse.
- PR #9 carries the PR #8 demo assets only; it changes no playable behavior, so the PR #8 footage is the correct merged-game version to reuse (no second gameplay take is needed).
