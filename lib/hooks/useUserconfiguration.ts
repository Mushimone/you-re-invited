import { useCallback, useEffect, useState } from "react";
import { Configuration } from "../types/configuration";
import { createClient } from "@/utils/supabase/supabaseClient";
import { configurationService } from "../services/configurationService";
import { compressImage } from "@/utils/compressImage";

function useUserConfiguration() {
  const [configuration, setConfiguration] = useState<Configuration | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Define loadConfiguration outside useEffect
  const loadConfiguration = useCallback(async () => {
    setLoading(true);
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { data, error } =
        await configurationService.getConfigurationByUserId(user.id);
      setConfiguration(data);
    } else {
      setError("Not authenticated");
    }
    setLoading(false);
  }, []);

  const saveConfiguration = useCallback(
    async (formData: any) => {
      setLoading(true);

      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setError("Not authenticated");
        setLoading(false);
        return null;
      }

      try {
        console.log("Saving configuration with data:", formData);
        // Media upload handling

        let profile_image = configuration?.config.profile_image ?? null;
        if (formData.profile_image?.[0] instanceof File) {
          const compressed = await compressImage(
            formData.profile_image[0],
            "portrait",
          );
          profile_image = await configurationService.uploadMedia(
            compressed,
            "images",
            user.id,
          );
        }

        let bg_image = configuration?.config.bg_image ?? null;
        if (formData.bg_image?.[0] instanceof File) {
          const compressed = await compressImage(
            formData.bg_image[0],
            "background",
          );
          bg_image = await configurationService.uploadMedia(
            compressed,
            "images",
            user.id,
          );
        }
        const incoming: (File | string)[] = Array.from(
          formData.gallery_images ?? [],
        );

        const gallery_images: string[] = (
          await Promise.all(
            incoming.map(async (item) => {
              if (item instanceof File) {
                const compressed = await compressImage(item, "gallery");
                return configurationService.uploadMedia(
                  compressed,
                  "images",
                  user.id,
                );
              }
              return item;
            }),
          )
        ).filter(Boolean) as string[];

        // Delete any URLs that were in the saved config but removed by the user
        const previousUrls = configuration?.config.gallery_images ?? [];
        const removedUrls = previousUrls.filter(
          (url) => !gallery_images.includes(url),
        );
        await Promise.all(
          removedUrls.map((url) =>
            configurationService.deleteMedia(url, "images"),
          ),
        );

        let video_url = configuration?.config.video_url ?? null;
        if (formData.video_url?.[0] instanceof File) {
          video_url = await configurationService.uploadMedia(
            formData.video_url[0],
            "videos",
            user.id,
          );
        } else if (
          typeof formData.video_url === "string" &&
          formData.video_url
        ) {
          video_url = formData.video_url;
        }

        let music_url = configuration?.config.music_url ?? null;
        if (formData.music_url?.[0] instanceof File) {
          music_url = await configurationService.uploadMedia(
            formData.music_url[0],
            "music",
            user.id,
          );
        } else if (
          typeof formData.music_url === "string" &&
          formData.music_url
        ) {
          music_url = formData.music_url;
        }

        // config object to save
        const config = {
          deceased_name: formData.deceased_name ?? null,
          date_of_birth: formData.date_of_birth ?? null,
          date_of_death: formData.date_of_death ?? null,
          epitaph: formData.epitaph ?? null,
          profile_image,
          bg_image,
          gallery_images,
          video_url,
          music_url,
          visibility: formData.visibility ?? {},
        };
        if (configuration) {
          // Update existing configuration
          const { data, error } =
            await configurationService.updateConfiguration({
              id: configuration.id,
              title: formData.title,
              config,
              slug: configuration.slug,
            });

          setLoading(false);

          if (error) {
            setError(error);
            return null;
          } else {
            console.log(
              "Configuration saved successfully, no errors, now trying to set configuration with data.",
            );

            setConfiguration(data);
            return data;
          }
        } else {
          // Create new configuration
          const newConfig: Configuration = {
            user_id: user.id,
            created_at: new Date().toISOString(),
            layout: 1,
            title: formData.title,
            config,
          };

          const { data, error } =
            await configurationService.createConfiguration(newConfig, user.id);

          setLoading(false);

          if (error) {
            setError(error);
            return null;
          } else {
            setConfiguration(data);
            return data;
          }
        }
      } catch (err) {
        setLoading(false);
        setError("An unexpected error occurred");
        return null;
      }
    },
    [configuration],
  );

  // Load configuration on mount
  useEffect(() => {
    loadConfiguration();
  }, [loadConfiguration]);

  return { configuration, loading, error, setConfiguration, saveConfiguration };
}
export { useUserConfiguration };
