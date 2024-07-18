import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import {
  CreateNewContactService,
  UpdateContactService,
} from "@/+core/services";
import { useSession } from "next-auth/react";
import { ContactInterface } from "@/+core/interfaces/contact";
import { useState } from "react";

const formSchema = z.object({
  fullName: z.string().min(5, {
    message: "Full name must be at least 5 characters.",
  }),
  province: z.string().min(1, {
    message: "Province must be at least 1 characters.",
  }),
  district: z.string().min(1, {
    message: "District must be at least 1 characters.",
  }),
  wards: z.string().min(1, {
    message: "Ward must be at least 1 characters.",
  }),
  detailAddress: z.string().min(5, {
    message: "Detail address must be at least 5 characters.",
  }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
});

interface ContactDialogProps {
  currentContact?: ContactInterface;
  refetchContacts: () => void;
}

export default function ContactDialog({
  currentContact,
  refetchContacts,
}: ContactDialogProps) {
  const [open, setOpen] = useState<boolean>(false);
  const { toast } = useToast();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: currentContact?.fullName || "",
      province: currentContact?.province || "",
      district: currentContact?.district || "",
      wards: currentContact?.wards || "",
      detailAddress: currentContact?.detailAddress || "",
      phoneNumber: currentContact?.phoneNumber || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      if (currentContact) {
        await UpdateContactService(session?.accessToken as string, {
          id: currentContact?.id,
          province: values.province,
          district: values.district,
          wards: values.wards,
          fullName: values.fullName,
          detailAddress: values.detailAddress,
          phoneNumber: values.phoneNumber,
        });
        toast({
          title: "Update contact successfully",
          description: new Date().toDateString(),
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });

        setOpen(false);

        refetchContacts();
      } else {
        await CreateNewContactService(session?.accessToken as string, {
          province: values.province,
          district: values.district,
          wards: values.wards,
          fullName: values.fullName,
          detailAddress: values.detailAddress,
          phoneNumber: values.phoneNumber,
        });

        toast({
          title: "Create contact successfully",
          description: new Date().toDateString(),
          action: (
            <ToastAction altText="Goto schedule to undo">Undo</ToastAction>
          ),
        });

        setOpen(false);

        refetchContacts();
      }
    } catch (error: any) {
      return toast({
        variant: "destructive",
        title: "Can not create new contact",
        description: error.message,
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="rounded-none">
          {currentContact ? "Update Contact" : "New Contact"}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] lg:max-w-[650px]">
        <DialogHeader>
          <DialogTitle>Manager Contact</DialogTitle>
          <DialogDescription>
            Create or update contact here. Click save when you're done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="grid grid-cols-2 gap-4"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Full Name"
                      {...field}
                      defaultValue={currentContact?.fullName}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="province"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Province</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Province"
                      {...field}
                      defaultValue={currentContact?.province}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="district"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>District</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="District"
                      {...field}
                      defaultValue={currentContact?.district}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="wards"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ward</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Ward"
                      {...field}
                      defaultValue={currentContact?.wards}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="detailAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Detail Address</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Detail Address"
                      {...field}
                      defaultValue={currentContact?.detailAddress}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Phone Number"
                      {...field}
                      defaultValue={currentContact?.phoneNumber}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <DialogFooter>
                <Button type="submit">Save changes</Button>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
