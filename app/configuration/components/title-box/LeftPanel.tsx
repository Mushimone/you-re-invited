import { TextAreaInput } from "@/app/common/TextArea";
import { TextInput } from "@/app/common/TextInput";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface IProps {
  title: string | undefined;
  onChangeTitle: (title: string) => void;
  subtitle: string | undefined;
  onChangeSubtitle: (subtitle: string) => void;
  mainContent: string | undefined;
  onMainContentChange: (text: string) => void;
}

export function LeftPanel(props: IProps) {
  const {
    title,
    onChangeTitle,
    subtitle,
    onChangeSubtitle,
    mainContent,
    onMainContentChange,
  } = props;

  return (
    <Accordion type="multiple" className="w-full">
      <AccordionItem value="item-1">
        <AccordionTrigger>Title</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <TextInput
            onChange={onChangeTitle}
            label="Add your Title"
            value={title}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>Subtitle</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <TextInput
            onChange={onChangeSubtitle}
            label="Add your Subtitle"
            value={subtitle}
          />
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>Main Content</AccordionTrigger>
        <AccordionContent className="flex flex-col gap-4 text-balance">
          <TextAreaInput
            onChange={onMainContentChange}
            label="Add your Main Content"
            value={mainContent}
          />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
