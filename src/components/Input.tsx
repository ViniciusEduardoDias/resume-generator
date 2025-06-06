import React from "react";

type InputProps = {
  text?: string;
  type: string;
  name: string;
  placeholder?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  required?: boolean;
  min?: number;
};

export default function Input({
  text,
  type,
  name,
  placeholder,
  onChange,
  value,
  required = false,
}: InputProps) {
  return (
    <div>
      {text && (
        <label className="w-full text-xs text-slate-600 font-semibold">
          {text}
        </label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
        required={required}
      />
    </div>
  );
}
