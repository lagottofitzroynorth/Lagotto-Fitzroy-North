# Lagotto Website

The main public marketing site for Lagotto restaurant (Fitzroy North), deployed as a
Cloudflare Workers Static Assets project at `lagotto-fitzroynorth.com.au` and
`www.lagotto-fitzroynorth.com.au`.

## This is fully static, hand-authored HTML — no build step, no CMS

`more.html` is the main content page (About/Food/Beverages/Reservations as an accordion).
The food and wine/beverage menu content is **hardcoded directly into the HTML**, in **two
separate places**:

1. The regular Food / Beverages accordion sections.
2. The Chef's Menu "Add to Your Menu" section, further down the same file.

Any menu or wine-list change needs to be applied in both spots by hand — there's no
shared data source doing this automatically.

## Important: this is a completely separate copy of the menu data from the App project

The staff-facing App project (`../App`) reads live wine/food data from GitHub Gists.
This site does not — it has its own independent, static copy of the same content. Updating
one does **not** update the other. They drift out of sync if only one side gets edited —
this has happened before (e.g. wording/pricing edits made in the App's Dish Library that
never made it here). When pushing a menu-PDF update, treat this site as a required, separate
target alongside the App's Gist publish — not an afterthought.

## Local dev

`node server.js` (port 8083) mimics Cloudflare's clean-URL/extensionless routing so local
testing matches production.

## Cloudflare custom domain gotcha

Both the apex (`lagotto-fitzroynorth.com.au`) and `www` need to be added **separately** as
Custom Domains under Workers & Pages → this project → Domains. If you ever see a Cloudflare
522 "Host: Error" on one hostname but not the other, it's almost always a missing Custom
Domain binding — and if Cloudflare refuses to add it with "Hostname already has externally
managed DNS records," there's a leftover DNS record (often a stale A record from the old
Webflow setup) blocking it. Delete that DNS record first, then add the Custom Domain.
