import { WinterTemplate } from "@/app/templates/WinterTemplate";
import { useWatch } from "react-hook-form";

interface IRightPanelProps {}

export function RightPanel(props: IRightPanelProps) {
  const {} = props;

  const name1 = useWatch({ name: "name1" });
  const name2 = useWatch({ name: "name2" });
  const eventDate = useWatch({ name: "eventDate" });

  const subtitle = useWatch({ name: "subtitle" });
  const mainParagraph = useWatch({ name: "mainContent" });

  const backgroundImage = useWatch({ name: "backgroundImage" });

  return (
    <WinterTemplate
      name1={name1}
      name2={name2}
      eventDate={eventDate}
      date={eventDate}
      subtitle={subtitle}
      mainParagraph={mainParagraph}
      backgroundImageUrl={backgroundImage?.[0]}
      visibility={{}}
    />
  );
}
