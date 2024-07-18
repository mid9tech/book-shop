export interface NotificationType {
  id: number;
  type: "success" | "info" | "warning" | "error";
  title: string;
  message: string;
  autoClose?: boolean;
  duration?: number;
}

export interface NotificationProps {
  notification: NotificationType;
  onClose: (id: number) => void;
}
