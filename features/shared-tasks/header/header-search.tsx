import { useRouter } from "next/router";
import * as React from "react";
import HeaderSearchBar from "@/components/header-search-bar";

export default function SharedTaskHeaderSearchBar() {
  const router = useRouter();
  const { search } = router.query;
  const searchValue = search && typeof search === "string" && search ? search : null;
  const [text, setText] = React.useState(searchValue ?? "");

  return (
    <HeaderSearchBar
      onchange={setText}
      value={text}
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

