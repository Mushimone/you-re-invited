import { useWatch } from "react-hook-form";

interface IRightPanelProps {}

export function RightPanel(props: IRightPanelProps) {
  const {} = props;

  const title = useWatch({ name: "title" });
  const subtitle = useWatch({ name: "subtitle" });
  const mainContent = useWatch({ name: "mainContent" });
  const bgImage = useWatch({ name: "image" });

  return (
    <div
      className="h-full bg-cover bg-center flex items-center justify-center"
      style={{
        backgroundImage: `url(${
          bgImage ? URL.createObjectURL(bgImage[0]) : ""
        })`,
      }}
    >
      <div className="p-8 bg-white text-center bg-opacity-75 min-h-[200px] opacity-90">
        <h1>{title}</h1>
        <h2>{subtitle}</h2>
        <p>{mainContent}</p>
      </div>
    </div>
  );
}
