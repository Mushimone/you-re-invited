import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { EyeCheckbox } from "./EyeCheckbox";

interface IInputSectionProps {
  itemKey: string;
  title: string;
  children: React.ReactNode | React.ReactNode[];
}

/**
 * Sezione del pannello di configurazione laterale per l'inserimento
 * di un input.
 */
export function InputSection(props: IInputSectionProps) {
  const { itemKey, title, children } = props;
  return (
    <AccordionItem value={itemKey}>
      <AccordionTrigger>{title}</AccordionTrigger>
      <AccordionContent className="flex flex-col gap-4 text-balance">
        <div className="flex gap-3 items-start justify-between">
          <div className="flex-1 min-w-0">{children}</div>
          <div className="flex-shrink-0 pt-1">
            <EyeCheckbox name={`visibility.${itemKey}`} />
          </div>
        </div>
      </AccordionContent>
    </AccordionItem>
  );
}
