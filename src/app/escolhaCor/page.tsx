"use client";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import { modelComponents } from "@/models/pdfModels";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ColorsDiv from "@/components/ColorsDiv";
import CardModel from "@/components/CardModel";
import { useFormData } from "@/hooks/useFormData";

// Array modelos movido para fora do componente
const modelos = [
  { id: "modelo1", nome: "Clássico", imagem: "/previews/modelo1.jpg" },
  { id: "modelo2", nome: "Moderno", imagem: "/previews/modelo2.jpg" },
];

const ColorPage = () => {
  const { clear, get, update } = useFormData();
  const router = useRouter();
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedModel, setSelectedModel] = useState({ id: "", name: "" });
  const cores = ["yellow", "gray", "pink", "blue", "green", "black"];

  useEffect(() => {
    const formData = get();
    console.log("Dados recuperados:", formData);

    setSelectedColor(formData?.color || "");

    // Encontrar o modelo correspondente pelo ID
    const selectedModelo = modelos.find(
      (modelo) => modelo.id === formData?.modelo
    );
    setSelectedModel(
      selectedModelo
        ? { id: selectedModelo.id, name: selectedModelo.nome }
        : { id: "", name: "" }
    );
  }, [get]);

  const selectColor = (color: string) => {
    setSelectedColor(color);
    update({ color });
  };

  const selectModel = (modelId: string, modelName: string) => {
    setSelectedModel({ id: modelId, name: modelName });
    update({ modelo: modelId });
  };

  const createFile = async () => {
    const formData = get();

    if (!formData || Object.keys(formData).length === 0) {
      alert("Preencha os dados antes de gerar o currículo!");
      return;
    }

    if (!formData.modelo) {
      alert("Escolha um modelo antes de gerar o currículo!");
      return;
    }

    const ModelComponent = modelComponents[formData.modelo];

    if (!ModelComponent) {
      alert("Modelo não encontrado!");
      return;
    }

    const docComponent = (
      <ModelComponent formData={formData} color={formData.color || "gray"} />
    );
    const blob = await pdf(docComponent).toBlob();
    saveAs(
      blob,
      `${formData.dadosPessoais?.nome || "curriculo"}_curriculo.pdf`
    );

    console.log(formData);
    clear();
    setTimeout(() => router.push("/successPage"), 1000);
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

        <div className="flex gap-4 flex-wrap">
          {cores.map((color) => (
            <div
              key={color}
              className="flex flex-col items-center gap-2 cursor-pointer"
              onClick={() => selectColor(color)}
            >
              <ColorsDiv color={color} />
            </div>
          ))}
        </div>

        <p className="mt-4 text-gray-700">
          Cor selecionada: <strong>{selectedColor || "Nenhuma"}</strong>
        </p>
      </div>

      <div className="mt-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Escolha o modelo
        </h2>
        <div className="flex gap-6 flex-wrap">
          {modelos.map((modelo) => (
            <div
              key={modelo.id}
              onClick={() => selectModel(modelo.id, modelo.nome)}
              className="flex flex-col items-center gap-2 cursor-pointer"
            >
              <CardModel model={selectedModel.id} modelo={modelo} />
            </div>
          ))}
        </div>

        <p className="mt-4 text-gray-700">
          Modelo atual:{" "}
          <strong>{selectedModel.name || "Nenhum modelo selecionado"}</strong>
        </p>
      </div>

      <button
        className="mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        onClick={createFile}
      >
        Gerar PDF
      </button>
    </section>
  );
};

export default ColorPage;
