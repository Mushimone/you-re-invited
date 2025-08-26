"use client";
import { useState } from "react";
import { LeftPanel } from "./components/title-box/LeftPanel";

export default function Configurator() {
  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [textArea, setTextArea] = useState("");

  return (
    //Main Container
    <div className="container-x1 flex mx-auto bg-gray-100">
      {/* Left part */}
      <div className="w-1/3 p-4 bg-purple-100">
        <LeftPanel
          onChangeTitle={function (title: string): void {
            setTitle(title);
          }}
          onChangeSubtitle={function (subtitle: string): void {
            setSubtitle(subtitle);
          }}
          onChangeTextArea={function (text: string): void {
            setTextArea(text);
          }}
        />
      </div>
      {/* Right part */}
      <div className="w-2/3">
        <h1 className="scroll-m-20 text-center text-4xl font-extrabold tracking-tight text-balance">
          {title}
        </h1>
        <h3 className="scroll-m-20 text-center text-2xl font-bold tracking-tight text-balance">
          {subtitle}
        </h3>
        <p className="scroll-m-20 text-center text-base font-normal tracking-tight text-balance">
          {textArea}
        </p>
      </div>
    </div>
  );
}
