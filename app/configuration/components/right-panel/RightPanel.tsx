import { useWatch } from "react-hook-form";

interface IRightPanelProps {}

export function RightPanel(props: IRightPanelProps) {
  const {} = props;

  const title = useWatch({ name: "title" });
  const subtitle = useWatch({ name: "subtitle" });
  const mainContent = useWatch({ name: "mainContent" });

  return (
    <div>
      <h1>{title}</h1>
      <h2>{subtitle}</h2>
      <p>{mainContent}</p>
    </div>
  );
}
