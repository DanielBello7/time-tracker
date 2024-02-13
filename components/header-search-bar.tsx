import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as React from "react";

type HeaderSearchBarProps = {
  isLoading?: boolean
  submit?: (text: string) => void
}

function HeaderSearchBar({ isLoading, submit }: HeaderSearchBarProps) {
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

  return (
    <form className="w-[180px] lg:w-[350px]" onSubmit={onsubmit}>
      <Input
        placeholder="Search..."
        name="search"
        type="text"
        disabled={isLoading && true}
      />
    </form>
  )
}

HeaderSearchBar.defaultProps = {
  isLoading: false
}


export default HeaderSearchBar;
