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
