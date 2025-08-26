import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
interface IProps {
  value: string | undefined;
  onChange: (text: string) => void;
  label: string;
}
export const TextAreaInput = ({ onChange, label, value }: IProps) => {
  return (
    <>
      <Label htmlFor="text">{label}</Label>
      <Textarea
        id="text"
        onChange={(input) => onChange(input.target.value)}
        value={value}
      />
    </>
  );
};
