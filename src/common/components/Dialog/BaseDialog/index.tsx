import { Dialog, DialogTitle } from "@mui/material";

interface Props {
  open: boolean;
  onClose: () => void;
  title?: string;
  children: React.ReactNode;
  width?: number;
}
function BaseDialog(props: Props): JSX.Element {
  const { open, onClose, title, children, width = 360 } = props;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      PaperProps={{
        style: {
          width: width,
          borderRadius: 10,
          backgroundColor: "#373737",
          color: "white",
          userSelect: "text"
        }
      }}
      disableRestoreFocus={true}
    >
      {title ? (
        <DialogTitle
          fontSize="0.9rem"
          sx={{
            padding: "0.8rem 1.2rem",
            backgroundColor: "#323232",
            borderBottom: "1px solid #55555590"
          }}
        >
          {title}
        </DialogTitle>
      ) : null}
      {children}
    </Dialog>
  );
}

export default BaseDialog;
