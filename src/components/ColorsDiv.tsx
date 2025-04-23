interface Props {
  color: string;
}

const ColorsDiv = ({ color }: Props) => {
  return (
    <div
      className={`w-12 h-12 rounded-full cursor-pointer border-2`}
      style={{ backgroundColor: color }}
    />
  );
};

export default ColorsDiv;
