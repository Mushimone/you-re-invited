"use client";
import { Configuration } from "@/lib/types/configuration";
import { Form } from "../common/form/Form";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { RightPanel } from "./components/right-panel/RightPanel";
import { useEffect, useState } from "react";
import { createClient } from "@/utils/supabase/supabaseClient";
import { configurationService } from "@/lib/services/configurationService";

export default function Configurator() {
  const [configuration, setConfiguration] = useState<Configuration | null>(
    null
  );
  useEffect(() => {
    // Fetch user configuration from Supabase or any other source
    const supabase = createClient();
    async function loadConfiguration() {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data, error } =
          await configurationService.getConfigurationByUserId(user.id);

        if (error) {
          console.error("Error fetching configuration:", error);
        } else {
          setConfiguration(data);
          console.log("Fetched configuration:", data);
        }
      }
    }
    loadConfiguration();
  }, []);

  return (
    <Form
      initialValues={{
        title: "My Title",
        subtitle: "My Subtitle",
        mainContent: "This is the main content",
        visibility: {
          title: true,
          subtitle: true,
          mainContent: true,
          image: true,
        },
      }}
    >
      <div className="container-x1 flex mx-auto bg-gray-100">
        {/* Left part */}
        <div className="w-1/3 p-4 bg-purple-100">
          <LeftPanel />
        </div>
        {/* Right part */}
        <div className="w-2/3">
          <RightPanel />
        </div>
      </div>
    </Form>
  );
}
