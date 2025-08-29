import { ImageInput } from "@/app/common/input/ImageInput";
import { TextAreaInput } from "@/app/common/input/TextAreaInput";
import { TextInput } from "@/app/common/input/TextInput";

interface IProps {}

export function LeftPanel(props: IProps) {
  const {} = props;

  return (
    <div className="flex flex-col gap-4">
      <div className="bg-fuchsia-400 w-fit px-6 py-2 rounded text-white">
        <h2 className="text-2xl font-bold">Edit your Invitation</h2>
      </div>
      <h3 className="text-lg font-semibold">Wedding Data</h3>
      <div className="w-full h-[2px] -mt-3 bg-fuchsia-600" />
      <div className="flex gap-2 w-full justify-between">
        <TextInput name="name1" label="Add Name n.1:" />
        <TextInput name="name2" label="Add Name n.2:" />
      </div>
      <TextInput label="Location:" name="location" />
      <TextInput name="eventDate" label="Event Date:" />

      <h3 className="text-lg font-semibold mt-4">Content</h3>
      <div className="w-full h-[2px] -mt-3 bg-fuchsia-600" />
      <ImageInput name="backgroundImage" label="Add your Top Image:" />

      <TextInput name="subtitle" label="Subtitle:" />
      <TextAreaInput label="Add your Main Content:" name="mainContent" />
    </div>
  );
}

//  <Accordion
//       type="multiple"
//       className="w-full"
//       defaultValue={["title", "subtitle", "mainContent", "image"]}
//     >
//       {/* HERO */}
//       <InputSection title="Name n.1" itemKey="name1">
//         <TextInput name="name1" label="Add your Name n.1" />
//       </InputSection>
//       <InputSection title="Name n.2" itemKey="name2">
//         <TextInput name="name2" label="Add your Name n.2" />
//       </InputSection>
//       <InputSection title="Background Image" itemKey="backgroundImage">
//         <ImageInput name="backgroundImage" label="Add your Top Image" />
//       </InputSection>
//       <InputSection title="Event Date" itemKey="eventDate">
//         <TextInput name="eventDate" label="Event Date" />
//       </InputSection>
//       <InputSection title="Subtitle" itemKey="subtitle">
//         <TextInput name="subtitle" label="Subtitle" />
//       </InputSection>
//       <InputSection title="Main Content" itemKey="mainContent">
//         <TextAreaInput label="Add your Main Content" name="mainContent" />
//       </InputSection>
//       <InputSection title="Location" itemKey="location">
//         <TextInput label="Add your Location" name="location" />
//       </InputSection>
//     </Accordion>
