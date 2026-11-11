# Good Hands Dental Care – Admin Portal (Next.js, App Router, `src/app`)

    npm install
    npm run dev        # http://localhost:3000

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_API_URL` to read lists from the Django REST API.
Without it, the pages use the sample data in `src/lib/sample.js`.

## Routes (`src/app/<route>/page.js`)
dashboard, users, patients, dentists, receptionists, appointments, services, payments, receipts,
treatment-records, reports, notifications, system-settings, audit-logs, admin-profile

## Structure
- `src/app/layout.js` – root layout, font and global styles; `src/app/page.js` redirects to /dashboard
- `src/components/Layout.js` – gradient header, pill navigation, page title, toast
- `src/components/DataPage.js` – shared list page: search, status filters, add panel, edit dialog, loading/empty/error states
- `src/components/views/` – dashboard, reports, notifications, settings and profile screens
- `src/lib/sample.js` – page configuration (columns, form fields) and sample rows
- `src/lib/api.js` – list fetching (create, update and delete are local only until wired to the API)

Enforce role permissions and audit logging on the backend; hiding a button here is not security.
