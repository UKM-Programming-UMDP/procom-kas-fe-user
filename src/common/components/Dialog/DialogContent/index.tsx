import { DialogContent as MUIDialogContent } from "@mui/material";
import clsx from "clsx";

interface Props {
  children: React.ReactNode;
  className?: string;
}
function DialogContent(props: Props): JSX.Element {
  const { children, className } = props;

  return (
    <MUIDialogContent
      sx={{
        padding: "0.8rem 1.2rem"
      }}
    >
      <div className={clsx("pt-[0.8rem]", className)}>{children}</div>
    </MUIDialogContent>
  );
}

export default DialogContent;
