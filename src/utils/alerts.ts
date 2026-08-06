import { Store } from "react-notifications-component";
import "animate.css/animate.min.css";

export function alerts(title: string, message: string, type: "success" | "warning" | "info" | "danger"): void {
  Store.addNotification({
    title,
    message,
    type,
    insert: "bottom",
    container: "bottom-right",
    animationIn: ["animate__animated", "animate__fadeIn"],
    animationOut: ["animate__animated", "animate__fadeOut"],
    dismiss: {
      duration: 3000,
    },
  });
}