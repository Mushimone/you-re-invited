# You're Invited

Create and share a beautiful memorial page for someone you've lost.

Give them a name, dates, an epitaph, photos, and music. Publish under a custom URL and share it with everyone who knew them. No technical knowledge needed.

---

## What it does

- Fill in a name, birth and death dates, an epitaph, a portrait, and a background photo
- Add a gallery of memories, a video, and a piece of music
- Toggle any section on or off
- Publish at a URL you choose, like `yourinvited.app/their-name`
- Share the link or print the auto-generated QR code

---

## Running locally

```bash
npm install
npm run dev
```

You need a Supabase project. Create a `.env.local` with:

```
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

---

## Built with

Next.js 15, Supabase, Tailwind CSS, shadcn/ui, react-hook-form
