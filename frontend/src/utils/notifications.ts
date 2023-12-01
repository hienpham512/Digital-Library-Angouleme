import { toast } from "react-toastify";

export const successNotification = (message: string) => {
  toast.success(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const errorNotification = (message: string) => {
  toast.error(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};

export const warnNotification = (message: string) => {
  toast.warn(message, {
    position: toast.POSITION.TOP_RIGHT,
  });
};
