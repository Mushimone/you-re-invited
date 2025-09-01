import { CheckboxInput } from "@/app/common/input/CheckboxInput";
import { ImageInput } from "@/app/common/input/ImageInput";
import { TextAreaInput } from "@/app/common/input/TextAreaInput";
import { TextInput } from "@/app/common/input/TextInput";
import { useWatch } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface IMainContentInputProps {}

export function MainContentInput(props: IMainContentInputProps) {
  const {} = props;

  const enabled = useWatch({ name: "visibility.mainContent" });

  return (
    <>
      <div className="mt-4 flex justify-between">
        <CheckboxInput name={"visibility.mainContent"}>
          <h3 className="text-lg font-semibold">Content</h3>
        </CheckboxInput>
        <div className="items-center align-middle flex felx-col justify-center -mb-1">
          {enabled ? <FaEye /> : <FaEyeSlash />}
        </div>
      </div>
      <div className="w-full h-[2px] -mt-3 bg-fuchsia-600" />

      <TextInput name="subtitle" label="Subtitle:" disabled={!enabled} />
      <TextAreaInput
        label="Add your Main Content:"
        name="mainContent"
        disabled={!enabled}
      />
      <ImageInput name="mainContentImage" label="Add your image:" />
    </>
  );
}
