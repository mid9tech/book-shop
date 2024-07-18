import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";

type AlertType = "success" | "fail";

interface CustomAlertDialogProps {
  type: AlertType;
  message: string;
  onClose: () => void;
}

function CustomAlertDialog({ type, message, onClose }: CustomAlertDialogProps) {
  const title = type === "success" ? "Success" : "Failure";
  const description =
    message ||
    (type === "success"
      ? "Operation completed successfully."
      : "An error occurred. Please try again.");

  return (
    <AlertDialog open onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <div className="flex flex-col items-center justify-center">
            {type === "success" ? (
              <FaCheckCircle className="text-green-500 text-6xl" />
            ) : (
              <FaTimesCircle className="text-red-500 text-6xl" />
            )}
            <AlertDialogTitle className="mt-4">{title}</AlertDialogTitle>
            <AlertDialogDescription className="mt-2 text-center">
              {description}
            </AlertDialogDescription>
          </div>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction asChild>
            <Button onClick={onClose}>Close</Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default CustomAlertDialog;
