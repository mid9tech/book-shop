"use client";

import { DeleteContactService } from "@/+core/services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";

interface RemoveContactProps {
  id: string | undefined;
}

export function ConfirmRemoveContactDialog({ id }: RemoveContactProps) {
  const { data: session } = useSession();
  const { toast } = useToast();

  async function confirmDeleteContact() {
    const { errors } = await DeleteContactService(
      id as string,
      session?.accessToken as string
    );

    if (errors) {
      return toast({
        variant: "destructive",
        title: "Can not delete contact",
        description: errors[0].message,
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }

    toast({
      title: "Success delete contact",
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="rounded-none">
          Remove
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            contact and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={confirmDeleteContact}>
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
