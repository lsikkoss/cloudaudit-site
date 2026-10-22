# Delight Choice Services website

Static site for the AWS cost audit business. No build step.

- `public/index.html` – landing page (EN/FR, savings estimator, pricing)
- `public/trust.html` – trust and security page (EN/FR) with links to the exact client permissions
- `public/security/` – the CloudFormation template and IAM policies clients use to create the read-only audit role
- `public/privacy.html` – privacy policy (required for Google and LinkedIn ads)
- `SETUP.md` – go-live guide: CONFIG block, Stripe, Calendly, domain, tracking

Deployed with GitHub Pages from the `public/` folder via `.github/workflows/pages.yml`.
