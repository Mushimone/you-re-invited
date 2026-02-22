import { TextAreaInput } from "@/app/common/input/TextAreaInput";
import { TextInput } from "@/app/common/input/TextInput";
import { Accordion } from "@/components/ui/accordion";
import { InputSection } from "./InputSection";
import { ImageInput } from "@/app/common/input/ImageInput";
import { AppButton } from "@/app/common/button/Button";
import React from "react";
import { DateInput } from "@/app/common/input/DateInput";
import { GalleryInput } from "@/app/common/input/GalleryInput";

interface IProps {
  onOpenPublish: () => void;
  isSaved: boolean;
  isPublished: boolean;
  onViewPublished: () => void;
}

export function LeftPanel(props: IProps) {
  const { onOpenPublish, isSaved, isPublished } = props;
  const OpenPublishDialog = () => {
    onOpenPublish();
  };
  return (
    <div>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={[
          "deceased_name",
          "dates",
          "epitaph",
          "profile_image",
          "bg_image",
          "gallery_images",
          "video_url",
          "music_url",
        ]}
      >
        <InputSection title="Page Title" itemKey="title">
          <TextInput name="title" label="Internal page title (not shown)" />
        </InputSection>

        <InputSection title="Name" itemKey="deceased_name">
          <TextInput name="deceased_name" label="Full name" />
        </InputSection>

        <InputSection title="Dates" itemKey="dates">
          <div className="flex flex-col sm:flex-row gap-4">
            <DateInput name="date_of_birth" label="Date of Birth" />
            <DateInput name="date_of_death" label="Date of Death" />
          </div>
        </InputSection>

        <InputSection title="Epitaph" itemKey="epitaph">
          <TextAreaInput name="epitaph" label="Quote or epitaph" />
        </InputSection>

        <InputSection title="Portrait" itemKey="profile_image">
          <ImageInput name="profile_image" label="Profile portrait" />
        </InputSection>

        <InputSection title="Background" itemKey="bg_image">
          <ImageInput name="bg_image" label="Background image" />
        </InputSection>

        <InputSection title="Gallery" itemKey="gallery_images">
          <GalleryInput name="gallery_images" label="Gallery photos" />
        </InputSection>

        <InputSection title="Video" itemKey="video_url">
          <TextInput name="video_url" label="YouTube / Vimeo URL or upload" />
        </InputSection>

        <InputSection title="Music" itemKey="music_url">
          <TextInput
            name="music_url"
            label="Spotify / SoundCloud URL or upload"
          />
        </InputSection>
      </Accordion>
      <div className="p-4 flex flex-col sm:flex-row justify-end gap-2">
        <AppButton variant="default" type="submit" className="w-full sm:w-auto">
          <span className="font-bold">Save</span>
        </AppButton>
        {isSaved && (
          <AppButton
            variant="outline"
            type="button"
            onClick={OpenPublishDialog}
            className="w-full sm:w-auto"
          >
            <span className="font-bold">
              {isPublished ? "Edit URL" : "Publish"}
            </span>
          </AppButton>
        )}

        {isPublished && (
          <AppButton
            variant="outline"
            type="button"
            onClick={props.onViewPublished}
            className="w-full sm:w-auto"
          >
            <span className="font-bold">View Page</span>
          </AppButton>
        )}
      </div>
    </div>
  );
}
