"use client";

import { ReactNode } from "react";

type ButtonProps = {
  text: string;
  onClick: () => void;
  className?: string;
  children?: ReactNode;
};

function Button({ text, onClick, className, children }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`w-fit py-2 px-4 bg-yellow-500 text-white hover:bg-yellow-600 rounded-md ${className}`}
    >
      {children}
      {text}
    </button>
  );
}

export default Button;
