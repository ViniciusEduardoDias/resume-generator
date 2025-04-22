"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ColorsDiv from "@/components/ColorsDiv";
import CardModel from "@/components/CardModel";

const ColorPage = () => {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const cores = ["yellow", "gray", "pink", "blue", "green"];

  const modelos = [
    { id: "modelo1", nome: "Clássico", imagem: "/previews/modelo1.jpg" },
    { id: "modelo2", nome: "Moderno", imagem: "/previews/modelo2.jpg" },
  ];

  const changeColor = (newColor: string) => {
    setColor(newColor);
  };

  const changeModel = (newModel: string) => {
    setModel(newModel);
  };

  const createFile = () => {
    console.log("Cor selecionada:", color);
    console.log("modelo selecionado", model);
    console.log(localStorage.getItem("FormData"));

    router.push("/");
  };

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
        <p className="mt-4 text-gray-700">
          Cor atual: <strong>{color}</strong>
        </p>
      </div>
      <div className="mt-5">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Escolha o modelo
        </h2>
        <div className="flex gap-4 flex-wrap">
          {modelos.map((modelo) => (
            <CardModel
              key={modelo.id}
              model={model}
              onclick={changeModel}
              modelo={modelo}
            />
          ))}
        </div>
      </div>

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
