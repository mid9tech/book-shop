"use client";

import * as React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { RequireSendResetPasswordService } from "@/+core/services";
import { ToastAction } from "@radix-ui/react-toast";
import { useToast } from "@/components/ui/use-toast";

export default function Reset() {
  const { toast } = useToast();
  const [email, setEmail] = useState("");

  const requireSendResetPassword = async () => {
    const { errors } = await RequireSendResetPasswordService(email);

    if (errors) {
      return toast({
        variant: "destructive",
        title: "Cannot send reset password email, something went wrong!",
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    return toast({
      variant: "default",
      title: "Success send email!",
      description: "We are already send email, please check your email!",
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
  };

  return (
    <Card className="w-[400px] h-[300px] ml-10 rounded-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Email Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid w-full items-center gap-3">
          <div className="flex flex-col space-y-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              className="rounded-none h-12"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col">
        <Button
          onClick={requireSendResetPassword}
          className="w-full mb-3 h-12 rounded-none"
        >
          Send Email
        </Button>

        <Link className="hover:text-blue-700" href="/login">
          Back to Sign in?
        </Link>
      </CardFooter>
    </Card>
  );
}
