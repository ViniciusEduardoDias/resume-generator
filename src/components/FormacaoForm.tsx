"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";

type Formacao = {
  instituicao: string;
  curso: string;
  nivel: string;
  conclusao: Date;
};

export default function FormacaoForm() {
  const router = useRouter();
  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [formacao, setFormacao] = useState<Formacao>({
    instituicao: "",
    curso: "",
    nivel: "",
    conclusao: new Date(),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("formacoes", JSON.stringify(formacoes));
    router.push("/experiencia");
  };

  return (
    <section className="max-w-2xl p-6 mx-auto bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Formação Acadêmica e Cursos
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <Input
          type="text"
          name="curso"
          text="Nome do Curso"
          placeholder="Curso Realizado"
          value={formacao.curso}
          onChange={(e) => setFormacao({ ...formacao, curso: e.target.value })}
          required
        />
        <Input
          type="text"
          name="instituicao"
          text="Instituição"
          placeholder="Nome da Instituição de Ensino"
          value={formacao.instituicao}
          onChange={(e) =>
            setFormacao({ ...formacao, instituicao: e.target.value })
          }
          required
        />
        <div className="flex flex-col">
          <label className="w-full text-xs text-slate-600 font-semibold">
            Grau de Instrução
          </label>
          <select
            name="estadoCivil"
            value={formacao.nivel}
            onChange={(e) => {
              setFormacao({ ...formacao, nivel: e.target.value });
            }}
            className="p-2 border rounded text-gray-400 focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            required
          >
            <option value="">Ensino Fundamental</option>
            <option value="Solteiro(a)">Ensino Médio</option>
            <option value="Casado(a)">Ensino Superior</option>
            <option value="Divorciado(a)">Graduação</option>
            <option value="Viúvo(a)">Bacharelado</option>
            <option value="União estável">Licenciatura</option>
            <option value="União estável">Pós-Graduação</option>
            <option value="União estável">Mestrado</option>
            <option value="União estável">Doutorado</option>
          </select>
        </div>
        <Input
          type="date"
          name="conclusao"
          text="Data de Conclusão"
          placeholder="Ano de Conclusão"
          value={formacao.conclusao.toISOString().split("T")[0]}
          onChange={(e) =>
            setFormacao({
              ...formacao,
              conclusao: new Date(e.target.value),
            })
          }
          required
        />
        <button
          type="button"
          onClick={() => {
            setFormacoes([...formacoes, formacao]);
            setFormacao({
              curso: "",
              instituicao: "",
              nivel: "",
              conclusao: new Date(),
            });
          }}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Adicionar Formação
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
