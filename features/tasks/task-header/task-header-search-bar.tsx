import * as React from "react";
import HeaderSearchBar from "@/components/header-search-bar";
import { useRouter } from "next/router";

export default function TaskHeaderSearchBar() {
  const [text, setText] = React.useState("");
  const router = useRouter();
  const { search } = router.query;

  return (
    <HeaderSearchBar
      initial={search && typeof search === "string" && search ? search : ""}
      onchange={(e) => setText(e)}
      value={text}
      submit={(value) => {
        router.push(`/dashboard/tasks?search=${value}`);
      }}
      cancel={() => {
        router.push(`/dashboard/tasks`)
        setText("");
      }}
    />
  )
}

