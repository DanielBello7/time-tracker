import * as React from "react";
import HeaderSearchBar from "@/components/header-search-bar";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { updatePage, updateHasMore } from "@/store/tasks-slice";

export default function TaskHeaderSearchBar() {
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useAppDispatch();
  const searchValue = search && typeof search === "string" && search ? search : null;
  const [text, setText] = React.useState(searchValue ?? "");

  return (
    <HeaderSearchBar
      onchange={(e) => setText(e)}
      value={text}
      submit={(value) => {
        dispatch(updateHasMore(true));
        dispatch(updatePage(1));
        router.push(`/dashboard/tasks?search=${value}`);
      }}
      cancel={() => {
        dispatch(updateHasMore(true));
        dispatch(updatePage(1));
        router.push(`/dashboard/tasks`)
        setText("");
      }}
    />
  )
}

