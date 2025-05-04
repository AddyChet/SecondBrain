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

  const variantClass = variant === "default" ? "text-black bg-white hover:text-button-500" : "";

  const sizeClass =
    size === "sm"
      ? "px-2 py-1 text-sm"
      : size === "md"
      ? "px-4 py-2 text-base"
      : size === "lg"
      ? "px-6 py-3 text-lg"
      : "px-2 py-1 text-sm";

  return (
    <button className={`${variantClass} ${sizeClass} ${className} flex items-center justify-center gap-3 cursor-pointer`} onClick={onClick}>
      {startIcon} {text}
    </button>
  );
};
