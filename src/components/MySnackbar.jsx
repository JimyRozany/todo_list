import { forwardRef } from "react";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useToast } from "../contexts/ToastContext";
// import { SnackbarContext } from "../contexts/SnackbarContext";
// import { SnackbarContext } from "../contexts/SnackbarContext";
// import { useSnackbar } from "../contexts/SnackbarContext";

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MySnackbar() {
  const { open, message } = useToast();
  return (
    <div>
      <Snackbar open={open} autoHideDuration={6000}>
        <Alert
          style={{ fontSize: "25px" }}
          severity="success"
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
    </div>
  );
}
