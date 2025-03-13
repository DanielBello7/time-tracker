import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { updateSharedTaskHasMore, updateSharedTaskPage } from "@/store/tasks-slice";
import * as React from "react";
import HeaderSearchBar from "@/components/header-search-bar";

export default function SharedTaskHeaderSearchBar() {
  const router = useRouter();
  const { search } = router.query;
  const dispatch = useAppDispatch();
  const searchValue = search && typeof search === "string" && search ? search : null;
  const [text, setText] = React.useState(searchValue ?? "");

  return (
    <HeaderSearchBar
      onchange={setText}
      value={text}
      submit={(value) => {
        dispatch(updateSharedTaskHasMore(true));
        dispatch(updateSharedTaskPage(1));
        router.push(`/dashboard/shared-tasks?search=${value}`);
      }}
      cancel={() => {
        dispatch(updateSharedTaskHasMore(true));
        dispatch(updateSharedTaskPage(1));
        router.push(`/dashboard/shared-tasks`)
        setText("");
      }}
    />
  )
}

