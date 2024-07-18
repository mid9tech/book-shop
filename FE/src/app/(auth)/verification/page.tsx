"use client";

import { RequireSendVerification, Verify } from "@/+core/services";
import { Button } from "@/components/ui/button";
import CustomAlertDialog from "@/components/ui/custom-dialog";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import Spinner from "@/components/ui/spinner";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { BsSend } from "react-icons/bs";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

export default function Verification() {
  const { data: session, status } = useSession();
  const [otp, setOtp] = useState<string>();
  const [isLoading, setIsLoading] = useState<boolean>();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogType, setDialogType] = useState<"success" | "fail">("success");
  const [dialogMessage, setDialogMessage] = useState("");
  const { toast } = useToast();

  if (status === "loading") {
    return <Spinner size={80} />;
  } else if (status === "unauthenticated") {
    window.location.href = "/";
  }

  const handleClose = () => {
    setDialogOpen(false);
  };

  const showDialog = (type: "success" | "fail", message: string) => {
    setDialogType(type);
    setDialogMessage(message);
    setDialogOpen(true);
  };

  async function verifyAccount() {
    setIsLoading(true);

    const { data, errors } = await Verify(
      otp as string,
      session?.accessToken as string
    );

    if (errors) {
      return showDialog(
        "fail",
        "Cannot verify your account, please try again."
      );
    }

    setIsLoading(false);
    showDialog("success", "Your account has been verified.");
  }

  async function requireSendVerification() {
    const { data, errors } = await RequireSendVerification(
      session?.accessToken as string
    );

    if (errors) {
      return toast({
        variant: "destructive",
        title: "Can not send verification email",
        description: new Date().toDateString(),
        action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
      });
    }

    toast({
      variant: "default",
      title: "We hav sent email verification",
      description: new Date().toDateString(),
      action: <ToastAction altText="Goto schedule to undo">Undo</ToastAction>,
    });
  }

  return (
    <div className="rounded-none flex flex-col relative text-center border bg-inherit justify-center p-4">
      <h2 className="text-2xl mb-10">
        Enter the OTP here to verify your account:{" "}
      </h2>

      <div className="align-middle ml-[15%]">
        <InputOTP maxLength={6} value={otp} onChange={setOtp}>
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
          </InputOTPGroup>
          <InputOTPSeparator />
          <InputOTPGroup>
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>

      <div>
        {isLoading ? (
          <div className="p-4">
            <Spinner size={30} />
          </div>
        ) : (
          <Button
            onClick={() => verifyAccount()}
            className="rounded-none text-xl h-10 p-4 mt-10"
          >
            Verify <BsSend className="ml-4" />
          </Button>
        )}
      </div>

      <p className="mt-4">
        You are not receive email?{" "}
        <a
          onClick={() => requireSendVerification()}
          className="hover:cursor-pointer hover:text-blue-500 "
        >
          Click here
        </a>
      </p>

      {dialogOpen && (
        <CustomAlertDialog
          type={dialogType}
          message={dialogMessage}
          onClose={handleClose}
        />
      )}
    </div>
  );
}
