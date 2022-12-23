import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notify = (toastId: any, message: string) => {
  toastId.current = toast(message, {
    autoClose: false,
    isLoading: true,
  });
};

export const update = (toastId: any, message: string) => {
  toast.update(toastId.current, {
    type: toast.TYPE.SUCCESS,
    autoClose: 3000,
    isLoading: false,
    render: message,
  });
};

export const ifErrorUpdate = (toastId: any, message: string) => {
  toast.update(toastId.current, {
    type: toast.TYPE.ERROR,
    autoClose: 5000,
    isLoading: false,
    render: message,
  });
};

export function toastOptions() {
  return {
    position: toast.POSITION.TOP_RIGHT,
    className: "text-sm font-Poppins",
  };
}
