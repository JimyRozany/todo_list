import {
  Popover,
  PopoverHandler,
  PopoverContent,
  Button,
  Alert
} from "@material-tailwind/react";
import { useState } from "react";

function PopOver() {
  const [showPopover, setShowPopover] = useState(false);

  function showHidePopover() {
    setShowPopover(true);
    // setTimeout(() => {
    //     setShowPopover(false);
    // }, 2000);
  }

  return (
    <>
      {/* <Popover open={showPopover} placement="left-start">
        <PopoverHandler>
        <Button>Popover</Button>
      </PopoverHandler>
        <PopoverContent>
          <span>This is a very beautiful popover, show some love.</span>
        </PopoverContent>
      </Popover>
      <Button onClick={showHidePopover}>Popover 2</Button> */}
    </>
  );
}

export default PopOver;
