"use client";

import { Logout } from "@/+core/services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { signOut, useSession } from "next-auth/react";
import { ToastAction } from "../ui/toast";
import { useToast } from "../ui/use-toast";
import { Button } from "../ui/button";

export default function LogoutButton() {
  const { data: session } = useSession();
  const { toast } = useToast();

  async function logout() {
    if (session?.refreshToken) {
      const { data, errors } = await Logout(session?.refreshToken as string);

      if (errors) {
        return toast({
          variant: "destructive",
          title: "Can not send verification email",
          description: new Date().toDateString(),
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });
      }
    }

    await signOut();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button className="w-full h-full rounded-none text-black border-none bg-white hover:text-white">
          Sign out
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure sign out?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>
            <Button onClick={logout}>Sign out</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
