import { useCallback, useEffect, useState } from "react";
import { Configuration } from "../types/configuration";
import { createClient } from "@/utils/supabase/supabaseClient";
import { configurationService } from "../services/configurationService";

function useUserConfiguration() {
  const [configuration, setConfiguration] = useState<Configuration | null>(
    null
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
        let imageUrl = configuration?.config.image || null;
        if (formData.image && formData.image[0] instanceof File) {
          // Upload new image
          const { data, error } = await supabase.storage
            .from("images")
            .upload(
              `${user.id}/configurations/${Date.now()}-${
                formData.image[0].name
              }`,
              formData.image[0]
            );

          if (error) {
            throw new Error(error.message);
          }

          const {
            data: { publicUrl },
          } = supabase.storage.from("images").getPublicUrl(data.path);

          imageUrl = publicUrl;
        }

        if (configuration) {
          // Update existing configuration
          const { data, error } =
            await configurationService.updateConfiguration({
              id: configuration.id,
              title: formData.title,
              config: {
                subtitle: formData.subtitle,
                mainContent: formData.mainContent,
                image: imageUrl,
              },
              slug: configuration.slug,
            });

          setLoading(false);

          if (error) {
            setError(error);
            return null;
          } else {
            console.log(
              "Configuration saved successfully, no errors, now trying to set configuration with data."
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
            config: {
              subtitle: formData.subtitle,
              mainContent: formData.mainContent,
              image: imageUrl,
            },
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
    [configuration]
  );

  // Load configuration on mount
  useEffect(() => {
    loadConfiguration();
  }, [loadConfiguration]);

  return { configuration, loading, error, setConfiguration, saveConfiguration };
}
export { useUserConfiguration };
