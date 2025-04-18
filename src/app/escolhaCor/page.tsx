"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ColorsDiv from "@/components/ColorsDiv";

const ColorPage = () => {
  const router = useRouter();
  const [color, setColor] = useState("");

  const changeColor = (newColor: string) => {
    setColor(newColor);
  };

  const createFile = () => {
    console.log("Cor selecionada:", color);
    // Aqui você pode redirecionar ou salvar a cor junto ao restante dos dados
    router.push("/");
  };

  const cores = ["yellow", "gray", "pink", "blue", "green"];

  return (
    <section className="w-full mt-6 p-6 mx-auto bg-white rounded-xl shadow-md">
      <div className="flex flex-col gap-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            Paleta de Cores
          </h2>
          <p className="text-gray-500">
            Selecione a paleta de cor para montar seu currículo
          </p>
        </div>
        <div className="flex gap-2">
          {cores.map((c) => (
            <ColorsDiv key={c} color={c} onclick={changeColor} />
          ))}
        </div>
      </div>
      <p className="mt-4 text-gray-700">
        Cor atual: <strong>{color}</strong>
      </p>
      <button
        className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        onClick={createFile}
      >
        Gerar PDF
      </button>
    </section>
  );
};

export default ColorPage;
