import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as React from "react";
import { Button } from "./ui/button";
import { FaTimes } from "react-icons/fa";

type HeaderSearchBarProps = {
  isLoading?: boolean
  submit?: (text: string) => void
  initial?: string
  cancel?: () => void
}

function HeaderSearchBar({ initial, isLoading, submit, cancel }: HeaderSearchBarProps) {

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = event.currentTarget.search.value;
    if (!text.trim()) {
      return toast("Error occured", {
        description: "Type something.."
      });
    }
    submit && submit(text);
  }

  const click = () => {
    cancel && cancel();
  }

  return (
    <form className="w-[180px] lg:w-[350px] border rounded-lg flex items-center" onSubmit={onsubmit}>
      <Input
        placeholder="Search..."
        name="search"
        className="border-0"
        defaultValue={initial}
        type="text"
        disabled={isLoading && true}
      />
      <Button size={"icon"} variant={"ghost"} onClick={click}
        type="button">
        <FaTimes size={13} />
      </Button>
    </form>
  )
}

HeaderSearchBar.defaultProps = {
  isLoading: false
}


export default HeaderSearchBar;
