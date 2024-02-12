import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import * as React from "react";

export default function SearchBar() {
  const onsubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const text = event.currentTarget.search.value;
    if (!text.trim()) return toast("Error occured", { description: "Type something.." });
  }
  return (
    <form className="w-full" onSubmit={onsubmit}>
      <Input
        name="search"
        type="text"
        placeholder="Search..."
      />
    </form>
  )
}
