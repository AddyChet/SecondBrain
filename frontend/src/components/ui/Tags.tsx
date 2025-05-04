import React from "react";

export interface TagProps {
  variant: "primary";
  size: "default";
  text: string;
}

export const Tags: React.FC<TagProps> = (props) => {
  const { variant, size, text } = props;

  const variantClass =
    variant === "primary"
      ? "bg-button-300 text-button-500 hover:bg-button-400 hover:text-button-600 hover:shadow-sm transition-all duration-500 ease-in-out"
      : "";

  const sizeClass =
    size === "default"
      ? "px-4 py-1 text-sm" : ""

  return (
    <button
      className={`${variantClass} ${sizeClass} flex items-center justify-center gap-2 rounded-2xl cursor-pointer font-semibold`}
    >
      {text}
    </button>
  );
};
