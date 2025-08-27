import {
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

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
        {children}
      </AccordionContent>
    </AccordionItem>
  );
}
