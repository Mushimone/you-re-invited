"use client";
import { Form } from "../common/form/Form";
import { LeftPanel } from "./components/left-panel/LeftPanel";
import { RightPanel } from "./components/right-panel/RightPanel";

export default function Configurator() {
  return (
    <Form
      initialValues={{
        title: "My Title",
        subtitle: "My Subtitle",
        mainContent: "This is the main content",
        visibility: {
          title: true,
          subtitle: true,
          mainContent: true,
          image: true,
        },
      }}
    >
      <div className="container-x1 flex mx-auto bg-gray-100">
        {/* Left part */}
        <div className="w-1/3 p-4 bg-purple-100">
          <LeftPanel />
        </div>
        {/* Right part */}
        <div className="w-2/3">
          <RightPanel />
        </div>
      </div>
    </Form>
  );
}
