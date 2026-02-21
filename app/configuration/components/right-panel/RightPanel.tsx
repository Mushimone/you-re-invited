import { format, isValid } from "date-fns";
import { parseISO } from "date-fns/parseISO";
import { useWatch } from "react-hook-form";

interface IRightPanelProps {}

function toDisplayUrl(value: unknown): string | null {
  if (!value) return null;
  if (value instanceof FileList || Array.isArray(value)) {
    const file = (value as FileList)[0];
    return file instanceof File ? URL.createObjectURL(file) : null;
  }
  if (typeof value === "string" && value) return value;
  return null;
}

function formatDate(iso: string | undefined): string | null {
  if (!iso) return null;
  const d = parseISO(iso);
  return isValid(d) ? format(d, "yyyy") : null;
}
export function RightPanel(props: IRightPanelProps) {
  const {} = props;

  const deceased_name = useWatch({ name: "deceased_name" });
  const date_of_birth = useWatch({ name: "date_of_birth" });
  const date_of_death = useWatch({ name: "date_of_death" });
  const epitaph = useWatch({ name: "epitaph" });
  const profile_image = useWatch({ name: "profile_image" });
  const bg_image = useWatch({ name: "bg_image" });
  const gallery_images = useWatch({ name: "gallery_images" });
  const video_url = useWatch({ name: "video_url" });
  const music_url = useWatch({ name: "music_url" });
  const visibility = useWatch({ name: "visibility" }) ?? {};

  const bgUrl = toDisplayUrl(bg_image) ?? "https://placehold.co/300x1080";
  const portraitUrl = toDisplayUrl(profile_image);

  const birthYear = formatDate(date_of_birth);
  const deathYear = formatDate(date_of_death);
  const dateRange =
    birthYear && deathYear
      ? `${birthYear} — ${deathYear}`
      : (birthYear ?? deathYear ?? null);

  const galleryUrls: string[] = gallery_images
    ? (Array.from(gallery_images as FileList)
        .map((f) => (f instanceof File ? URL.createObjectURL(f) : null))
        .filter(Boolean) as string[])
    : [];

  return (
    <div
      className="h-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${bgUrl})`,
      }}
    >
      <div className="p-8 bg-white bg-opacity-80 rounded-xl flex flex-col items-center gap-4 max-w-md w-full shadow-lg">
        {/* Portrait */}
        {visibility.profile_image && portraitUrl && (
          <img
            src={portraitUrl}
            alt="Portrait"
            className="w-32 h-32 rounded-full object-cover border-4 border-white shadow"
          />
        )}

        {/* Name */}
        {visibility.deceased_name && deceased_name && (
          <h1 className="text-3xl font-serif font-bold text-center">
            {deceased_name}
          </h1>
        )}

        {/* Dates */}
        {(visibility.date_of_birth || visibility.date_of_death) &&
          dateRange && (
            <p className="text-gray-500 text-sm tracking-widest">{dateRange}</p>
          )}

        {/* Epitaph */}
        {visibility.epitaph && epitaph && (
          <p className="text-center italic text-gray-700 border-t border-b border-gray-200 py-3 px-2">
            &ldquo;{epitaph}&rdquo;
          </p>
        )}

        {/* Gallery */}
        {visibility.gallery_images && galleryUrls.length > 0 && (
          <div className="flex justify-center gap-2 overflow-x-auto w-full py-1">
            {galleryUrls.map((url, i) => (
              <img
                key={i}
                src={url}
                className="h-20 w-20 object-cover rounded flex-shrink-0"
              />
            ))}
          </div>
        )}

        {/* Video */}
        {visibility.video_url && video_url && typeof video_url === "string" && (
          <div className="w-full aspect-video">
            <iframe
              src={video_url.replace("watch?v=", "embed/")}
              className="w-full h-full rounded"
              allowFullScreen
            />
          </div>
        )}

        {/* Music */}
        {visibility.music_url && music_url && typeof music_url === "string" && (
          <audio controls src={music_url} className="w-full" />
        )}
      </div>
    </div>
  );
}
