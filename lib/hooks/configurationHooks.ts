import { useEffect, useState } from "react";
import { Configuration } from "../types/configuration";
import { createClient } from "@/utils/supabase/supabaseClient";
import { configurationService } from "../services/configurationService";

function useUserConfiguration() {
  const [configuration, setConfiguration] = useState<Configuration | null>(
    null
  );
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadConfiguration() {
      setLoading(true);
      const supabase = createClient();
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } =
          await configurationService.getConfigurationByUserId(user.id);
        if (error && error !== "No rows found") {
          setError(error);
        } else {
          setConfiguration(data);
        }
      } else {
        setError("Not authenticated");
      }
      setLoading(false);
    }

    loadConfiguration();
  }, []);

  return { configuration, loading, error, setConfiguration };
}
