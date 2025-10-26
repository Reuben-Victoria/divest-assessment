import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outlined" | "danger" | "ghost" | 'default';
  size?: "small" | "medium" | "large";
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  fullWidth?: boolean;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = "primary",
  size = "medium",
  icon,
  iconPosition = "left",
  fullWidth = false,
  children,
  disabled = false,
  className = "",
  ...props
}) => {
  const buttonClass = [
    "button",
    `button--${variant}`,
    `button--${size}`,
    fullWidth ? "button--fullWidth" : "",
    disabled ? "button--disabled" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={buttonClass} disabled={disabled} {...props}>
      {icon && iconPosition === "left" && (
        <span className="button__icon">{icon}</span>
      )}
      <span className="button__text">{children}</span>
      {icon && iconPosition === "right" && (
        <span className="button__icon">{icon}</span>
      )}
    </button>
  );
};

export default Button;
