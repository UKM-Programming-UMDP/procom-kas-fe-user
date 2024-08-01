import { CircularProgress, Dialog } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
}
function LoadingDialog(props: Props): JSX.Element {
  const { open, onClose } = props;
  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: "fit-content",
          padding: "1rem",
          borderRadius: 10,
          backgroundColor: "#373737",
          color: "white",
          userSelect: "text"
        }
      }}
      disableRestoreFocus={true}
    >
      <CircularProgress sx={{ color: "white" }} />
    </Dialog>
  );
}

export default LoadingDialog;
