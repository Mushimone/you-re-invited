import imageCompression from "browser-image-compression";

export type CompressPreset = "portrait" | "background" | "gallery";

const PRESETS: Record<
  CompressPreset,
  { maxSizeMB: number; maxWidthOrHeight: number }
> = {
  portrait:   { maxSizeMB: 0.15, maxWidthOrHeight: 800 },
  background: { maxSizeMB: 0.3,  maxWidthOrHeight: 1920 },
  gallery:    { maxSizeMB: 0.2,  maxWidthOrHeight: 1200 },
};

export async function compressImage(
  file: File,
  preset: CompressPreset,
): Promise<File> {
  const compressed = await imageCompression(file, {
    ...PRESETS[preset],
    useWebWorker: true,
    fileType: "image/webp",
  });
  // Give it a .webp extension so the stored filename is honest
  const newName = file.name.replace(/\.[^.]+$/, ".webp");
  return new File([compressed], newName, { type: "image/webp" });
}
