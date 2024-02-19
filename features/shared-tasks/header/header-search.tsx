import * as React from "react";
import HeaderSearchBar from "@/components/header-search-bar";
import { useRouter } from "next/router";

export default function SharedTaskHeaderSearchBar() {
  const [text, setText] = React.useState("");
  const router = useRouter();
  const { search } = router.query;

  return (
    <HeaderSearchBar
      onchange={setText}
      value={text}
      initial={search && typeof search === "string" && search ? search : ""}
      submit={(value) => {
        router.push(`/dashboard/shared-tasks?search=${value}`);
      }}
      cancel={() => {
        router.push(`/dashboard/shared-tasks`)
        setText("");
      }}
    />
  )
}

