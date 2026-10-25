# Developer preview and announcement update

Source Site commit: 9ca1d3ca96633abe45de789590e204d0f0ca6ae9
Base Site commit: ddf1f94ba4a9450bdbfb977963ceb21f73b8cfd1

Apply developer-and-notices.patch to the Site-layout tree after the existing balance/audio integration changes. This patch preserves Site changes without replacing the older root Chapter 1 application. It is NOT already merged into the root runtime.

Temporary developer mode is restricted to the private preview hostname/local preview, uses sessionStorage and disables learning writes. Do not enable on the public application. Includes selectable species, evolution and four skills, isolated Chapter 1/2 saves, left-facing partner CSS, removal of future-area placeholder, corrected October 16 notice and migration notice.

Main received ONLY announcements.json migration notice commit 157b21be03290871e4e39fd8e96c941b02a8e80a. Hosting itself is not disabled by that commit.

Validated developer isolation (3 cases), announcement identifiers, chapter unlock/account isolation (6), Chapter 1 flow, audio handoff and question data.
