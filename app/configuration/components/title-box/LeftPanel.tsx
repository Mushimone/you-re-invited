import { TextInput } from "@/app/common/TextInput";
import { TextAreaInput } from "@/app/common/TextArea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IProps {
  onChangeTitle: (title: string) => void;
  onChangeSubtitle: (subtitle: string) => void;
  onChangeTextArea: (text: string) => void;
}

export function LeftPanel(props: IProps) {
  const { onChangeTitle, onChangeSubtitle, onChangeTextArea } = props;

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Title</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <TextInput onChange={onChangeTitle} label="Add your Title" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Subtitle</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <TextInput onChange={onChangeSubtitle} label="Add your Subtitle" />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Main Content</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <TextAreaInput
            onChange={onChangeTextArea}
            label="Add your Main Content"
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
