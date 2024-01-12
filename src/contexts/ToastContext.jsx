import { createContext, useContext, useState } from "react";
import MySnackbar from "../components/MySnackbar";

export const ToastContext = createContext({});

export const ToastProvider = ({ children }) => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");

  const showHideToast = (message) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
  };

  return (
    <ToastContext.Provider value={{ showHideToast, open, message }}>
      {children}
      <MySnackbar />
    </ToastContext.Provider>
  );
};

export const useToast = () => {
  return useContext(ToastContext);
};
