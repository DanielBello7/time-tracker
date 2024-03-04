import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  DropdownMenuSeparator,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FaCheck, FaEllipsisV } from "react-icons/fa";
import { changeIsSelectable } from "@/store/interface-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { useRouter } from "next/router";
import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { updatePage, updateHasMore, resetTasks } from "@/store/tasks-slice"
import DeleteAllTasksDialog from "./delete-all-dialog";

export default function TaskHeaderOptions() {
  const { isSelectable } = useAppSelector((state) => state.interface)
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { type } = router.query

  const select = () => {
    dispatch(changeIsSelectable(isSelectable ? false : true));
  }

  const selectBug = () => {
    dispatch(updateHasMore(true));
    dispatch(updatePage(1));
    dispatch(resetTasks());
    if (type && typeof type === "string" && type === "bug") {
      const redirect = router.pathname.replace("type=bug", "");
      return router.push(redirect);
    }
    router.push(`/dashboard/tasks?type=bug`);
  }

  const selectStory = () => {
    dispatch(updateHasMore(true));
    dispatch(updatePage(1));
    dispatch(resetTasks());
    if (type && typeof type === "string" && type === "story") {
      const redirect = router.pathname.replace("type=story", "");
      return router.push(redirect);
    }
    router.push(`/dashboard/tasks?type=story`);
  }

  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="p-0 px-2">
            <FaEllipsisV />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>Task Options</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={"/dashboard/tasks/create"}>
              <DropdownMenuItem>
                New Task
                <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <DropdownMenuItem onClick={select}>
              {isSelectable ? "Cancel Select" : "Select"}
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuSub>
              <DropdownMenuItem onClick={selectStory}>
                Show Stories
                <DropdownMenuShortcut>
                  {type && typeof type === "string" && type === "story" && <FaCheck />}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={selectBug}>
                Show Bugs
                <DropdownMenuShortcut>
                  {type && typeof type === "string" && type === "bug" && <FaCheck />}
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuSub>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-600">
              Delete All
              <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <DeleteAllTasksDialog />
    </AlertDialog>
  )
}

