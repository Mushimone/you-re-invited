"use client";
import { Form } from "../common/form/Form";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { RightPanel } from "./components/right-panel/RightPanel";
import React, { use, useEffect, useMemo, useState } from "react";
import { useUserConfiguration } from "@/lib/hooks/useUserconfiguration";
import { PublishDialog } from "./PublishDialog";
import { Group, Panel, Separator } from "react-resizable-panels";

export default function ConfigurationPage() {
  const { configuration, loading, error, saveConfiguration } =
    useUserConfiguration();

  const [showPublishDialog, setShowPublishDialog] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isPublished, setIsPublished] = useState(false);
  const [publishDialogMode, setPublishDialogMode] = React.useState<
    "edit" | "view"
  >("edit");
  const [mobileTab, setMobileTab] = useState<"edit" | "preview">("edit");

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
      dates: true,
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
        title: configuration?.title ?? "",
        deceased_name: configuration?.config.deceased_name ?? "",
        date_of_birth: configuration?.config.date_of_birth ?? "",
        date_of_death: configuration?.config.date_of_death ?? "",
        epitaph: configuration?.config.epitaph ?? "",
        profile_image: configuration?.config.profile_image ?? "",
        bg_image: configuration?.config.bg_image ?? "",
        video_url: configuration?.config.video_url ?? "",
        music_url: configuration?.config.music_url ?? "",
        gallery_images: configuration?.config.gallery_images ?? [],
        visibility:
          configuration?.config.visibility ?? defaultValues.visibility,
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
      {/* ── Mobile layout (tab switcher) ── */}
      <div
        className="flex flex-col md:hidden"
        style={{ minHeight: "calc(100vh - 57px)" }}
      >
        {/* Tab bar */}
        <div className="flex border-b border-stone-200 bg-stone-100 shrink-0">
          <button
            type="button"
            onClick={() => setMobileTab("edit")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileTab === "edit"
                ? "border-b-2 border-stone-800 text-stone-800"
                : "text-stone-400"
            }`}
          >
            Edit
          </button>
          <button
            type="button"
            onClick={() => setMobileTab("preview")}
            className={`flex-1 py-3 text-sm font-medium transition-colors ${
              mobileTab === "preview"
                ? "border-b-2 border-stone-800 text-stone-800"
                : "text-stone-400"
            }`}
          >
            Preview
          </button>
        </div>
        {/* Panel content */}
        <div className="flex-1 overflow-y-auto">
          {mobileTab === "edit" ? (
            <div className="p-4 bg-stone-100 min-h-full">
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
          ) : (
            <RightPanel />
          )}
        </div>
      </div>

      {/* ── Desktop layout (resizable panels) ── */}
      <div className="hidden md:block">
        <Group
          orientation="horizontal"
          className="mx-auto bg-stone-200"
          style={{ minHeight: "100vh" }}
        >
          <Panel
            defaultSize="28%"
            minSize="20%"
            maxSize="50%"
            className="p-4 bg-stone-100 overflow-y-auto border-r border-stone-300"
          >
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
          </Panel>
          <Separator className="w-1 bg-stone-300 hover:bg-stone-500 cursor-col-resize transition-colors" />
          <Panel minSize={20} className="overflow-y-auto">
            <RightPanel />
          </Panel>
        </Group>
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
