import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useFormContext } from "react-hook-form";
import { useRef } from "react";

const MAX_MB = 10;

interface IProps {
  label: string;
  name: string;
  multiple?: boolean;
}

export function ImageInput(props: IProps) {
  const { name, label, multiple } = props;
  const { register } = useFormContext();
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    ref: registerRef,
    onChange: registerOnChange,
    ...rest
  } = register(name);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    const rejected = files.filter((f) => f.size > MAX_MB * 1024 * 1024);
    if (rejected.length > 0) {
      alert(
        `${rejected.map((f) => f.name).join(", ")} exceed${rejected.length === 1 ? "s" : ""} the ${MAX_MB} MB limit and cannot be uploaded.`,
      );
      e.target.value = "";
      return;
    }
    registerOnChange(e);
  };

  return (
    <>
      <Label htmlFor={name}>{label}</Label>
      <Input
        type="file"
        id={name}
        accept="image/*"
        multiple={multiple}
        ref={(el) => {
          registerRef(el);
          (
            inputRef as React.MutableRefObject<HTMLInputElement | null>
          ).current = el;
        }}
        onChange={handleChange}
        {...rest}
      />
    </>
  );
}
