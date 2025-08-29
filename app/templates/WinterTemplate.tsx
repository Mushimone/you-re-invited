"use client";
import { IWebsiteTemplate } from "./IWebsiteTemplate";

export function WinterTemplate(props: IWebsiteTemplate) {
  const {
    name1 = "Paolo",
    name2 = "Francesca",
    eventDate = "11 Ottobre 2024",
    subtitle = "Benvenuti al nostro matrimonio!",
    mainParagraph = "Siamo entusiasti di condividere questo momento speciale con voi. Unisciti a noi per celebrare il nostro amore in una giornata indimenticabile.",
    backgroundImageUrl = "/winter-image.jpg",
    extraContent1ImageUrl = "https://wallpapercat.com/w/full/7/d/4/18930-1920x1200-desktop-hd-winter-wallpaper-image.jpg",
    location = "Chiesa di Santa Maria, Roma",
  } = props;

  return (
    <div className="flex flex-col items-center bg-gray-300 space-y-4 min-h-screen">
      {/* HERO */}
      <div
        className="relative font-sans h-[30vh] w-full border-2"
        style={{
          backgroundImage: `url(${
            backgroundImageUrl
              ? typeof backgroundImageUrl === "string"
                ? backgroundImageUrl
                : URL.createObjectURL(backgroundImageUrl)
              : "https://placehold.co/300x1080"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 flex  items-end md:items-center justify-center pl-8 h-full">
          <div className="bg-black/85 px-6 py-2 rounded-lg">
            <h1 className="text-white text-2xl md:text-4xl font-bold">
              {name1} & {name2}
            </h1>
            <p className="text-gray-300">{eventDate}</p>
          </div>
        </div>
      </div>

      {/* MAIN CONTENT */}
      <main className="w-fit mx-auto">
        {/* INTRODUZIONE */}
        <h1 className="text-2xl md:text-4xl font-bold">{subtitle}</h1>
        <div className="max-w-md flex justify-center text-center items-center p-4 mx-auto">
          <p className="text-gray-700">{mainParagraph}</p>
        </div>
        {/* CONTENUTO EXTRA 1 */}
        <div className="">
          <img
            src={extraContent1ImageUrl}
            // src="/winter-couple.png"
            alt="couple"
            width={400}
            height={400}
            className="mx-auto"
          />
        </div>

        {/* Location */}
        <div>
          <p>{location}</p>
          <p>{eventDate}</p>
          <p>{}</p>
        </div>
      </main>
    </div>
  );
}
