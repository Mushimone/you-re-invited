import { TextAreaInput } from "@/app/common/input/TextAreaInput";
import { TextInput } from "@/app/common/input/TextInput";
import { Accordion } from "@/components/ui/accordion";
import { InputSection } from "./InputSection";
import { ImageInput } from "@/app/common/input/ImageInput";
import { AppButton } from "@/app/common/button/Button";
import React from "react";

interface IProps {
  onOpenPublish: () => void;
  isSaved: boolean;
}

export function LeftPanel(props: IProps) {
  const { onOpenPublish, isSaved } = props;
  const OpenPublishDialog = () => {
    onOpenPublish();
  };
  return (
    <div>
      <Accordion
        type="multiple"
        className="w-full"
        defaultValue={["title", "subtitle", "mainContent", "image"]}
      >
        <InputSection title="Title" itemKey="title">
          <TextInput name="title" label="Add your Title" />
        </InputSection>
        <InputSection title="Subtitle" itemKey="subtitle">
          <TextInput label="Add your Subtitle" name="subtitle" />
        </InputSection>
        <InputSection title="Main Content" itemKey="mainContent">
          <TextAreaInput label="Add your Main Content" name="mainContent" />
        </InputSection>
        <InputSection title="Image" itemKey="image">
          <ImageInput bgImage="image" label="Add your Top Image" />
        </InputSection>
      </Accordion>
      <div className="p-4 flex justify-end">
        <AppButton variant="default" type="submit">
          <span className="font-bold">Save</span>
        </AppButton>
        {isSaved && (
          <AppButton
            variant="outline"
            type="button"
            onClick={OpenPublishDialog}
          >
            <span className="font-bold">Publish</span>
          </AppButton>
        )}
      </div>
    </div>
  );
}
