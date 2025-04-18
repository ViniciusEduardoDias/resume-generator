"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ObjectiveForm() {
  const router = useRouter();
  const [objetivo, setObjetivo] = useState("");
  const [perfil, setPerfil] = useState("");

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

    localStorage.setItem("objetivoProfissional", objetivo.trim());
    localStorage.setItem("perfilPessoal", perfil.trim());

    router.push("/formacao");
  };

  return (
    <section className="max-w-2xl p-6 mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Objetivo Profissional
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="relative">
          <textarea
            name="objetivo"
            placeholder="Descreva seu objetivo profissional..."
            value={objetivo}
            maxLength={700}
            onChange={(e) => setObjetivo(e.target.value)}
            className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
          <div className="text-sm text-right text-gray-500">
            {objetivo.length}/700
          </div>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Perfil Pessoal
        </h2>
        <h3>
          Nessa etapa, digite um texto falando sobre sua trajetória e o que
          conseguiu desenvolver.
        </h3>
        <div className="relative">
          <textarea
            name="perfil"
            maxLength={700}
            placeholder="Descreva seu perfil pessoal..."
            value={perfil}
            onChange={(e) => setPerfil(e.target.value)}
            className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          />
          <div className="text-sm text-right text-gray-500">
            {perfil.length}/700
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
