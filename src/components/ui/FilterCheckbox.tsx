"use client";

import { useState } from "react";

interface CheckboxOption {
  value: string;
  label: string;
  checked?: boolean;
}

interface FilterCheckboxProps {
  title?: string;
  options?: CheckboxOption[];
  onChange?: (selectedValues: string[]) => void;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  title = "Filter by status",
  options: initialOptions = [
    { value: "draft", label: "Draft", checked: false },
    { value: "pending", label: "Pending", checked: false },
    { value: "paid", label: "Paid", checked: false },
  ],
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [options, setOptions] = useState<CheckboxOption[]>(initialOptions);

  const handleCheckboxChange = (value: string) => {
    const updatedOptions = options.map((option) =>
      option.value === value ? { ...option, checked: !option.checked } : option
    );

    setOptions(updatedOptions);

    if (onChange) {
      const selectedValues = updatedOptions
        .filter((opt) => opt.checked)
        .map((opt) => opt.value);
      onChange(selectedValues);
    }
  };

  return (
    <div className="filter-checkbox">
      <button
        type="button"
        className={`filter-checkbox__trigger heading-s-v ${
          isOpen ? "filter-checkbox__trigger--active" : ""
        }`}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="filter-checkbox__trigger-text">{title}</span>
        <svg
          className={`filter-checkbox__trigger-icon ${
            isOpen ? "filter-checkbox__trigger-icon--rotated" : ""
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
        <div className="filter-checkbox__dropdown">
          {options.map((option) => (
            <label key={option.value} className="filter-checkbox__option">
              <input
                type="checkbox"
                className="filter-checkbox__input"
                checked={option.checked}
                onChange={() => handleCheckboxChange(option.value)}
              />
              <span className="filter-checkbox__checkmark">
                {option.checked && (
                  <svg
                    width="10"
                    height="8"
                    viewBox="0 0 10 8"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M1 4L3.5 6.5L9 1" stroke="white" strokeWidth="2" />
                  </svg>
                )}
              </span>
              <span className="filter-checkbox__label heading-s-v">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterCheckbox;
