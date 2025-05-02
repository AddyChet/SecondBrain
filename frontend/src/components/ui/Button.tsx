import React from "react";

export interface ButtonProps {
  variant: "primary" | "secondary";
  size: "sm" | "md" | "lg";
  text: string;
  startIcon?: React.ReactNode;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = (props) => {
  const { variant, size, text, startIcon, onClick } = props;

  const variantClass =
    variant === "primary"
      ? "bg-button-600 text-white"
      : "bg-button-300 text-button-500";

  const sizeClass =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-base"
      : size === "lg" 
      ? "px-6 py-3 text-lg" : "px-2 py-1 text-sm";

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
