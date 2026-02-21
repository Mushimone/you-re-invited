import { Button } from "@/components/ui/button";

const variants = [
  "default",
  "destructive",
  "outline",
  "secondary",
  "ghost",
  "link",
] as const;
type ButtonVariant = (typeof variants)[number];
interface IProps {
  variant?: ButtonVariant;
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
}
export function AppButton(props: IProps) {
  const {
    variant = "default",
    children,
    onClick,
    className,
    disabled,
    type,
  } = props;
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      variant={variant}
      className={className}
      type={type}
    >
      {children}
    </Button>
  );
}
