import { useState } from "react";
import { useSession } from "next-auth/react";
import { FaQuestion } from "react-icons/fa";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { UpdateStatusOrderService } from "@/+core/services";
import { STATUS_ORDER } from "@/+core/enums";
import { ToastAction } from "@radix-ui/react-toast";
import { Label } from "@/components/ui/label";

interface Props {
  id: string;
  refetch: () => void;
}

export default function SelectReason({ id, refetch }: Props) {
  const [open, setOpen] = useState(false);
  const [reason, setReason] = useState<string>("");

  const { data: session } = useSession();
  const { toast } = useToast();

  const returnOrder = async () => {
    const { data, errors } = await UpdateStatusOrderService(
      session?.accessToken as string,
      {
        reason: reason,
        id: id,
        status: STATUS_ORDER.RETURN,
      }
    );

    if (errors) {
      return toast({
        variant: "destructive",
        title: "Cannot return order, please try again!",
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    toast({
      variant: "default",
      title: "Successfully returned order",
      description: new Date().toDateString(),
      action: <ToastAction altText="Close">Close</ToastAction>,
    });

    refetch();
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="border rounded-none mb-5">
          Return
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[60rem]">
        <DialogHeader>
          <DialogTitle>
            <h2 className="text-2xl flex flex-row text-start font-bold mb-6 text-blue-600">
              <FaQuestion className="mt-1" />
              <span className="ml-4">Select reason to return order</span>
            </h2>
          </DialogTitle>
        </DialogHeader>
        <div className="max-h-[30rem] w-full m-1 bg-white overflow-auto">
          <div className="mt-4 m-1">
            <Label htmlFor="custom-reason">Enter reason</Label>
            <Input
              id="custom-reason"
              placeholder="Enter a custom reason"
              className="w-full"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>
        </div>
        <DialogFooter>
          <Button variant="ghost" onClick={returnOrder}>
            Return
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
