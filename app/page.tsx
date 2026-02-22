import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Home() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // If logged in, check whether they have a published page
  let publishedSlug: string | null = null;
  if (user) {
    const { data } = await supabase
      .from("configurations")
      .select("slug, published")
      .eq("user_id", user.id)
      .single();
    if (data?.published && data.slug) {
      publishedSlug = data.slug;
    }
  }

  return (
    <div className="flex flex-col">
      {/* ── Hero ── */}
      <section className="flex flex-col items-center justify-center text-center gap-6 px-6 py-24 bg-gradient-to-b from-stone-100 to-background">
        <h1 className="text-5xl sm:text-6xl font-serif font-bold text-stone-800 leading-tight max-w-2xl">
          A place to remember
          <br />
          those who came before.
        </h1>
        <p className="text-stone-500 max-w-xl text-lg leading-relaxed">
          Create a beautiful, personal memorial page for a loved one. Share
          their story, photos, and memory with everyone who cared for them.
        </p>

        {/* CTA buttons — vary by auth state */}
        <div className="flex flex-wrap gap-3 justify-center mt-2">
          {user ? (
            <>
              <Link
                href="/configuration"
                className="px-6 py-3 rounded-lg bg-stone-800 text-stone-100 font-medium hover:bg-stone-700 transition-colors"
              >
                Open my memorial builder →
              </Link>
              {publishedSlug && (
                <Link
                  href={`/${publishedSlug}`}
                  className="px-6 py-3 rounded-lg border border-stone-300 text-stone-700 font-medium hover:bg-stone-100 transition-colors"
                  target="_blank"
                >
                  View my page ↗
                </Link>
              )}
            </>
          ) : (
            <>
              <Link
                href="/signup"
                className="px-6 py-3 rounded-lg bg-stone-800 text-stone-100 font-medium hover:bg-stone-700 transition-colors"
              >
                Get started — it&apos;s free
              </Link>
              <Link
                href="/login"
                className="px-6 py-3 rounded-lg border border-stone-300 text-stone-700 font-medium hover:bg-stone-100 transition-colors"
              >
                Sign in
              </Link>
            </>
          )}
        </div>
      </section>

      {/* ── Features ── */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-8 px-8 py-16 max-w-5xl mx-auto w-full">
        <Feature
          icon="🖼️"
          title="Photos & gallery"
          body="Upload a portrait and a gallery of memories. We compress everything automatically so nothing gets lost."
        />
        <Feature
          icon="✍️"
          title="Their words"
          body="Add an epitaph, birth and death dates, and a personal background image to set the tone of the page."
        />
        <Feature
          icon="🔗"
          title="Share with one link"
          body="Publish under a custom URL and share it with family. A QR code is generated instantly for printing."
        />
      </section>

      {/* ── Second CTA (only shown to logged-out visitors) ── */}
      {!user && (
        <section className="flex flex-col items-center gap-4 py-16 px-6 text-center bg-stone-100 border-t border-stone-200">
          <p className="text-stone-600 text-lg max-w-md">
            It takes just a few minutes to create a page they would be proud of.
          </p>
          <Link
            href="/signup"
            className="px-6 py-3 rounded-lg bg-stone-800 text-stone-100 font-medium hover:bg-stone-700 transition-colors"
          >
            Create a memorial page
          </Link>
        </section>
      )}
    </div>
  );
}

function Feature({
  icon,
  title,
  body,
}: {
  icon: string;
  title: string;
  body: string;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-3xl">{icon}</span>
      <h3 className="font-semibold text-stone-800">{title}</h3>
      <p className="text-stone-500 text-sm leading-relaxed">{body}</p>
    </div>
  );
}
