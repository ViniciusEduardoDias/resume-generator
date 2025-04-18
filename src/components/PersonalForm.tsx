"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";

export default function PersonalForm() {
  const router = useRouter();

  const [formData, setFormData] = useState({
    nome: "",
    idade: "",
    estadoCivil: "",
    endereco: "",
    cidade: "",
    telefone: "",
    email: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  function capitalizeWords(text: string) {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const formattedData = {
      ...formData,
      nome: capitalizeWords(formData.nome),
      endereco: capitalizeWords(formData.endereco),
      cidade: capitalizeWords(formData.cidade),
    };

    localStorage.setItem("dadosPessoais", JSON.stringify(formattedData));
    router.push("/objetivo");
  };

  return (
    <section className="w-full flex justify-center px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Dados Pessoais</h2>

        <div className="flex flex-col gap-4">
          <Input
            type="text"
            name="nome"
            text="Nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="idade"
            text="Idade"
            placeholder="Idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col">
            <label className="w-full text-xs text-slate-600 font-semibold">
              Estado Civil
            </label>
            <select
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleChange}
              className="p-2 border rounded text-gray-400 focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              required
            >
              <option value="">Estado Civil</option>
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Viúvo(a)">Viúvo(a)</option>
              <option value="União estável">União estável</option>
            </select>
          </div>
          <Input
            type="text"
            name="endereco"
            text="Endereço"
            placeholder="Logradouro, Número"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cidade"
            text="Cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          <Input
            type="tel"
            name="telefone"
            text="Telefone"
            placeholder="Telefone"
            value={formData.telefone}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            text="E-mail"
            placeholder="exemplo123@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
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
