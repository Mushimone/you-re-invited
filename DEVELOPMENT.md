# Development Brief — "You're Invited" (Digital Memorial App)

This document is intended to give a complete picture of the project to any developer or AI agent picking up the work. It covers the purpose of the app, the current architecture, what has been implemented, known issues, and the next steps to complete.

---

## Purpose

A web application where users create and manage a **digital memorial page** for a deceased person. The page works like a digital gravestone — it contains the deceased's name, birth and death dates, an epitaph, a portrait photo, a background image, a photo gallery, a video, and music. The user can publish the page under a custom URL slug and share it via a QR code. The public page is accessible by anyone with the URL, no login required.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **Language:** TypeScript
- **UI:** Tailwind CSS 4, shadcn/ui (Radix UI primitives)
- **Forms:** react-hook-form
- **Backend / Auth / Storage:** Supabase (PostgreSQL + Auth + Storage)
- **Supabase clients:** `@supabase/ssr` for SSR-safe cookie handling
- **Date handling:** date-fns
- **QR Code:** qrcode.react
- **Lightbox (installed, not yet used):** yet-another-react-lightbox

---

## Data Model

One `configurations` table in Supabase. One row per user (one memorial per account).

```ts
interface Configuration {
  id?: string;
  user_id: string;
  layout: number; // always 1, reserved for future layout variants
  title?: string; // internal page title, not shown publicly
  config: {
    // Deceased identity
    deceased_name?: string;
    date_of_birth?: string; // ISO string "yyyy-MM-dd"
    date_of_death?: string; // ISO string "yyyy-MM-dd"
    epitaph?: string;

    // Media — all stored as Supabase Storage public URLs,
    // except video_url and music_url which can also be external URLs
    profile_image?: string | null;
    bg_image?: string | null;
    gallery_images?: string[] | null;
    video_url?: string | null; // Supabase URL or YouTube/Vimeo URL
    music_url?: string | null; // Supabase URL or Spotify/SoundCloud URL

    // Visibility flags — persisted, control what is shown on the public page
    visibility?: {
      deceased_name?: boolean;
      epitaph?: boolean;
      date_of_birth?: boolean;
      date_of_death?: boolean;
      profile_image?: boolean;
      bg_image?: boolean;
      gallery_images?: boolean;
      video_url?: boolean;
      music_url?: boolean;
    };
  };
  created_at: string;
  slug?: string | null; // URL slug for public page e.g. "john-smith-1942"
  published?: boolean; // if true, page is publicly accessible at /[slug]
}
```

The `config` column is `jsonb` in Supabase — no migrations needed when adding new fields to it.

### Supabase Storage Buckets

| Bucket   | Purpose                                           |
| -------- | ------------------------------------------------- |
| `images` | Profile images, background images, gallery photos |
| `videos` | Directly uploaded video files                     |
| `audio`  | Directly uploaded audio files                     |

File path convention inside each bucket: `{userId}/{timestamp}-{filename}`

---

## Project Structure (Key Files)

```
lib/
  types/configuration.ts         — Configuration and ConfigurationResponse interfaces
  services/configurationService.ts — Supabase CRUD + uploadMedia + checkSlugAvailability
  hooks/useUserconfiguration.ts  — React hook: loads and saves configuration, handles all media uploads
  configuration-actions.ts       — Server Actions (currently only checkSlugAvailability)
  auth-action.ts                 — Server Actions: login, signup, signout, signInWithGoogle

utils/supabase/
  supabaseClient.tsx             — Browser client (used in hooks and client components)
  server.ts                      — Server client (used in Server Components and Server Actions)
  middleware.ts                  — Middleware client (session refresh on every request)
  admin.ts                       — Admin client with SERVICE_ROLE key (bypasses RLS)

app/
  layout.tsx                     — Root layout with Header
  page.tsx                       — Home page (currently empty div — needs implementation)
  Header.tsx                     — Navigation header
  globals.css                    — Global styles

  (auth)/
    login/page.tsx               — Login page
    signup/page.tsx              — Signup page
    logout/page.tsx              — Logout page
    auth/confirm/route/route.ts  — Email OTP verification handler

  configuration/
    page.tsx                     — Main builder page (client component)
    PublishDialog.tsx            — Slug entry + QR code dialog
    components/
      left-panel/
        LeftPanel.tsx            — Accordion of all input sections
        InputSection.tsx         — Accordion item wrapper with EyeCheckbox
        EyeCheckbox.tsx          — Visibility toggle (eye icon checkbox)
      right-panel/
        RightPanel.tsx           — Live preview of the memorial

  [slug]/
    page.tsx                     — Public memorial page (server component, dynamic route)

  presentation/
    page.tsx                     — Legacy stub, unused, can be deleted

  common/
    form/Form.tsx                — react-hook-form FormProvider wrapper
    button/Button.tsx            — AppButton wrapper around shadcn Button
    input/
      TextInput.tsx              — Labeled text input, forwards all HTML input props
      TextAreaInput.tsx          — Labeled textarea
      ImageInput.tsx             — File input for images, supports multiple
      DateInput.tsx              — Date picker using shadcn Popover + Calendar + date-fns

  error/page.tsx                 — Error page

components/ui/                   — shadcn-generated components (do not edit manually)
```

---

## Auth Flow

- Email/password login and signup via Supabase Auth
- Google OAuth via `signInWithGoogle()` server action
- Email OTP confirmation at `/auth/confirm`
- Session is refreshed on every request by `middleware.tsx` using `updateSession()`
- **No auth guard exists yet** — `/configuration` is accessible without login

---

## Configuration Page Flow

1. User visits `/configuration`
2. `useUserConfiguration` hook loads their existing configuration from Supabase (or null if first visit)
3. `initialValues` is derived from the loaded configuration and passed to the `Form` component
4. User fills in fields in `LeftPanel` (accordion of input sections)
5. `RightPanel` shows a live preview using `useWatch` on all form fields
6. On Save: `saveConfiguration(formData)` is called — uploads any new media files, then upserts the configuration row
7. After a successful save, `isSaved = true` → Publish button appears
8. If already published, `isSaved = true` and `isPublished = true` on load → "Edit URL" + "View Page" buttons appear
9. Publish dialog handles slug availability check (debounced 500ms), publishes, then shows QR code + copyable URL

---

## Public Page Flow

1. User visits `/{slug}`
2. `app/[slug]/page.tsx` (Server Component) queries Supabase for a configuration with that slug where `published = true`
3. If not found or not published → Next.js `notFound()` → 404
4. If found → renders the memorial with all visibility flags respected
5. `generateMetadata()` sets `<title>`, `<meta description>`, and Open Graph tags for social sharing

---

## Known Issues / Bugs

1. **`initialValues` has placeholder strings** — fields like `deceased_name` fall back to `"My Deceased Name"` instead of `""`. If a user saves without filling those in, the placeholder gets written to the DB.

2. **Gallery preview after save** — `RightPanel` uses `URL.createObjectURL` for gallery previews, which only works for `File` objects. After saving and reloading, existing gallery URLs (strings) are not displayed in the preview.

3. **Unused import** — `use` is imported in `app/configuration/page.tsx` but never used.

4. **Unused dependency** — `@supabase/auth-ui-react` is in `package.json` but nothing in the codebase uses it.

5. **Video URL embed conversion** — only handles YouTube (`watch?v=` → `embed/`). Vimeo URLs are not converted and will not embed correctly.

6. **`configurationService.checkSlugAvailability`** — this method exists on the service (browser client) but slug checking is also implemented as a Server Action in `lib/configuration-actions.ts` using the admin client. The `PublishDialog` correctly uses the Server Action. The duplicate on the service can be removed.

---

## Completed Steps

- [x] Expanded `Configuration` type with all memorial fields
- [x] Refactored `uploadMedia` into `configurationService` (single canonical upload path)
- [x] `saveConfiguration` hook handles all media types: profile image, background image, gallery (multi-upload), video (file or URL), music (file or URL)
- [x] `page.tsx` defaultValues and initialValues updated to new fields
- [x] `LeftPanel` updated with all new accordion sections
- [x] `ImageInput` updated: `name` prop, `accept="image/*"`, `multiple` support
- [x] `TextInput` updated: forwards all HTML input props
- [x] `DateInput` created: shadcn Popover + Calendar, stores ISO string, `isValid` guard
- [x] `RightPanel` updated: live preview of all fields including gallery strip, video iframe, audio player
- [x] `app/[slug]/page.tsx` created: public Server Component, `generateMetadata`, `notFound()` on missing/unpublished
- [x] `PublishDialog` updated: two-mode dialog (edit slug / view QR), QR code display, PNG download, copyable URL
- [x] `LeftPanel` updated: Save / Publish / Edit URL / View Page buttons with correct conditions
- [x] `page.tsx` updated: `publishDialogMode` state, correct props to dialog and panel
- [x] `yet-another-react-lightbox` installed

---

## Next Steps (In Priority Order)

### 1. Fix known issues (small, do first)

- Fix `initialValues` placeholder strings → replace all `?? "My ..."` fallbacks with `?? ""`
- Remove unused `use` import from `app/configuration/page.tsx`

### 2. Auth guard on `/configuration`

- In `middleware.tsx`, check if the request path starts with `/configuration`
- If the user is not authenticated, redirect to `/login`
- Use `utils/supabase/middleware.ts` server client — `supabase.auth.getUser()` already runs there

### 3. Gallery improvements

- **Delete from gallery:**
  - Add `deleteMedia(url: string, bucket: string)` to `configurationService` — extracts file path from the public URL and calls `supabase.storage.from(bucket).remove([path])`
  - Update `saveConfiguration` in the hook to diff `configuration.config.gallery_images` (old) vs `formData.gallery_images` (new) — any URL present in old but not in new should be deleted from Storage before saving
  - Update `GalleryInput` (new component) to show thumbnails with a delete (×) button for each; manage the current list in local state; pass final list back to react-hook-form
- **Lightbox (click to enlarge):**
  - Create `app/common/GalleryLightbox.tsx` client component wrapping `yet-another-react-lightbox`
  - Use it in `RightPanel` (replace the current thumbnail strip)
  - Use it in `app/[slug]/page.tsx` — since that is a Server Component, pass gallery URLs as props to `GalleryLightbox`

### 4. Gallery preview after save

- In `RightPanel`, the gallery rendering checks `f instanceof File` only. After a reload, `gallery_images` is an array of URL strings (not Files). Fix `galleryUrls` derivation to handle both cases:
  ```ts
  const galleryUrls: string[] = gallery_images
    ? (Array.from(gallery_images)
        .map((f) =>
          f instanceof File
            ? URL.createObjectURL(f)
            : typeof f === "string"
              ? f
              : null,
        )
        .filter(Boolean) as string[])
    : [];
  ```

### 5. Home page (`/`)

- Currently an empty `<div>`
- Should show: if logged in → link to `/configuration` + link to the published page (if published); if not logged in → marketing/landing content with login/signup links

### 6. Cleanup

- Remove `@supabase/auth-ui-react` from `package.json` (`npm uninstall @supabase/auth-ui-react`)
- Remove `configurationService.checkSlugAvailability` — the Server Action in `lib/configuration-actions.ts` is the correct implementation
- Delete `app/presentation/page.tsx` (replaced by `app/[slug]/page.tsx`)

### 7. Video URL improvements

- Detect Vimeo URLs (`vimeo.com/{id}`) and convert to embed format (`player.vimeo.com/video/{id}`)
- Detect Supabase Storage URLs and render as `<video>` instead of `<iframe>`
- Consider a shared `getVideoEmbed(url): { type: "iframe" | "video", src: string }` utility

### 8. Future / Nice-to-have

- Multiple memorials per user (requires a separate `memorials` table and a dashboard to manage them)
- Layout variants (`layout` field is reserved but always `1`)
- Unpublish / take down a page
- Password-protected memorial pages
- Comments or tributes left by visitors
