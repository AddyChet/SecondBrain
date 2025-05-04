import React from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactElement;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant, size, text, startIcon, onClick } = props;

  const variantClass =
    variant === "primary"
      ? "bg-button-600 text-white hover:bg-button-700 hover:shadow-lg transition-all duration-500 ease-in-out"
      : "bg-button-300 text-button-500 hover:bg-button-400 hover:text-button-600 hover:shadow-md transition-all duration-500 ease-in-out";

  const sizeClass =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-base"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-2 py-1 text-sm";

  return (
    <button
      className={`${variantClass} ${sizeClass} flex items-center justify-center gap-2 rounded-lg cursor-pointer`}
      onClick={onClick}
    >
      {startIcon}
      {text}
    </button>
  );
};
