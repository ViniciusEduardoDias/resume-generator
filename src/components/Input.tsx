type InputProps = {
  text?: string;
  type: string;
  name: string;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string | number;
  required: boolean;
};

export default function Input({
  text,
  type,
  name,
  placeholder,
  onChange,
  value,
}: InputProps) {
  return (
    <div>
      {text && (
        <label className="text-xs text-slate-600 font-semibold">{text}</label>
      )}
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="input"
        required
      />
    </div>
  );
}
