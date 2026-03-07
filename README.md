# meraj.pro Portfolio

Full-stack portfolio application built with Next.js 16, MongoDB, and DaisyUI.

#### Live Link: [https://meraj.pro](https://meraj.pro)

#### Also (Alias): [https://meraj.pro.bd](https://meraj.pro.bd)

## Features

- Public pages:
  - Home
  - Projects (`/projects`)
  - Skills (`/skills`)
  - Blog (`/blog`, `/blog/[slug]`, `/blog/category/[slug]`)
  - Resume (`/resume`)
  - Contact (`/contact`)
- Admin panel (username/password auth):
  - Skills CRUD
  - Projects CRUD (with skill selection)
  - Blog categories CRUD
  - Blog posts CRUD (WYSIWYG, ImgBB upload, code block + syntax highlighting)
  - Resume links CRUD (Google Drive view/download handling)
  - Email accounts CRUD
- UI/UX:
  - Theme switching (light/dark)
  - Mobile sidebar nav + mobile dock
  - Scroll reveal animations

## Tech Stack

- Next.js 16 (App Router)
- React 19
- MongoDB (`mongodb`)
- Auth via JWT cookie (`jose`, `bcryptjs`)
- Styling: Tailwind CSS + DaisyUI
- Icons: `react-icons`
- Toasts: `react-hot-toast`
- Email: `nodemailer`
- Code highlighting: `highlight.js`

## Environment Variables

Create `.env` from `.env.example`.

```env
# App
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# MongoDB
MONGODB_URI=...
MONGODB_DB_NAME=portfolio

# Auth
AUTH_SECRET=...
ADMIN_USERNAME=admin
ADMIN_PASSWORD_HASH=...

# ImgBB
IMGBB_API_KEY=...

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_SECURE=false
SMTP_USER=...
SMTP_PASS=...
SMTP_FROM="Meraj Portfolio <your-email@gmail.com>"
CONTACT_RECEIVER_EMAIL=merajbd7@gmail.com

# Optional (reserved)
ENCRYPTION_KEY=...
```

Generate admin password hash:

```bash
node -e "const b=require('bcryptjs'); b.hash('your-password',12).then(console.log)"
```

## Local Development

```bash
npm install
npm run dev
```

App runs at `http://localhost:3000`.

## Useful Routes

- Public:
  - `/`
  - `/projects`
  - `/skills`
  - `/blog`
  - `/resume`
  - `/contact`
- Admin:
  - `/admin/login`
  - `/admin`
  - `/admin/skills`
  - `/admin/projects`
  - `/admin/blog`
  - `/admin/resumes`
  - `/admin/emails`

## Notes

- Admin routes are protected by `proxy.js`.
- Blog post slugs and category slugs are auto-generated from titles.
- Resume page supports Google Drive links for both view and direct download.
