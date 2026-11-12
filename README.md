# Delight Choice Services website

Static site for the web design and development studio. No build step.

- `public/index.html` – home: services, concept work, process, pricing, guarantee, FAQ, inquiry form (EN/FR)
- `public/trust.html` – how access, ownership and payments work (EN/FR)
- `public/privacy.html` – privacy policy (required for Google and LinkedIn ads)
- `public/404.html` – not-found page
- `public/assets/config.js` – brand, email, booking, form and Stripe links (edit this)
- `public/assets/site.css`, `public/assets/site.js` – shared styles and behaviour
- `SETUP.md` – go-live guide: CONFIG, Stripe, Calendly, domain, tracking

English text lives in the HTML; French lives in each page's `window.I18N_FR` block (shared header and footer French is in `site.js`).

Deployed with GitHub Pages from the `public/` folder via `.github/workflows/pages.yml`.
