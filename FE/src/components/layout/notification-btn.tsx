import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BellIcon } from "lucide-react";

const NotificationDropDownMenu = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <BellIcon className="h-4 w-4" />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="rounded-none">
        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>Notification 1 ...</DropdownMenuItem>
        <DropdownMenuItem>Notification 2 ...</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default NotificationDropDownMenu;
