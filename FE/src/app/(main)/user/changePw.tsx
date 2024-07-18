"use client";

import { useState } from "react";
import { ChangePasswordInput } from "@/+core/interfaces";
import { ChangePasswordService } from "@/+core/services";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import Spinner from "@/components/ui/spinner";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { z } from "zod";

const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long");

export default function ChangePasswordPage() {
  const { data: session } = useSession();
  const { toast } = useToast();

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const changePassword = async () => {
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

    const input: ChangePasswordInput = {
      currentPassword,
      newPassword,
    };

    const { errors } = await ChangePasswordService(
      session?.accessToken as string,
      input
    );

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
    <div>
      <Card className="w-[400px] h-auto ml-10 pt-6 rounded-none">
        <CardContent>
          <Label htmlFor="currentPassword">Current Password</Label>
          <Input
            id="currentPassword"
            type="password"
            className="rounded-none h-12"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />

          <Label htmlFor="newPassword">New Password</Label>
          <Input
            id="newPassword"
            className="rounded-none h-12"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />

          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            id="confirmPassword"
            className="rounded-none h-12"
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </CardContent>
        <CardFooter>
          {isLoading ? (
            <Spinner size={20} />
          ) : (
            <Button
              className="w-full mb-3 h-12 rounded-none"
              onClick={changePassword}
            >
              Change password
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
