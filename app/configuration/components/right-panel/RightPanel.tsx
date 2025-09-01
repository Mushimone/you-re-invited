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

  const coverImageUrl = useWatch({ name: "coverImageUrl" });

  const mainContentImage = useWatch({ name: "mainContentImage" });

  const visibility = useWatch({ name: "visibility" });

  return (
    <WinterTemplate
      name1={name1}
      name2={name2}
      eventDate={eventDate}
      date={eventDate}
      subtitle={subtitle}
      mainParagraph={mainParagraph}
      coverImageUrl={coverImageUrl?.[0]}
      visibility={visibility}
      extraContent1ImageUrl={mainContentImage?.[0]}
    />
  );
}
