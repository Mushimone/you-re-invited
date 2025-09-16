import { useWatch } from "react-hook-form";

interface IRightPanelProps {}

export function RightPanel(props: IRightPanelProps) {
  const {} = props;

  const title = useWatch({ name: "title" });
  const subtitle = useWatch({ name: "subtitle" });
  const mainContent = useWatch({ name: "mainContent" });
  const bgImage = useWatch({ name: "image" });
  const visibility = useWatch({ name: "visibility" });
  // Get the URL for display
  const getImageUrl = () => {
    if (!visibility.image) return "https://placehold.co/300x1080";

    // If it's a file object (new upload)
    if (bgImage && bgImage[0] instanceof File) {
      return URL.createObjectURL(bgImage[0]);
    }

    // If it's a string URL (loaded from configuration)
    if (typeof bgImage === "string" && bgImage) {
      return bgImage;
    }

    return "https://placehold.co/300x1080";
  };
  return (
    <div
      className="h-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${getImageUrl()})`,
      }}
    >
      <div className="p-8 bg-white text-center bg-opacity-75 min-h-[200px] opacity-90">
        <h1>{visibility.title && title}</h1>
        <h2>{visibility.subtitle && subtitle}</h2>
        <p>{visibility.mainContent && mainContent}</p>
      </div>
    </div>
  );
}
