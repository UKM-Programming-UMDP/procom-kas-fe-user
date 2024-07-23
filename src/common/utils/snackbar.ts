import { APIResponse } from "@types";
import { enqueueSnackbar } from "notistack";
import { SnackbarType } from "@types";

export function errMessage(err: APIResponse<object>): string {
  if (err?.message) {
    return err.message;
  } else {
    return "An error occurred.";
  }
}

type enqueueSnackbar = {
  variant: SnackbarType;
};

export const snackbar = {
  error: (message: string) => {
    enqueueSnackbar(message, {
      variant: "error",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      preventDuplicate: true,
      autoHideDuration: 2000,
      style: {
        background: "linear-gradient(rgb(215, 17, 0), rgb(255, 89, 54))",
        opacity: "0.95",
      },
    });
  },

  success: (message: string) => {
    enqueueSnackbar(message, {
      variant: "success",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      preventDuplicate: true,
      autoHideDuration: 2000,
      style: {
        background:
          "linear-gradient(rgb(12, 255, 12), rgb(65, 194, 0), rgb(0, 218, 191))",
        opacity: "0.85",
      },
    });
  },
  info: (message: string) => {
    enqueueSnackbar(message, {
      variant: "info",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      preventDuplicate: true,
      autoHideDuration: 2000,
      style: {
        background:
          "linear-gradient(rgb(49, 121, 255), rgb(100, 154, 255), rgb(91, 59, 255))",
        opacity: "0.85",
      },
    });
  },
  warning: (message: string) => {
    enqueueSnackbar(message, {
      variant: "warning",
      anchorOrigin: {
        vertical: "top",
        horizontal: "right",
      },
      preventDuplicate: true,
      autoHideDuration: 2000,
      style: {
        background:
          "linear-gradient(rgb(203, 129, 0), rgb(214, 145, 25), rgb(198, 185, 14))",
        opacity: "0.95",
      },
    });
  },
};
