import { Button, CircularProgress } from "@mui/material";

interface Props {
  onClick?: () => void;
  disabledLoading?: boolean;
  submitLoading?: boolean;
  icon?: React.ReactNode;
  label: string;
  variant?: "contained" | "outlined";
  size?: "small" | "medium" | "large";
  color?: "primary" | "inherit" | "secondary";
  className?: string;
  autoFocus?: boolean;
}
function ActionButton(props: Props): JSX.Element {
  const {
    onClick,
    disabledLoading,
    submitLoading,
    icon,
    label,
    variant = "contained",
    size = "small",
    color = "inherit",
    className,
    autoFocus
  } = props;

  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      disabled={disabledLoading || submitLoading}
      size={size}
      className={className}
      autoFocus={autoFocus || false}
      disableRipple
    >
      {submitLoading ? (
        <CircularProgress size={20} />
      ) : (
        <div className="flex items-center gap-2">
          {icon}
          <span>{label}</span>
        </div>
      )}
    </Button>
  );
}

export default ActionButton;
