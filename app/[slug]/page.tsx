import { notFound } from "next/navigation";
import { createClient } from "@/utils/supabase/server";
import { Configuration } from "@/lib/types/configuration";
import { format, parseISO, isValid } from "date-fns";
import type { Metadata } from "next";
import { GalleryLightbox } from "@/app/common/GalleryLightbox";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supabase = await createClient();
  const { data } = await supabase
    .from("configurations")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (!data) return { title: "Memorial" };

  const config = (data as Configuration).config;
  const name = config.deceased_name ?? "Memorial";
  const birth = config.date_of_birth ? parseISO(config.date_of_birth) : null;
  const death = config.date_of_death ? parseISO(config.date_of_death) : null;
  const years = [
    birth && isValid(birth) ? format(birth, "yyyy") : null,
    death && isValid(death) ? format(death, "yyyy") : null,
  ]
    .filter(Boolean)
    .join(" — ");

  return {
    title: years ? `${name} · ${years}` : name,
    description: config.epitaph ?? undefined,
    openGraph: {
      title: name,
      description: config.epitaph ?? undefined,
      images: config.profile_image ? [config.profile_image] : [],
    },
  };
}

export default async function Presentation({ params }: Props) {
  const { slug } = await params;
  const supabase = await createClient();

  const { data, error } = await supabase
    .from("configurations")
    .select("*")
    .eq("slug", slug)
    .eq("published", true)
    .single();

  if (error || !data) notFound();

  const config = (data as Configuration).config;
  const v = config.visibility ?? {};

  const birth = config.date_of_birth ? parseISO(config.date_of_birth) : null;
  const death = config.date_of_death ? parseISO(config.date_of_death) : null;
  const birthYear = birth && isValid(birth) ? format(birth, "yyyy") : null;
  const deathYear = death && isValid(death) ? format(death, "yyyy") : null;
  const dateRange =
    birthYear && deathYear
      ? `${birthYear} — ${deathYear}`
      : (birthYear ?? deathYear ?? null);

  const bgUrl = config.bg_image ?? "https://placehold.co/300x1080";

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: `url(${bgUrl})` }}
    >
      <div className="p-8 bg-white bg-opacity-90 rounded-xl flex flex-col items-center gap-4 max-w-2xl w-full shadow-lg mx-4">
        {v.profile_image && config.profile_image && (
          <img
            src={config.profile_image}
            alt="Portrait"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />
        )}

        {v.deceased_name && config.deceased_name && (
          <h1 className="text-3xl font-serif font-bold text-center">
            {config.deceased_name}
          </h1>
        )}

        {(v.date_of_birth || v.date_of_death) && dateRange && (
          <p className="text-gray-500 text-sm tracking-widest">{dateRange}</p>
        )}

        {v.epitaph && config.epitaph && (
          <p className="text-center italic text-gray-700 border-t border-b border-gray-200 py-3 px-2">
            &ldquo;{config.epitaph}&rdquo;
          </p>
        )}

        {v.gallery_images && config.gallery_images?.length && (
          <GalleryLightbox urls={config.gallery_images} />
        )}

        {v.video_url && config.video_url && (
          <div className="w-full aspect-video">
            <iframe
              src={config.video_url.replace("watch?v=", "embed/")}
              className="w-full h-full rounded"
              allowFullScreen
            />
          </div>
        )}

        {v.music_url && config.music_url && (
          <audio controls src={config.music_url} className="w-full" />
        )}
      </div>
    </div>
  );
}
