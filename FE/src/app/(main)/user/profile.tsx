"use client";

import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Form } from "@/components/ui/form";
import { useSession } from "next-auth/react";
import { USER_GENDER } from "@/+core/enums";
import { UploadFileService } from "@/+core/services";
import { UpdateProfileService } from "@/+core/services/user/updateProfile";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Avatar from "./components/avatar";

const profileSchema = z.object({
  firstName: z.string().nonempty({ message: "First Name is required" }),
  lastName: z.string().optional(),
  email: z.string().email({ message: "Invalid email address" }),
  phoneNumber: z
    .string()
    .min(10, { message: "Phone number must be at least 10 digits" })
    .regex(/^\d+$/, { message: "Phone number must contain only digits" }),
  gender: z.enum([USER_GENDER.FEMALE, USER_GENDER.MALE, USER_GENDER.UNDEFINED]),
  dateOfBirth: z.object({
    day: z
      .string()
      .regex(/^(0?[1-9]|[12][0-9]|3[01])$/, { message: "Invalid day" }),
    month: z.string().regex(/^(0?[1-9]|1[012])$/, { message: "Invalid month" }),
    year: z.string().regex(/^\d{4}$/, { message: "Invalid year" }),
  }),
});

export default function FormProfile() {
  const { data: session } = useSession();
  const [notification, setNotification] = useState<string>("");
  const [file, setFile] = useState<File | undefined>(undefined);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof profileSchema>>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      firstName: session?.user?.firstName,
      lastName: session?.user?.lastName,
      email: session?.user?.email,
      phoneNumber: session?.user?.phoneNumber,
      gender: session?.user?.gender || USER_GENDER.UNDEFINED,
      dateOfBirth: {
        day: new Date(session?.user?.birthDate as string)
          .getUTCDate()
          .toString(),
        month: (
          new Date(session?.user?.birthDate as string).getUTCMonth() + 1
        ).toString(),
        year: new Date(session?.user?.birthDate as string)
          .getUTCFullYear()
          .toString(),
      },
    },
  });

  async function onSubmit(values: z.infer<typeof profileSchema>) {
    try {
      let avatarUrl = session?.user?.avatar;

      if (file) {
        const uploadedUrl = await UploadFileService(file);
        avatarUrl = uploadedUrl;
      }

      console.log(avatarUrl, values);

      const updatedProfile = await UpdateProfileService(
        session?.accessToken as string,
        {
          firstName: values.firstName,
          lastName: values.lastName,
          phoneNumber: values.phoneNumber,
          gender: values.gender,
          birthDate: `${values.dateOfBirth.month}-${values.dateOfBirth.day}-${values.dateOfBirth.year}`,
          avatar: avatarUrl,
        }
      );

      if (session) session.user = updatedProfile.data.updateProfile;
      toast({
        title: "Update Profile Success!",
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Cannot update Profile. Please try again!",
        description: err.message,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }
  }

  const handleFileUpload = (file: File) => {
    setFile(file);
  };

  return (
    <div className="flex flex-row">
      <div className="p-12">
        <Avatar getFile={handleFileUpload} />
      </div>

      <div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="space-y-4 grid grid-cols-2 gap-4">
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <Input
                  {...form.register("firstName")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                  defaultValue={session?.user?.firstName}
                />
                {form.formState.errors.firstName && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.firstName.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <Input
                  {...form.register("lastName")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                  defaultValue={session?.user?.lastName}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <Input
                  {...form.register("email")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                  type="email"
                  defaultValue={session?.user?.email}
                  disabled
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phone Number
                </label>
                <Input
                  {...form.register("phoneNumber")}
                  className="mt-1 block w-full border-gray-300 rounded-none shadow-sm"
                  defaultValue={session?.user?.phoneNumber}
                />
              </div>

              <div>
                <label className="block text-sm items-center font-medium text-gray-700">
                  Gender
                </label>
                <RadioGroup
                  {...form.register("gender")}
                  className="mt-4 flex space-x-4"
                  defaultValue={session?.user?.gender}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={USER_GENDER.MALE}
                      id={USER_GENDER.MALE}
                    />
                    <Label htmlFor={USER_GENDER.MALE}>Male</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={USER_GENDER.FEMALE}
                      id={USER_GENDER.FEMALE}
                    />
                    <Label htmlFor={USER_GENDER.FEMALE}>Female</Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <RadioGroupItem
                      value={USER_GENDER.UNDEFINED}
                      id={USER_GENDER.UNDEFINED}
                    />
                    <Label htmlFor={USER_GENDER.UNDEFINED}>Undefined</Label>
                  </div>
                </RadioGroup>
                {form.formState.errors.gender && (
                  <p className="mt-1 text-sm text-red-600">
                    {form.formState.errors.gender.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Date of Birth
                </label>
                <div className="flex space-x-4 mt-1 pr-10">
                  <div className="block w-1/3 border-gray-300 rounded-none shadow-sm">
                    <Select
                      {...form.register("dateOfBirth.day")}
                      defaultValue={new Date(session?.user?.birthDate as string)
                        .getUTCDate()
                        .toString()}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Day" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Days</SelectLabel>
                          {[...Array(31)].map((_, i) => (
                            <SelectItem key={i} value={(i + 1).toString()}>
                              {i + 1}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="block w-1/3 border-gray-300 rounded-none shadow-sm">
                    <Select
                      {...form.register("dateOfBirth.month")}
                      defaultValue={(
                        new Date(
                          session?.user?.birthDate as string
                        ).getUTCMonth() + 1
                      ).toString()}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Month" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Months</SelectLabel>
                          {[
                            "1",
                            "2",
                            "3",
                            "4",
                            "5",
                            "6",
                            "7",
                            "8",
                            "9",
                            "10",
                            "11",
                            "12",
                          ].map((month) => (
                            <SelectItem key={month} value={month}>
                              {month}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="block w-1/3 border-gray-300 rounded-none shadow-sm">
                    <Select
                      {...form.register("dateOfBirth.year")}
                      defaultValue={new Date(session?.user?.birthDate as string)
                        .getUTCFullYear()
                        .toString()}
                    >
                      <SelectTrigger className="w-[100px]">
                        <SelectValue placeholder="Year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Years</SelectLabel>
                          {Array.from({ length: 100 }, (_, i) => 1920 + i).map(
                            (year) => (
                              <SelectItem key={year} value={year.toString()}>
                                {year}
                              </SelectItem>
                            )
                          )}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
            <Button
              type="submit"
              className="w-full h-12 mt-4 rounded-none bg-blue-600 text-white"
            >
              Save
            </Button>

            {notification && (
              <p className="mt-2 text-red-500 text-sm">{notification}</p>
            )}
          </form>
        </Form>
      </div>
    </div>
  );
}
