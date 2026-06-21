# Resolume Training Guidebook

A small static site for the church AV/tech team, training on Resolume by building on
existing ProPresenter familiarity. Plain HTML/CSS/JS, no build step, published via GitHub
Pages.

## Structure

- `index.html` — cover page with the three chapters
- `pages/what-is-resolume.html` — Chapter ①
- `pages/how-is-resolume.html` — Chapter ②
- `pages/advanced.html` — Chapter ③ (mirrors ②'s sections, filled in over time)
- `css/style.css` — shared styles
- `js/guidebook.js` — scrollspy, collapsible "advanced" callouts, scroll progress bar

## Editing

Open `index.html` directly in a browser (`file://`) to preview — no server needed.

To add content to a Chapter ③ section, find its `<section class="topic" id="...">` in
`pages/advanced.html` (the `id` matches the same section in `how-is-resolume.html`) and
replace the `.placeholder-card` with real content.

To add a new "advanced" callout in Chapter ②, copy this block into the relevant section:

```html
<div class="callout advanced">
  <button class="callout-toggle" type="button">
    Callout title
    <span class="chevron">▾</span>
  </button>
  <div class="callout-body">
    <p>Callout content.</p>
  </div>
</div>
```

## Publishing

In the GitHub repo: **Settings → Pages → Source: Deploy from a branch → `main` / `/ (root)`**.
The `.nojekyll` file at the repo root is required so GitHub doesn't run its default Jekyll
build over these plain files.
