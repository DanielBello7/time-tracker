import { Input } from "@/components/ui/input";
import { FaTimes } from "react-icons/fa";
import { toast } from "sonner";
import { Button } from "./ui/button";
import * as React from "react";

type HeaderSearchBarProps = {
  isLoading?: boolean
  submit?: (text: string) => void
  initial?: string
  cancel?: () => void
  value?: string
  onchange?: (val: string) => void
}

function HeaderSearchBar(props: HeaderSearchBarProps) {
  const {
    initial,
    isLoading,
    submit,
    cancel,
    onchange,
    value
  } = props;

  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (value && onchange) {
      if (!value.trim()) {
        return toast("Error occured", {
          description: "Type something.."
        });
      }
      submit && submit(value);
    }
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

  const handlechange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const text = event.currentTarget.value;
    onchange && onchange(text);
  }

  return (
    <form className="w-[180px] lg:w-[350px] border rounded-lg flex items-center" onSubmit={onsubmit}>
      <Input
        placeholder="Search..."
        name="search"
        className="border-0"
        onChange={handlechange}
        value={value}
        defaultValue={initial}
        type="text"
        disabled={isLoading && true}
      />
      {
        value !== undefined
          ?
          value.trim()
            ?
            <Button size={"icon"} variant={"ghost"} onClick={click} type="button">
              <FaTimes size={13} />
            </Button>
            : null
          :
          <Button size={"icon"} variant={"ghost"} onClick={click} type="button">
            <FaTimes size={13} />
          </Button>
      }
    </form>
  )
}

HeaderSearchBar.defaultProps = {
  isLoading: false
}


export default HeaderSearchBar;
