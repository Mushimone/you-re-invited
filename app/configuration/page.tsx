"use client";
import { Form } from "../common/form/Form";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { RightPanel } from "./components/right-panel/RightPanel";
import { useEffect, useState } from "react";
import { useUserConfiguration } from "@/lib/hooks/useUserconfiguration";

export default function ConfigurationPage() {
  const { configuration, loading, error, saveConfiguration } =
    useUserConfiguration();
  const [formValues, setFormValues] = useState({
    title: "My Title",
    subtitle: "My Subtitle",
    mainContent: "This is the main content",
    visibility: {
      title: true,
      subtitle: true,
      mainContent: true,
      image: true,
    },
  });

  useEffect(() => {
    // Default values to use if no configuration exists
    const defaultValues = {
      title: "My Title",
      subtitle: "My Subtitle",
      mainContent: "This is the main content",
      visibility: {
        title: true,
        subtitle: true,
        mainContent: true,
        image: true,
      },
    };

    if (configuration) {
      setFormValues({
        title: configuration.title || defaultValues.title,
        subtitle: configuration.config.subtitle || defaultValues.subtitle,
        mainContent:
          configuration.config.mainContent || defaultValues.mainContent,
        visibility: {
          title: true,
          subtitle: true,
          mainContent: true,
          image: true,
        },
      });
    }
  }, [configuration]);

  const handleSubmit = async (values: typeof formValues) => {
    const result = await saveConfiguration(values);
    if (result) {
      alert("Configuration saved successfully!");
    }
  };

  return (
    <Form initialValues={formValues} onSubmit={handleSubmit}>
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
