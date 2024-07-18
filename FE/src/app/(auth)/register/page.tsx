"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import { z } from "zod";
import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SignUp } from "@/+core/services";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import Spinner from "@/components/ui/spinner";

function AlertDialogReturnToLogin({ onClose }: { onClose: () => void }) {
  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Success Sign Up</AlertDialogTitle>
          <AlertDialogDescription>
            Congratulations, you have successfully registered, please log in.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Link href="/login">
              <Button onClick={onClose}>Go to Sign In</Button>
            </Link>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

const formSchema = z
  .object({
    email: z.string().email({
      message: "Please enter a valid email address",
    }),
    password: z.string().min(8, {
      message: "Password must be at least 8 characters",
    }),
    confirmPassword: z.string().min(8, {
      message: "Confirm Password must be at least 8 characters",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export default function Register() {
  const [notification, setNotification] = useState<string>("");
  const [isShowDialog, setIsShowDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    try {
      const { data, errors } = await SignUp(values.email, values.password);

      if (errors) {
        setNotification(errors[0]?.message);
      } else {
        setIsShowDialog(true);
      }
    } catch (error: any) {
      setNotification(error.message);
    }

    setIsLoading(false);
  }

  return (
    <Card className="w-[400px] h-[580px] ml-10 rounded-none">
      {isShowDialog && (
        <AlertDialogReturnToLogin onClose={() => setIsShowDialog(false)} />
      )}
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Sign Up</CardTitle>
      </CardHeader>
      <CardContent className="mt-[-20px]">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="email"
                      className="rounded-none h-12"
                      placeholder="Enter your email"
                      type="email"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="password"
                      type="password"
                      className="rounded-none h-12"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="confirmPassword"
                      type="password"
                      className="rounded-none h-12"
                      placeholder="Enter your password"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <p className="mt-2 text-red-500 text-sm">{notification}</p>

            {isLoading ? (
              <Button type="button" className="w-full h-12 rounded-none">
                <Spinner size={30} />
              </Button>
            ) : (
              <Button type="submit" className="w-full h-12 rounded-none">
                Sign Up
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col mt-[-15px]">
        <div className="flex mb-3">
          <hr className="w-[10rem] mt-3 mr-1" />
          Or
          <hr className="w-[10rem] mt-3 ml-1" />
        </div>
        <Button className="w-full h-12 mb-3 rounded-none">Google</Button>
        <p>
          Already had account?
          <Link className="hover:text-blue-700" href="/login">
            Sign in
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}
