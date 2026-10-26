# Mobile UI update

Apply mobile-ui-tutorial-reveal.patch after art-lossless-delivery.patch to the Site source layout (dist/ + checks/). This is a preserved integration patch, not a replacement for the GitHub application root. Main is unchanged.

- Narration inherits its panel color.
- Compact skill/gear slots open a searchable modal picker with question-format filters; selection returns to the slots; explicit save remains.
- Tutorial and regular gacha share the reveal animation. Tutorial remains practice-only; save occurs before animation.
- No enemy stat changes.
- Tests: mobile-ui, chapter-flow, shop-review, chapter2-render pass. Browser checked at 390px width using isolated mock inventory (no player writes).

Before student rollout: integrate source patches into the actual app branch, verify real login/save/rewards and chapter unlocks end to end, then iOS/Android smoke tests. Site remains owner-private.
