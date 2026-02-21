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
- **Lightbox:** yet-another-react-lightbox
- **Resizable panels:** react-resizable-panels

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
    // NOTE: dates is a single combined flag for both date_of_birth and date_of_death
    visibility?: {
      deceased_name?: boolean;
      epitaph?: boolean;
      dates?: boolean; // controls both birth and death date display
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
  types/configuration.ts          — Configuration and ConfigurationResponse interfaces
  services/configurationService.ts — Supabase CRUD + uploadMedia + deleteMedia
  hooks/useUserconfiguration.ts   — React hook: loads and saves configuration, handles all media uploads
  configuration-actions.ts        — Server Actions (checkSlugAvailability using admin client)
  auth-action.ts                  — Server Actions: login, signup, signout, signInWithGoogle

utils/supabase/
  supabaseClient.tsx              — Browser client (used in hooks and client components)
  server.ts                       — Server client (used in Server Components and Server Actions)
  middleware.ts                   — Middleware client (session refresh + returns user object)
  admin.ts                        — Admin client with SERVICE_ROLE key (bypasses RLS)

app/
  layout.tsx                      — Root layout with Header
  page.tsx                        — Home page (currently empty div — needs implementation)
  Header.tsx                      — Navigation header (static: logo + LoginLogoutButton + HeaderNavItems)
  globals.css                     — Global styles

  (auth)/
    login/page.tsx                — Login page
    signup/page.tsx               — Signup page
    logout/page.tsx               — Logout page
    auth/confirm/route/route.ts   — Email OTP verification handler

  configuration/
    page.tsx                      — Main builder page (client component, resizable panels layout)
    PublishDialog.tsx             — Two-mode dialog: slug entry OR QR code view
    components/
      left-panel/
        LeftPanel.tsx             — Accordion of all input sections + Save/Publish/View buttons
        InputSection.tsx          — Accordion item wrapper with EyeCheckbox visibility toggle
        EyeCheckbox.tsx           — Eye icon checkbox bound to visibility.{key}
      right-panel/
        RightPanel.tsx            — Live preview using useWatch on all form fields

  [slug]/
    page.tsx                      — Public memorial page (Server Component, dynamic route)
                                    Requires published=true, returns 404 otherwise
                                    Supabase RLS policy: anon can SELECT where published=true

  common/
    form/Form.tsx                 — react-hook-form FormProvider wrapper
    button/Button.tsx             — AppButton wrapper around shadcn Button
    GalleryLightbox.tsx           — Client component: thumbnail grid + yet-another-react-lightbox
    HeaderNavItems.tsx            — Client component: auth-reactive nav links (My Memorial, View Page)
    LoginLogoutButton.tsx         — Client component: auth-reactive login/logout button
    input/
      TextInput.tsx               — Labeled text input, forwards all HTML input props
      TextAreaInput.tsx           — Labeled textarea
      ImageInput.tsx              — File input for images, supports multiple, accept="image/*"
      DateInput.tsx               — Date picker: shadcn Popover + Calendar, stores ISO string
      GalleryInput.tsx            — Gallery manager: thumbnails with delete buttons, Add photos button

  error/page.tsx                  — Error page

components/ui/                    — shadcn-generated components (do not edit manually)
```

---

## Auth Flow

- Email/password login and signup via Supabase Auth
- Google OAuth via `signInWithGoogle()` server action
- Email OTP confirmation at `/auth/confirm`
- Session is refreshed on every request by `middleware.tsx` via `updateSession()` — which also returns the current user object
- **Auth guard:** `middleware.tsx` redirects unauthenticated users to `/login` if they visit any path starting with `/configuration`
- `HeaderNavItems.tsx` subscribes to `onAuthStateChange` client-side and reactively shows/hides the "My Memorial" and "View Page ↗" nav links

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

1. **Video URL embed conversion** — only handles YouTube (`watch?v=` → `embed/`). Vimeo URLs are not converted and will not embed correctly. Supabase Storage video URLs should render as `<video>` not `<iframe>`.

2. **`configurationService.checkSlugAvailability`** — duplicate of the Server Action in `lib/configuration-actions.ts`. The service method uses the browser client (anon key) while the Server Action uses the admin client (bypasses RLS). `PublishDialog` correctly uses the Server Action. The service method should be removed.

3. **Home page** — `app/page.tsx` is an empty `<div>`. Needs a landing page.

4. **`app/presentation/page.tsx`** — legacy stub, replaced by `app/[slug]/page.tsx`. Can be deleted.

---

## Completed Steps

- [x] Expanded `Configuration` type with all memorial fields
- [x] Refactored `uploadMedia` into `configurationService` (single canonical upload path)
- [x] Added `deleteMedia` to `configurationService` — extracts path from Supabase Storage URL and removes file
- [x] `saveConfiguration` hook handles all media types and diffs gallery to delete removed images from Storage
- [x] `page.tsx` defaultValues and initialValues updated to new fields (empty string fallbacks, no placeholders)
- [x] `LeftPanel` updated with all new accordion sections
- [x] `ImageInput` updated: `name` prop, `accept="image/*"`, `multiple` support
- [x] `GalleryInput` created: thumbnail grid with delete buttons, Add photos button, useController integration
- [x] `TextInput` updated: forwards all HTML input props
- [x] `DateInput` created: shadcn Popover + Calendar, stores ISO string, `isValid` guard
- [x] `RightPanel` updated: live preview of all fields, handles both File and string for gallery
- [x] `GalleryLightbox` created: clickable thumbnails + yet-another-react-lightbox
- [x] `app/[slug]/page.tsx` created: public Server Component, `generateMetadata`, `notFound()` on missing/unpublished
- [x] Supabase RLS policy added: anon users can SELECT configurations where `published = true`
- [x] `PublishDialog` updated: two-mode dialog (edit slug / view QR), QR display, PNG download, copyable URL, "Open Page" link
- [x] `LeftPanel` updated: Save / Publish / Edit URL / View Page buttons with correct conditions
- [x] `page.tsx` updated: `publishDialogMode` state, resizable panel layout via `react-resizable-panels`
- [x] Auth guard added in `middleware.tsx`: unauthenticated users redirected to `/login` for `/configuration`
- [x] `utils/supabase/middleware.ts` updated: returns `{ response, user }` — single `getUser()` call shared
- [x] `HeaderNavItems.tsx` created: client-side auth-reactive nav links
- [x] Header updated: uses `HeaderNavItems` for dynamic links
- [x] Visibility fixed for `bg_image` (was not checked in RightPanel) and `dates` (key mismatch corrected)
- [x] `@supabase/auth-ui-react` uninstalled (was unused)

---

## Next Steps (In Priority Order)

### 1. Cleanup (fast)

- Remove `checkSlugAvailability` from `configurationService.ts` — Server Action is the correct implementation
- Delete `app/presentation/page.tsx`

### 2. Home page (`/`)

- If logged in: show link to `/configuration` + link to `/{slug}` if published
- If not logged in: marketing/landing content with login and signup links
- Use `HeaderNavItems` pattern (client component with `onAuthStateChange`) or make it a Server Component that reads the session

### 3. Video URL improvements

- Create a shared utility `getVideoEmbed(url): { type: "iframe" | "video", src: string }`
- Handle YouTube: `watch?v=ID` → `embed/ID`
- Handle Vimeo: `vimeo.com/ID` → `player.vimeo.com/video/ID`
- Handle Supabase Storage URLs: render as `<video controls>` instead of `<iframe>`
- Use this utility in both `RightPanel` and `app/[slug]/page.tsx`

### 4. Future / Nice-to-have

- Comments or tributes left by visitors on the public page
- Multiple memorials per user (requires a separate `memorials` table and a dashboard)
- Layout variants (`layout` field is reserved but always `1`)
- Unpublish / take down a page
- Password-protected memorial pages
