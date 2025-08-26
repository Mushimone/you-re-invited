import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface IProps {
  onChange: (text: string) => void;
  label: string;
}
export const TextAreaInput = ({ onChange, label }: IProps) => {
  return (
    <>
      <Label htmlFor="text">{label}</Label>
      <Textarea id="text" onChange={(input) => onChange(input.target.value)} />
    </>
  );
};
