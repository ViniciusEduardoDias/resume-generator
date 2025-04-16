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
    contato: "",
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
    <section>
      <form
        onSubmit={handleSubmit}
        className="w-full mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800">Dados Pessoais</h2>

        <div className="grid grid-cols-1 gap-4">
          <Input
            type="text"
            name="nome"
            placeholder="Nome completo"
            value={formData.nome}
            onChange={handleChange}
            required
          />
          <Input
            type="number"
            name="idade"
            placeholder="Idade"
            value={formData.idade}
            onChange={handleChange}
            required
          />
          <div className="flex flex-col">
            <label className="ml-3 text-xs text-slate-600 font-semibold">
              Estado Civil
            </label>
            <select
              name="estadoCivil"
              value={formData.estadoCivil}
              onChange={handleChange}
              className="p-2 border rounded"
              required
            >
              <option value="">Selecione</option>
              <option value="Solteiro(a)">Solteiro(a)</option>
              <option value="Casado(a)">Casado(a)</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
              <option value="Viúvo(a)">Viúvo(a)</option>
              <option value="União estável">União estável</option>
              <option value="Divorciado(a)">Divorciado(a)</option>
            </select>
          </div>
          <Input
            type="text"
            name="endereco"
            placeholder="Endereço (Logradouro, Número)"
            value={formData.endereco}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="cidade"
            placeholder="Cidade"
            value={formData.cidade}
            onChange={handleChange}
            required
          />
          <Input
            type="text"
            name="contato"
            placeholder="Telefone ou e-mail"
            value={formData.contato}
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
