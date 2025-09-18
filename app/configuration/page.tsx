"use client";
import { Form } from "../common/form/Form";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { RightPanel } from "./components/right-panel/RightPanel";
import { use, useEffect, useMemo, useState } from "react";
import { useUserConfiguration } from "@/lib/hooks/useUserconfiguration";

export default function ConfigurationPage() {
  const { configuration, loading, error, saveConfiguration } =
    useUserConfiguration();

  const defaultValues = {
    title: "My Title",
    subtitle: "My Subtitle",
    mainContent: "This is the main content",
    image: "",
    visibility: {
      title: true,
      subtitle: true,
      mainContent: true,
      image: true,
    },
  };

  const initialValues = useMemo(() => {
    if (loading) return null;
    if (error) return null;
    if (configuration) {
      return {
        title: configuration?.title ?? "My Title",
        subtitle: configuration?.config.subtitle ?? "My Subtitle",
        mainContent:
          configuration?.config.mainContent ?? "This is the main content",
        image: configuration?.config.image ?? "",
        visibility: {
          title: true,
          subtitle: true,
          mainContent: true,
          image: true,
        },
      };
    }
    return defaultValues;
  }, [configuration, loading]);

  const handleSubmit = async (values: typeof initialValues) => {
    const result = await saveConfiguration(values);
    if (result) {
      alert("Configuration saved successfully!");
    }
  };

  // Show loading state
  if (loading) {
    return (
      <div className="p-8 flex justify-center">
        Loading your configuration...
      </div>
    );
  }

  // Show error state
  if (error && error !== "No rows found") {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <Form initialValues={initialValues} onSubmit={handleSubmit}>
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
