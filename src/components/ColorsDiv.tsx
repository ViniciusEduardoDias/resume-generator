type PropsColorsDiv = {
  color: string;
  onclick: (color: string) => void;
};

const bgColors: Record<string, string> = {
  yellow: "bg-yellow-300",
  gray: "bg-gray-300",
  pink: "bg-pink-300",
  blue: "bg-blue-300",
  green: "bg-green-300",
};

function ColorsDiv({ color, onclick }: PropsColorsDiv) {
  const bgColorClass = bgColors[color] || "bg-gray-400";

  return (
    <div
      className={`w-[60px] h-[40px] rounded-full ${bgColorClass} hover:scale-110 transition cursor-pointer`}
      onClick={() => onclick(color)}
    ></div>
  );
}

export default ColorsDiv;
