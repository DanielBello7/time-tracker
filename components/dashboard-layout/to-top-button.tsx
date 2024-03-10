import { FaArrowUp } from "react-icons/fa";
import { Button } from "../ui/button";
import * as React from "react";

export default function ToTopButton() {
  const [show, setShow] = React.useState(false);
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  React.useEffect(() => {
    const percieve = () => {
      let currentScrollPosition = document.documentElement.scrollTop;
      if (currentScrollPosition === 0) return setShow(false);
      return setShow(true);
    }
    document.addEventListener("scroll", percieve);
    return () => {
      document.removeEventListener("scroll", percieve);
    }
  }, [setShow]);

  if (!show) return null
  return (
    <Button className="md:hidden transition-all hover:scale-[1.05] fixed size-12 bg-blue-200 bottom-20 right-10 rounded-full" size={"icon"} variant={"secondary"}
      type="button" onClick={handleClick} id="top-button">
      <FaArrowUp size={20} />
    </Button>
  )
}
