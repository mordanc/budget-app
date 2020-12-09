import {
  Popover,
  PopoverTrigger,
  Progress,
  PopoverContent,
  PopoverArrow,
  PopoverCloseButton,
  PopoverHeader,
  PopoverBody,
  Wrap,
  WrapItem,
  Center,
} from "@chakra-ui/react";
import React, { useState } from "react";

const ColorItem = ({ color, onClick }) => {
  return (
    <WrapItem onClick={() => onClick(color)}>
      <Center w="50px" h="50px" bg={`${color}.200`}></Center>
    </WrapItem>
  );
};

function ProgressBar({
  percentage,
  initialColor,
}: {
  percentage: number;
  initialColor?: string;
}) {
  const colors = ["red", "blue", "green", "yellow", "orange"];
  const initialColorScheme =
    initialColor || colors[Math.floor(Math.random() * colors.length)];
  const [colorScheme, setColorScheme] = useState(initialColorScheme);

  return (
    <Popover id="title">
      <PopoverTrigger>
        <div>
          <Progress value={percentage} colorScheme={colorScheme} />
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverCloseButton />
        <PopoverHeader>Choose a color</PopoverHeader>
        <PopoverBody>
          <Wrap spacing="2px">
            <ColorItem color="red" onClick={setColorScheme} />
            <ColorItem color="blue" onClick={setColorScheme} />
            <ColorItem color="green" onClick={setColorScheme} />
            <ColorItem color="yellow" onClick={setColorScheme} />
            <ColorItem color="orange" onClick={setColorScheme} />
          </Wrap>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  );
}

export default ProgressBar;
