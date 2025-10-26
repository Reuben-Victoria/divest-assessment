"use client";
import { useState, useRef, useEffect } from "react";

interface DropdownOption {
  value: string;
  label: string;
}

interface DropdownProps {
  label?: string;
  options?: DropdownOption[];
  defaultValue?: string;
  fullWidth?: boolean;
  onChange?: (value: string ) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label = "Payment Terms",
  options = [
    { value: "net1", label: "Net 1 Day" },
    { value: "net7", label: "Net 7 Days" },
    { value: "net14", label: "Net 14 Days" },
    { value: "net30", label: "Net 30 Days" },
  ],
  defaultValue = "net30",
  fullWidth = false,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedValue, setSelectedValue] = useState<string>(defaultValue);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((opt) => opt.value === selectedValue);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (value: string): void => {
    setSelectedValue(value);
    setIsOpen(false);
    if (onChange) {
      onChange(value);
    }
  };

  return (
    <div
      className={`dropdown ${fullWidth ? "dropdown--fullWidth" : ""}`}
      ref={dropdownRef}
    >
      {label && <label className="dropdown__label">{label}</label>}

      <button
        type="button"
        className={`dropdown__trigger ${
          isOpen ? "dropdown__trigger--active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="dropdown__trigger-text">{selectedOption?.label}</span>
        <svg
          className={`dropdown__trigger-icon ${
            isOpen ? "dropdown__trigger-icon--rotated" : ""
          }`}
          width="11"
          height="7"
          viewBox="0 0 11 7"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L5.5 5.5L10 1" stroke="currentColor" strokeWidth="2" />
        </svg>
      </button>

      {isOpen && (
        <div className="dropdown__menu">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className={`dropdown__option ${
                selectedValue === option.value
                  ? "dropdown__option--selected"
                  : ""
              }`}
              onClick={() => handleSelect(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dropdown;
