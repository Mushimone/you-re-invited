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
      defaultValue={["title", "subtitle", "mainContent"]}
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
    </Accordion>
  );
}
