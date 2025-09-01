import { CheckboxItemInput } from "@/app/common/input/CheckboxItemInput";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useWatch } from "react-hook-form";

interface IProps {
  name: string;
}

export function EyeCheckbox(props: IProps) {
  const { name } = props;
  const currentCheckboxValue = useWatch({ name });

  return (
    <CheckboxItemInput
      text={currentCheckboxValue ? <FaEye /> : <FaEyeSlash />}
      name={name}
    />
  );
}
