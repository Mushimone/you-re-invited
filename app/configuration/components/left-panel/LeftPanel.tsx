import { ImageInput } from "@/app/common/input/ImageInput";
import { TextAreaInput } from "@/app/common/input/TextAreaInput";
import { TextInput } from "@/app/common/input/TextInput";
import { Accordion } from "@/components/ui/accordion";
import { InputSection } from "./InputSection";

interface IProps {}

export function LeftPanel(props: IProps) {
  const {} = props;

  return (
    <Accordion
      type="multiple"
      className="w-full"
      defaultValue={["title", "subtitle", "mainContent", "image"]}
    >
      {/* HERO */}
      <InputSection title="Name n.1" itemKey="name1">
        <TextInput name="name1" label="Add your Name n.1" />
      </InputSection>
      <InputSection title="Name n.2" itemKey="name2">
        <TextInput name="name2" label="Add your Name n.2" />
      </InputSection>
      <InputSection title="Background Image" itemKey="backgroundImage">
        <ImageInput name="backgroundImage" label="Add your Top Image" />
      </InputSection>
      <InputSection title="Event Date" itemKey="eventDate">
        <TextInput name="eventDate" label="Event Date" />
      </InputSection>
      <InputSection title="Subtitle" itemKey="subtitle">
        <TextInput name="subtitle" label="Subtitle" />
      </InputSection>
      <InputSection title="Main Content" itemKey="mainContent">
        <TextAreaInput label="Add your Main Content" name="mainContent" />
      </InputSection>
      <InputSection title="Location" itemKey="location">
        <TextInput label="Add your Location" name="location" />
      </InputSection>
    </Accordion>
  );
}
