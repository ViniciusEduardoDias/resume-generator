type PropsColorsDiv = {
  color: string;
  onclick: (color: string) => void;
};

function ColorsDiv({ color, onclick }: PropsColorsDiv) {
  return (
    <div
      className={`w-[30px] h-[30px] rounded-full bg-${color}-500 hover:scale-110 transition cursor-pointer`}
      onClick={() => onclick(color)}
    ></div>
  );
}

export default ColorsDiv;
