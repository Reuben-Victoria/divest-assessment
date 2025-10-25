import React, { useState } from "react";

interface TextInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  error,
  helperText,
  fullWidth = false,
  className = "",
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = props.value && props.value.toString().length > 0;

  const containerClass = [
    "textinput",
    fullWidth ? "textinput--fullWidth" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const inputClass = [
    "textinput__input",
    isFocused ? "textinput__input--active" : "",
    hasValue ? "textinput__input--filled" : "",
    error ? "textinput__input--error" : "",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={containerClass}>
      {label && <label className="textinput__label">{label}</label>}
      <input
        className={inputClass}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        {...props}
      />
      {error && <span className="textinput__error">{error}</span>}
      {helperText && !error && (
        <span className="textinput__helper">{helperText}</span>
      )}
    </div>
  );
};

export default TextInput;