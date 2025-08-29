import { CheckboxInput } from "@/app/common/input/CheckboxInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useFormContext, useWatch } from "react-hook-form";

interface IProps {
  name: string;
}

export function EyeCheckbox(props: IProps) {
  const { name } = props;
  const currentCheckboxValue = useWatch({ name });

  return (
    <CheckboxInput
      text={currentCheckboxValue ? <FaEye /> : <FaEyeSlash />}
      name={name}
    />
  );
}
