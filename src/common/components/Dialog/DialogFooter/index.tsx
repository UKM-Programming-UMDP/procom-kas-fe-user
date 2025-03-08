import { ActionButton } from "@components/Button";
import { DialogActions } from "@mui/material";
import clsx from "clsx";

interface Props {
  children?: React.ReactNode;
  className?: string;
  onCancel?: () => void;
  cancelLabel?: string;
}
function DialogFooter(props: Props): JSX.Element {
  const { children, className, onCancel, cancelLabel = "Cancel" } = props;

  return (
    <DialogActions
      sx={{
        backgroundColor: "#323232",
        borderTop: "1px solid #55555590"
      }}
    >
      <div className={clsx("flex gap-2", className)}>
        {onCancel ? (
          <ActionButton
            label={cancelLabel}
            onClick={onCancel}
            variant="outlined"
          />
        ) : null}
        {children}
      </div>
    </DialogActions>
  );
}

export default DialogFooter;
