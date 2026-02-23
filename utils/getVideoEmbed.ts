/**
 * Converts a YouTube or Vimeo URL to an embeddable iframe src.
 * Returns null if the URL isn't a recognised video service
 * (e.g. a direct Supabase Storage link — those should use <video> instead).
 */
export function getVideoEmbedUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    const host = parsed.hostname.replace("www.", "");

    // YouTube: youtube.com/watch?v=ID or youtu.be/ID
    if (host === "youtube.com") {
      const id = parsed.searchParams.get("v");
      if (id) return `https://www.youtube.com/embed/${id}`;
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.slice(1);
      if (id) return `https://www.youtube.com/embed/${id}`;
    }

    // Vimeo: vimeo.com/ID
    if (host === "vimeo.com") {
      const id = parsed.pathname.slice(1);
      if (id) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    // not a valid URL
  }
  return null;
}
