# Player refinements

- Quest victories expose the current battle's missed questions. Chapter completion shows the accumulated unique misses. Weak registrations use existing learning-page keys, preserving other entries and the sentence page's automatic flags.
- Counter scaling: nagomi 0.20, shirabe 0.18, q7_special 0.12 of defense, before affinity and variance.
- Compact portrait battle CSS; landscape layout places characters left, question and choices right. No forced clipping of long content.
- Adventure profile adds male/female/unanswered selection to cloud.html. It is account-scoped on this device, separate from server identity; protagonist-only first-person wording and current-stage token use it. Neutral default is わたし and a traveler token.
- Mission and management panels use explicit light surfaces and dark text. Reorder prompt retains a blank, with choices before the selected answer area.
- Local wallet is an extension of the existing item state. One locked write commits balance, draws, claims and ownership together. Registration uses the same guest lock name. Welcome 10 fragments per level; completed daily mission rewards are claimable once per date/slot/level. No purchases. N94/R5/SR1; ten-pull R+ guarantee. Existing loadouts are retained.
- Wallet, inventory and adventure profile are not cloud-synced. Learning weak records keep their existing sync path. main and server schemas are untouched.
- Checks: combat/staging regression, 20-scene flow, atomic wallet spend, duplicate rewards, insufficient funds, ten-pull guarantee, weak record shape and account switch rejection. Browser verified mission menu, detail sheet, closing dex and gacha page. Mobile orientation and HTTPS Web Locks interaction require device acceptance testing; local preview uses HTTP and cannot exercise Web Locks.
