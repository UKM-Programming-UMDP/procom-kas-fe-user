import { enqueueSnackbar } from "notistack";
import { errMessage } from "@utils/snackbar";
import { APIResponse } from "@types";
import { MaterialDesignContent } from "notistack";
import { styled } from "@mui/material";

export const StyledMaterialDesignContent = styled(MaterialDesignContent)(
  () => ({
    "&.notistack-MuiContent-error": {
      background:
        "linear-gradient(to bottom right, rgb(215, 17, 0), rgb(255, 89, 54))",
      opacity: "0.95",
    },
  }),
);

export const errNotification = (message: APIResponse<object>) => {
  enqueueSnackbar(errMessage(message), {
    variant: "error",
    anchorOrigin: {
      vertical: "top",
      horizontal: "right",
    },
    preventDuplicate: true,
    autoHideDuration: 2000,
  });
};
