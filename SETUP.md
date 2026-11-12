# Website: go-live guide

The site is a few static files in `public/`. No build step, no framework.

## 1. Edit the CONFIG block

Every page reads one file: `public/assets/config.js`. Fill in:

```js
window.CONFIG = {
  brand: "Delight Choice Services",
  email: "contact@delightchoiceservices.com",
  bookingUrl: "https://calendly.com/yourname/15min",
  formEndpoint: "https://formspree.io/f/xxxxxxx",   // inquiry form (optional)
  stripe: {
    starter: "https://buy.stripe.com/xxxx",   // Launch Page deposit ($375)
    expert:  "https://buy.stripe.com/yyyy"    // Expert Site deposit ($900)
  }
};
```

Empty values fall back gracefully, so the site works at every stage:
- No `bookingUrl`: every "Book a call" button scrolls to the inquiry form.
- No Stripe link: package buttons use the booking link, then the inquiry form.
- No `formEndpoint`: the inquiry form opens the visitor's email app with their message pre-filled. To receive inquiries directly instead, create a free form at formspree.io, paste its endpoint here, and inquiries arrive in your inbox.

If you ever rename the business, also change the wordmark text in the header, the footer and the `<title>` of each page so the name shows before JavaScript loads.

## 2. Payments (Stripe Payment Links)

You do this part yourself because it needs your identity and bank details.

1. Create a Stripe account in your LLC's name and verify it.
2. Products → Add product: "Launch Page deposit" $375 one-time and "Expert Site deposit" $900 one-time (50% of $750 and $1,800). Send the 50% balance as a Stripe Invoice when the client approves the site.
3. For each: Create payment link. Under "After payment", redirect to your booking link so buyers schedule kickoff right away.
4. Turn on "Collect customer's company name" and "Require phone or email".
5. Paste both links into CONFIG.

For Custom Builds, second-language add-ons and monthly care ($79/mo), send a Stripe Invoice or a subscription after the call.

## 3. Booking (Calendly or Cal.com)

- Event 1: "Free 15-min website call". Add intake questions: business, who you help, existing site (if any), launch date.
- Event 2: "Website kickoff (paid clients)", 20 min, linked from the Stripe redirect.
- Put Event 1's link in `bookingUrl`.

## 4. Domain and business email

- Buy the domain at Cloudflare Registrar, Namecheap or Route 53.
- Email: Google Workspace or Zoho Mail on that domain.
- For cold email, buy a **second** similar domain (e.g. `get-yourbrand.com`) so outreach never hurts your main domain's deliverability. Set SPF, DKIM and DMARC on both.

## 5. Hosting (pick one, all free)

**Netlify (easiest):** drag the `public` folder onto app.netlify.com/drop, then add your domain under Domain settings.

**GitLab Pages (fits your existing GitLab):** put `index.html` in a `public/` folder and add `.gitlab-ci.yml`:

```yaml
pages:
  stage: deploy
  script: ["echo deploying"]
  artifacts:
    paths: [public]
  rules:
    - if: $CI_COMMIT_BRANCH == $CI_DEFAULT_BRANCH
```

**Portfolio:** build 2-3 demo sites (for example a coach, a consultant and a small shop) and link them from the pricing section. Label them clearly as demos until real clients exist.

## 6. Tracking (needed before you spend on ads)

- **Analytics:** Plausible or Google Analytics 4. Paste the snippet just before `</head>`.
- **LinkedIn Insight Tag** and **Google Ads tag** in the same spot, for retargeting and conversion tracking.
- Conversion events to set up: click on any "Book" button, completed Calendly booking (Calendly can redirect to a `/thanks` page; create `thanks.html` and fire the conversion there), and completed Stripe payment (Stripe redirect).

## 7. Before launch checklist

- [ ] CONFIG filled in, name replaced in HTML
- [ ] Test both Stripe deposit links in test mode, then switch to live
- [ ] Book a test call through the site
- [ ] Check on your phone in light and dark mode
- [ ] Analytics and ad tags firing
- [ ] Add a simple Privacy Policy page (required for LinkedIn and Google ads); a free generator is fine to start

## Languages (EN / FR)

English text lives in the HTML. French lives in the `window.I18N_FR` block near the bottom of each page, keyed by each element's `data-i18n` name. To change a sentence, edit it in the HTML (English) and in that block. Header and footer French is shared in `public/assets/site.js`. The visitor's choice is remembered in their browser and shared across pages; first-time visitors with a French browser see French.
