import { AlertDialog, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import LogoutDialog from "./logout-dialog";
import Link from "next/link";
import Text from "@/components/text";
import UserAvatar from "@/components/user-avatar";
import { useAppSelector } from "@/store/hooks";
import { IoSettingsOutline } from "react-icons/io5";
import { TbFileImport } from "react-icons/tb";
import { BiLogOut } from "react-icons/bi";
import { FaCreativeCommonsShare } from "react-icons/fa";

export default function UserMenu() {
  const { email, name, avatar } = useAppSelector((state) => state.user.user);
  return (
    <AlertDialog>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="relative p-0 m-0 size-8 border rounded-full">
            <UserAvatar size="sm" avatar={avatar} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56">
          <DropdownMenuLabel>
            <Text type="md" className="capitalize truncate">{name}</Text>
            <Text type="sub" className="font-normal truncate">{email}</Text>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <Link href={"/dashboard/settings"}>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>
                  <IoSettingsOutline size={17} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard/shared-tasks"}>
              <DropdownMenuItem>
                Shared Tasks
                <DropdownMenuShortcut>
                  <FaCreativeCommonsShare size={16} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
            <Link href={"/dashboard/import-tasks"}>
              <DropdownMenuItem>
                Import
                <DropdownMenuShortcut>
                  <TbFileImport size={17} />
                </DropdownMenuShortcut>
              </DropdownMenuItem>
            </Link>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <AlertDialogTrigger asChild>
            <DropdownMenuItem className="text-red-600">
              Log out
              <DropdownMenuShortcut>
                <BiLogOut size={20} />
              </DropdownMenuShortcut>
            </DropdownMenuItem>
          </AlertDialogTrigger>
        </DropdownMenuContent>
      </DropdownMenu>
      <LogoutDialog />
    </AlertDialog>
  )
}

