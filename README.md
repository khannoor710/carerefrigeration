# Care Refrigeration website

React/Vite homepage, static service pages, and an Express API for booking requests and gallery management.

## Local development

1. Install dependencies: `npm ci`
2. Copy `.env.local.example` to `.env.local` and supply the email and admin settings you intend to use for testing.
3. Start both processes: `npm run dev:all`
4. Open `http://localhost:5173`.

The Vite dev server proxies `/api` and `/gallery` to the Express server on port 3001. Run `npm run build` to compile the production site. Run `npm run type-check` for TypeScript validation.

## Production configuration

Set these variables in the deployment environment:

- `NODE_ENV=production`
- `ADMIN_USERNAME` and a unique, strong `ADMIN_PASSWORD` for gallery management. The admin page is disabled until both are configured. Do not reuse the old password that appeared in the public repository.
- `RESEND_API_KEY`, `EMAIL_FROM` (a sender allowed by your email provider), and `BUSINESS_EMAIL` (the inbox that receives booking requests).
- `DATABASE_URL` to save booking requests in PostgreSQL. The app creates its `bookings` table on first use. Without a database, a request is accepted only when the business email succeeds; no durable booking record is kept.
- `DATA_DIR` pointing to a persistent mounted directory for gallery uploads and metadata. Without a persistent volume, uploaded photos can disappear after a redeploy.

The booking form requires a name, a phone or email, a service area, an appliance type, and an issue description. It shows success only after the business notification is delivered. Gallery changes require a server-side admin session. Existing client-side admin sessions are no longer valid.

## Search visibility

The build includes a homepage plus `/ac-repair-andheri-west/` and `/washing-machine-repair-andheri-west/`, each with its own title, description, canonical URL, service content and structured data. `public/robots.txt` and `public/sitemap.xml` are served as files. Unknown URLs return 404 and `/admin` is marked noindex.

After deployment, verify the site in Google Search Console, submit the sitemap and inspect the three public URLs. Complete and verify the Google Business Profile separately. The pages use only the confirmed Andheri West area and existing business contact details; add exact hours, prices, warranty terms, address and a review link only after verifying them with the business owner.

## Checks

- `npm run build`
- `npm test`
- Verify the live booking notification reaches `BUSINESS_EMAIL` before sending customers to the form.
- Verify the sitemap, robots file, both service pages and the admin route after deployment.
