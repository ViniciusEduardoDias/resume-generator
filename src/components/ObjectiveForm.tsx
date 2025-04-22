"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useFormData } from "@/hooks/useFormData";
import CharacterCounter from "./CharacterCounter";

export default function ObjectiveForm() {
  const router = useRouter();
  const [objetivo, setObjetivo] = useState("");
  const [perfil, setPerfil] = useState("");
  const { get, update } = useFormData();

  function formatText(text: string) {
    return text
      .trim()
      .replace(/\s+/g, " ") // remove espaços duplicados
      .replace(/\s*([.,;:!?])\s*/g, "$1 ") // adiciona espaço após pontuação
      .replace(/\. +([a-z])/g, (_, char) => `. ${char.toUpperCase()}`) // maiúscula após ponto
      .replace(/^./, (match) => match.toUpperCase()); // primeira letra maiúscula
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!objetivo.trim()) {
      alert("Por favor, escreva seu objetivo profissional.");
      return;
    }

    if (!perfil.trim()) {
      alert(
        "Por favor, escreva um pouco sobre você! Vamos fazer algo bem feito!"
      );
      return;
    }

    const objetivoFormatado = formatText(objetivo);
    const perfilFormatado = formatText(perfil);

    update({
      objetivoProfissional: {
        objetivoProfissional: objetivoFormatado,
        perfilPessoal: perfilFormatado,
      },
    });

    // Verificando se os dados foram atualizados corretamente
    const updatedData = get(); // Aqui, estamos pegando os dados atualizados
    console.log(updatedData); // Imprimindo o objeto atualizado

    router.push("/formacao");
  };

  return (
    <section className="max-w-2xl p-6 mx-auto bg-white rounded-xl shadow-md space-y-6">
      <h2 className="text-2xl font-bold text-gray-800">
        Objetivo Profissional
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <label htmlFor="objetivo" className="sr-only">
            Objetivo Profissional
          </label>
          <textarea
            id="objetivo"
            name="objetivo"
            placeholder="Descreva seu objetivo profissional..."
            value={objetivo}
            maxLength={700}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
              setObjetivo(e.target.value)
            }
            className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
          <CharacterCounter count={objetivo.length} max={700} />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Perfil Pessoal
          </h2>
          <h3 className="text-sm text-gray-600 mb-2">
            Nessa etapa, digite um texto falando sobre sua trajetória e o que
            conseguiu desenvolver.
          </h3>
          <div className="relative">
            <label htmlFor="perfil" className="sr-only">
              Perfil Pessoal
            </label>
            <textarea
              id="perfil"
              name="perfil"
              maxLength={700}
              placeholder="Descreva seu perfil pessoal..."
              value={perfil}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setPerfil(e.target.value)
              }
              className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            />
            <CharacterCounter count={perfil.length} max={700} />
          </div>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Avançar
        </button>
      </form>
    </section>
  );
}
