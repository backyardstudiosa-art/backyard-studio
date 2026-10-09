# The House That Remembered

Editorial story page for Backyard Stories.

## Current state

- The story page and stylesheet are in this branch.
- Artwork is still represented by labelled placeholders. Do not treat the page as launch-ready until the approved illustrations have been inserted and reviewed.
- Keep the page on `stories-house-that-remembered` while artwork and responsive QA are in progress. Do not merge or publish without approval.

## Artwork placement plan

The illustration set is planned as three review sheets: 3 images, then 3 images, then 4 images. Review each sheet before moving to the next. Final files should be individual image files, not the full contact-sheet composite.

| # | Story moment | Intended placement |
|---:|---|---|
| 1 | Hart family home / opening | `.cover-art` — establish the house, garden, gate and old tree |
| 2 | Home of little things | `.house-art` — lived-in home and everyday kitchen details |
| 3 | People who made it home | `.family-art` — candid family introduction |
| 4 | Sunday baking | `.baking-art` — Mara and family in the kitchen |
| 5 | The rituals | `.spread-art` — video night or a familiar family gathering |
| 6 | The old tree / years | `.collage-art` or the tree-focused story section, depending on final composition |
| 7 | Leaving | Add a dedicated image slot if the approved artwork supports this beat |
| 8 | What the house remembered | Add a dedicated image slot if the approved artwork supports this beat |
| 9 | What remains | Add a dedicated image slot if the approved artwork supports this beat |
| 10 | Final family image | `.final-art` — warm, hopeful closing image |

The current page has fewer artwork slots than the planned ten illustrations. Once the images are approved, update the markup to give each story beat its own deliberate placement rather than forcing several illustrations into a single slot.

## Artwork and implementation rules

- Preserve character, house architecture, prop, lighting and palette continuity across the complete set.
- Export each approved panel as its own optimized image, retaining enough margin for responsive crops.
- Use meaningful alt text for informative illustrations; use empty alt text only when an image is purely decorative and adjacent text already conveys its meaning.
- Prefer responsive `<picture>` / `<img>` markup with explicit width and height, `loading="lazy"` for below-the-fold artwork, and suitable `object-fit` / `object-position` rules. Keep the opening image eager if it is the page's main visual.
- Do not leave placeholder labels visible in the launch version.
- Keep the story readable and navigable when images fail to load.

## Review checklist before launch

- [ ] All ten approved images have been split into individual files and mapped to the correct story moments.
- [ ] Character and setting continuity reviewed across all images.
- [ ] Desktop layout checked at wide and laptop widths.
- [ ] Mobile layout checked at narrow and common phone widths; no clipped art or horizontal overflow.
- [ ] Image crops and focal points checked at desktop and mobile sizes.
- [ ] Keyboard focus, navigation, heading order, alt text and reduced-motion behaviour checked.
- [ ] WhatsApp call to action and back-to-Stories navigation tested.
- [ ] No placeholder labels, broken images, console errors or temporary launch-blocking metadata remain.
- [ ] Final approval received before merging or publishing.
