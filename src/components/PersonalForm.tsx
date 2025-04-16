"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    localStorage.setItem("dadosPessoais", JSON.stringify(formData));

    router.push("/objetivo");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Dados Pessoais</h2>

      <div className="grid grid-cols-1 gap-4">
        <input
          type="text"
          name="nome"
          placeholder="Nome completo"
          value={formData.nome}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="number"
          name="idade"
          placeholder="Idade"
          value={formData.idade}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="estadoCivil"
          placeholder="Estado civil"
          value={formData.estadoCivil}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="endereco"
          placeholder="Endereço"
          value={formData.endereco}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="cidade"
          placeholder="Cidade"
          value={formData.cidade}
          onChange={handleChange}
          className="input"
          required
        />
        <input
          type="text"
          name="contato"
          placeholder="Telefone ou e-mail"
          value={formData.contato}
          onChange={handleChange}
          className="input"
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
  );
}
