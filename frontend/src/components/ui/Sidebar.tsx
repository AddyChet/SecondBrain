import React from "react";

export interface SideBarButton {
  variant: "default";
  startIcon: React.ReactElement;
  text: string;
  size: "sm" | "md" | "lg";
  className: string;
  onClick: () => void;
}

export const SideBarButton : React.FC<SideBarButton> = (props) => {
  const { variant, startIcon, text, size, onClick, className } = props;

  const variantClass = variant === "default" ? "text-black bg-white hover:text-button-500 hover:shadow-lg rounded-lg shadow-button-300 " : "";

  const sizeClass =
    size === "sm"
      ? "px-3 py-2 text-sm"
      : size === "md"
      ? "px-4 py-4 text-base"
      : size === "lg"
      ? "px-7 py-4 text-lg"
      : "px-3 py-2 text-sm";

  return (
    <button className={` flex items-center justify-start gap-3 cursor-pointer w-full ${variantClass} ${sizeClass} ${className} transition-all duration-300 ease-in-out`} onClick={onClick}>
      {startIcon} {text}
    </button>
  );
};
