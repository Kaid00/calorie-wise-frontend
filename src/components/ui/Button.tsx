import { forwardRef } from "react";

type baseButtonAttributes = React.ComponentPropsWithoutRef<"button">;
type Ref = HTMLButtonElement;

interface ButtonProps extends baseButtonAttributes {
  disabled?: boolean;
  className?: string;
}

const Button = forwardRef<Ref, ButtonProps>((props, ref) => {
  const { type = "button", children, disabled, className, ...rest } = props;

  return (
    <button
      className={className}
      {...rest}
      type={type}
      ref={ref}
      disabled={disabled}
    >
      {children}
    </button>
  );
});

Button.displayName = "Button";
export default Button;
