# ASTERIA — player journey & first-session design

## Product promise

**「あなたの選択で、星の旅人の一夜が変わる。」**

ASTERIA should feel like tending a tiny, personal island—not operating a spreadsheet. The first screen therefore asks for one readable action, gives immediate feedback on the island itself, then reveals depth only after the player has seen why the loop is rewarding.

## Design references (patterns, not visual copies)

- **Clash of Clans:** make the world itself the menu. A building, empty plot, or highlighted target communicates what a tap will do; context-sensitive choices stay near the playfield rather than appearing in a distant side drawer.
- **Stardew Valley:** give a session a satisfying, understandable rhythm. ASTERIA's “welcome a traveler → open the night → see the outcome” is a short, repeatable day-end loop.
- **Animal Crossing:** make visitors feel like people with small, specific wishes, and let keepsakes make progress emotionally legible—not only numerical.

These are high-level interaction and motivation patterns; ASTERIA keeps its asteroid-resort setting, artwork, guests, and progression original.

## First-session progression

| Moment | Player sees / does | Feeling and design intent | Marketing / product signal |
|---|---|---|---|
| First glance | A small island, one waiting traveler, two useful resources, and a single highlighted guest room. Construction and the album are not shown yet. | “I know where to start.” No glossary or menu hunt. | Time to first meaningful action. |
| First tap | Tap the gold-beacon room; the traveler icon appears on that room and the prompt changes. | A clear cause → effect on the map. | First assignment completion. |
| First payoff | The gold moon button opens the night report: traveler, room, stars, credits, and a postcard if earned. | “My choice changed this result.” | Assignment-to-night-start conversion and report completion. |
| Second day | Two travelers arrive. Guest switching, the build control, the memory control, oxygen, and power become visible. The same tap-room action still works. | Complexity arrives after the core loop is understood. | Second-day action rate; resource comprehension. |
| Island investment | Tap a green-plus plot to open the nearby build rail, or tap Build first to see valid plots. Pick a blueprint, then place it on a highlighted neighbor tile. | The world teaches placement rules; the player can see the result before committing. | Build discovery and first expansion. |
| Habit loop | Choose rooms → optionally improve the island → open the night → collect a memory. Seven nights form a season. | A short session has closure plus a visible next goal. | Nights per session; season completion; return on the next in-game day. |
| Sharing / advocacy | A postcard can be shared from the in-world memory rail via the device share sheet or copied as text. | The reward is a story about a guest, not a generic “invite friends” interruption. | Share attempts/completions (only if product analytics are later added with appropriate consent). |

The KPI values are hypotheses to test with players, not existing analytics or promised performance.

## One-screen interaction rules

1. The island remains the main play surface. There is no navigation drawer, right-side menu, or full-screen management sheet.
2. A highlighted room means “tap to assign”; a green plus means “tap to choose/build here”; an occupied facility means “tap to inspect.”
3. Every successful tap changes something visible on the same screen: a guest marker, tile highlight, progress count, facility model, or explicit next-step prompt.
4. Context stays in a compact rail above the bottom controls. It can be dismissed without losing place or hiding the island.
5. The bottom controls use action words—**客室 / 建てる / 思い出 / 今夜を開く**—rather than icons alone. On the first night only the two relevant actions are shown.
6. The first night is deliberately small: one guest, six starting structures, two resources, and a single room target. The next day introduces two guests and the remaining system indicators.
7. Never teach a rule only with a toast. A toast may reinforce feedback, while the map, selected tile, and next-step prompt remain the source of truth.

## Ten review lenses

The request asked for ten subagents. This environment does not provide independent subagent execution, so these are ten explicitly separated design-review lenses rather than ten claimed agent runs:

1. **First-time experience:** remove the empty-state guesswork and begin with one guest.
2. **Affordance / interaction:** distinguish room targets, build plots, inspected modules, and the night action by shape, color, and wording.
3. **Navigation:** keep play actions in a persistent bottom dock and remove the right drawer.
4. **Cognitive load:** defer nonessential resources and features until after the first outcome.
5. **Feedback:** show the result of assignment and construction on the island, not only in transient notifications.
6. **Progression:** step from one guest to two, then let the player choose expansion and new capacity.
7. **Reward design:** connect stars and credits to guest fit, and make postcards a tangible emotional reward.
8. **Retention:** use the understandable nightly ritual and seven-night season as a natural return cadence.
9. **Marketing / sharing:** express the game's promise in the guest story; make a postcard the optional organic share unit, without interrupting play with an invite prompt.
10. **Accessibility / quality:** provide visible labels, meaningful button names, keyboard dismissal, reduced-motion support, and responsive tap targets; validate the whole first-session path at mobile and desktop sizes.

## Validation checklist

- Fresh save starts with one unassigned guest and one recommended room visibly pulsing.
- Tapping the room assigns the guest, updates the tile immediately, and changes the objective to opening the night.
- The first night can be completed without opening any side menu; the report explains stars and credits.
- Closing the first report reveals the next day and introduces the additional controls and system indicators.
- Assignment, construction, inspection/upgrade, memory preview/share, and night report remain usable from the island screen.
- No horizontal overflow or right-side drawer at 320–1280 px widths; screen-reader labels and reduced-motion preference remain intact.
