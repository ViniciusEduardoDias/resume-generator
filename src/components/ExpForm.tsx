"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";

type Experiencia = {
  empresa: string;
  cargo: string;
  admissao: Date;
  demissao: Date;
  funcoes: string[];
};

export default function ExpForm() {
  const router = useRouter();
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [experiencia, setExperiencia] = useState<Experiencia>({
    empresa: "",
    cargo: "",
    admissao: new Date(),
    demissao: new Date(),
    funcoes: [],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("experiencias", JSON.stringify(experiencias));
    router.push("/escolhaCor");
  };

  return (
    <section className="max-w-2xl p-6 mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Experiência Profissional{" "}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          name="empresa"
          placeholder="Nome da Empresa"
          value={experiencia.empresa}
          onChange={(e) =>
            setExperiencia({ ...experiencia, empresa: e.target.value })
          }
          required
        />
        <Input
          type="text"
          name="cargo"
          placeholder="Cargo de Registro"
          value={experiencia.cargo}
          onChange={(e) =>
            setExperiencia({ ...experiencia, cargo: e.target.value })
          }
          required
        />
        <Input
          type="date"
          name="admissao"
          placeholder="Data de Admissão"
          value={experiencia.admissao.toISOString().split("T")[0]}
          onChange={(e) =>
            setExperiencia({
              ...experiencia,
              admissao: new Date(e.target.value),
            })
          }
          required
        />
        <Input
          type="date"
          name="demissao"
          placeholder="Demissão"
          value={experiencia.demissao.toISOString().split("T")[0]}
          onChange={(e) =>
            setExperiencia({
              ...experiencia,
              demissao: new Date(e.target.value),
            })
          }
          required
        />
        <textarea
          name="funcoes"
          placeholder="Funções desempenhadas neste cargo"
          value={experiencia.funcoes.join("\n")}
          onChange={(e) =>
            setExperiencia({
              ...experiencia,
              funcoes: e.target.value.split("\n"),
            })
          }
          className="w-full h-40 p-4 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          required
        />
        <button
          type="button"
          onClick={() => {
            setExperiencias([...experiencias, experiencia]);
            setExperiencia({
              empresa: "",
              cargo: "",
              admissao: new Date(),
              demissao: new Date(),
              funcoes: [],
            });
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Adicionar Experiência
        </button>
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
