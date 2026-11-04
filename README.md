# mintree.io

Static website for Mintree LLC, an independent iOS app studio.

Plain HTML, CSS, and vanilla JS. No framework, no build step. Hosted on GitHub Pages.

## Structure

```
index.html        Home
apps.html         App cards (copy the marked template block to add an app)
support.html      Support contact + per-app FAQ (copy the marked template block)
privacy.html      Privacy policy
terms.html        Terms of use
assets/css/       styles.css
assets/js/        main.js (mobile nav, headline word stagger, reveal fallback)
favicon.svg
CNAME             Custom domain for GitHub Pages
```

## Run locally

```
python3 -m http.server 8080
```

Then open http://localhost:8080.
