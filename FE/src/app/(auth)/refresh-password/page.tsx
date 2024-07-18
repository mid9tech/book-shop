"use client";

import { RefreshPasswordInput } from "@/+core/interfaces";
import { RefreshPasswordService } from "@/+core/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Spinner from "@/components/ui/spinner";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@radix-ui/react-label";
import { ToastAction } from "@radix-ui/react-toast";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { z } from "zod";
import Link from "next/link";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");

export default function RefreshPasswordPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const params = useSearchParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const refreshPassword = async () => {
    setIsLoading(true);

    try {
      passwordSchema.parse(newPassword);
    } catch (error: any) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Invalid Password",
        description: error.errors[0].message,
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    if (newPassword !== confirmPassword) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Passwords do not match",
        description: "Please make sure your new passwords match.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    const input: RefreshPasswordInput = {
      id: params.get("id") as string,
      password: newPassword,
      token: params.get("token") as string,
    };

    const { errors } = await RefreshPasswordService(input);

    if (errors) {
      setIsLoading(false);
      return toast({
        variant: "destructive",
        title: "Cannot change your password, something went wrong!",
        description: new Date().toDateString(),
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    }

    toast({
      variant: "default",
      title: "Successfully changed your password",
      description: new Date().toDateString(),
      action: <ToastAction altText="Close">Close</ToastAction>,
    });
    setIsLoading(false);
  };

  return (
    <Card className="w-[400px] h-auto ml-10 rounded-none">
      <CardHeader className="text-center">
        <CardTitle className="text-3xl">Reset Password</CardTitle>
      </CardHeader>
      <CardContent>
        <div>
          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            type="password"
            className="rounded-none h-12"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            type="password"
            className="rounded-none h-12"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
      </CardContent>
      <CardFooter className="flex  flex-col">
        {isLoading ? (
          <Spinner size={20} />
        ) : (
          <Button
            className="w-full mb-3 h-12 rounded-none"
            onClick={refreshPassword}
          >
            Refresh Password
          </Button>
        )}

        <Link className="hover:text-blue-700" href="/login">
          Back to Sign in?
        </Link>
      </CardFooter>
    </Card>
  );
}
