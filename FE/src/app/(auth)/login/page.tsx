"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import Link from "next/link";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Checkbox } from "@/components/ui/checkbox";
import { signIn } from "next-auth/react";
import { useState } from "react";
import Spinner from "@/components/ui/spinner";

const formSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters",
  }),
  isRememberMe: z.boolean(),
});

export default function LoginForm() {
  const [notification, setNotification] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      isRememberMe: false,
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);

    const result = await signIn("credentials", {
      email: values.email,
      password: values.password,
      isRememberMe: values.isRememberMe,
      redirect: false,
    });

    if (result?.error) {
      setNotification(result.error);
    } else {
      window.location.href = "/";
    }

    setIsLoading(false);
  }

  return (
    <Card className="w-[400px] h-[550px] ml-10 rounded-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Sign In</CardTitle>
      </CardHeader>
      <CardContent>
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
              name="isRememberMe"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center space-x-2 mt-2">
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      id="isRememberMe"
                    />
                    <label
                      htmlFor="isRememberMe"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Remember Me
                    </label>
                  </div>
                </FormItem>
              )}
            />

            <p className="mt-2 text-red-500 text-sm">{notification}</p>

            {isLoading ? (
              <Button
                type="button"
                className="w-full mb-3 h-12 rounded-none mt-2"
              >
                <Spinner size={30} />
              </Button>
            ) : (
              <Button
                type="submit"
                className="w-full mb-3 h-12 rounded-none mt-2"
              >
                Sign In
              </Button>
            )}
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex flex-col mt-[-25px]">
        <Link href="/reset" className="hover:text-blue-700">
          Forgot password?
        </Link>
        <div className="flex mb-3">
          <hr className="w-[10rem] mt-3 mr-1" />
          Or
          <hr className="w-[10rem] mt-3 ml-1" />
        </div>
        <Button className="w-full h-12 mb-3 rounded-none">Google</Button>
        <p>
          Don't have an account?{" "}
          <Link className="hover:text-blue-700" href="/register">
            Sign up
          </Link>
        </p>
      </CardFooter>
    </Card>
  );
}


