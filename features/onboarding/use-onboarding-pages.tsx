import useMultistep from "@/hooks/use-multi-form";
import React from "react";
import AvatarSelect from "./avatar-select";
import Finish from "./finish";
import PositionSelect from "./position-select";

export default function useOnboardingPages() {
  const [selected, setSelected] = React.useState("");
  const [position, setPosition] = React.useState("");
  const [text, setText] = React.useState("");

  const response = useMultistep([
    <AvatarSelect
      selected={selected}
      setSelected={setSelected}
    />,
    <PositionSelect
      position={position}
      setPosition={setPosition}
      setText={setText}
      text={text}
    />,
    <Finish />
  ]);

  return {
    ...response,
    selected,
    setSelected,
    position,
    setPosition,
    text,
    setText
  }
}


