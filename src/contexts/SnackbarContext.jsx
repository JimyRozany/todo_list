import { createContext, useState } from "react";
import MySnackbar from "../components/MySnackbar";


export const SnackbarContext = createContext({})


export const ToastProvider = ({childern}) => {

  const [open ,setOpen] = useState(false);
  const [message ,setMessage] = useState("");

const showHideSnackbar = (message) => {
    setMessage(message);
    setOpen(true);
    setTimeout(() => {
      setOpen(false);
    }, 2000);
}

  return (
    <SnackbarContext.Provider value={{
      showHideSnackbar ,
      open ,
      message
    }}>
      {childern}
    </SnackbarContext.Provider>
  );
}