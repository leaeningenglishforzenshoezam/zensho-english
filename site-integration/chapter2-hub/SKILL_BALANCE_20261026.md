# Skill balance and redesign notice — 2026-10-26

Apply skill-balance-20261026.patch after developer-and-notices.patch to the Site-layout tree, not the older root runtime. Base 9ca1d3ca96633abe45de789590e204d0f0ca6ae9; result bbc07ba937ef00776cb42466b7760efdc0ebe1c2. Also carries the November 30 Vercel deadline extension to keep the integration copy current.

30 skill definitions strengthened; descriptions of all 51 now show effective multipliers (including existing 1.1 modifier). Harmony/Defend power 1.5 (effective 1.65), shield factor .5; Cure .75 (effective .825 HP). Preparation retained after wrong attacks, consumed on correct attacks. Saved actor definitions refreshed on render without changing HP or remaining/max uses. No IDs, ownership, evolution conditions or learning stats changed.

Redesign announcement is PREVIEW only: main dex still uses old names/descriptions. No main changes in this task. Verify migration before public rollout.

Tests: skill-balance 5 cases; existing Chapter 1 flow, Chapter 2 hub/account guards, developer isolation, question routing/audio, presentation and combat revision all passed. No new phone/browser playthrough in this numeric balance pass.
