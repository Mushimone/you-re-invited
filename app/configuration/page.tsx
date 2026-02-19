"use client";
import { Form } from "../common/form/Form";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { RightPanel } from "./components/right-panel/RightPanel";
import React, { use, useEffect, useMemo, useState } from "react";
import { useUserConfiguration } from "@/lib/hooks/useUserconfiguration";
import { PublishDialog } from "./PublishDialog";

export default function ConfigurationPage() {
  const { configuration, loading, error, saveConfiguration } =
    useUserConfiguration();

  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishDialogMode, setPublishDialogMode] = React.useState<
    "edit" | "view"
  >("edit");

  const defaultValues = {
    title: "",
    deceased_name: "",
    date_of_birth: "",
    date_of_death: "",
    epitaph: "",
    profile_image: "",
    bg_image: "",
    gallery_images: [],
    video_url: "",
    music_url: "",
    visibility: {
      deceased_name: true,
      date_of_birth: true,
      date_of_death: true,
      epitaph: true,
      profile_image: true,
      bg_image: true,
      gallery_images: true,
      video_url: true,
      music_url: true,
    },
  };

  const initialValues = useMemo(() => {
    if (loading) return null;
    if (error) return null;
    if (configuration) {
      return {
        title: configuration?.title ?? "My Title",
        deceased_name:
          configuration?.config.deceased_name ?? "My Deceased Name",
        date_of_birth:
          configuration?.config.date_of_birth ?? "My Date of Birth",
        date_of_death:
          configuration?.config.date_of_death ?? "My Date of Death",
        epitaph: configuration?.config.epitaph ?? "My Epitaph",
        profile_image: configuration?.config.profile_image ?? "",
        bg_image: configuration?.config.bg_image ?? "",
        video_url: configuration.config.video_url ?? "",
        music_url: configuration.config.music_url ?? "",
        gallery_images: configuration?.config.gallery_images ?? [],
        visibility: configuration.config.visibility ?? defaultValues.visibility,
      };
    }
    return defaultValues;
  }, [configuration, loading]);

  useEffect(() => {
    if (configuration) {
      setIsSaved(true);
      if (configuration.published) {
        setIsPublished(true);
      }
    }
  }, [configuration]);

  const handleSubmit = async (values: typeof initialValues) => {
    console.log("Submitting form with values:", values);
    const result = await saveConfiguration(values);
    if (result) {
      setIsSaved(true);
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
          <LeftPanel
            onOpenPublish={() => {
              setPublishDialogMode("edit");
              setShowPublishDialog(true);
            }}
            onViewPublished={() => {
              setPublishDialogMode("view");
              setShowPublishDialog(true);
            }}
            isSaved={isSaved}
            isPublished={isPublished}
          />
        </div>
        {/* Right part */}
        <div className="w-2/3">
          <RightPanel />
        </div>
      </div>
      {/* Publish Dialog */}
      <div className="absolute top-1/2 left-1/2 flex items-center justify-center bg-black bg-opacity-50">
        <PublishDialog
          isOpen={showPublishDialog}
          onClose={() => setShowPublishDialog(false)}
          configuration={configuration!}
          existingSlug={configuration?.slug || ""}
          initiallyPublished={isPublished}
          onPublished={() => {
            setIsPublished(true);
          }}
          openMode={publishDialogMode}
        />
      </div>
    </Form>
  );
}
