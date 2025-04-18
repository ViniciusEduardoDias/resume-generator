"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import { FaTrashAlt } from "react-icons/fa";

type Experiencia = {
  empresa: string;
  cargo: string;
  admissao: Date;
  encerramento: Date;
  funcoes: string[];
};

export default function ExpForm() {
  const router = useRouter();
  const [experiencias, setExperiencias] = useState<Experiencia[]>([]);
  const [experiencia, setExperiencia] = useState<Experiencia>({
    empresa: "",
    cargo: "",
    admissao: new Date(),
    encerramento: new Date(),
    funcoes: [],
  });

  const formatarFuncoes = (funcoes: string[]) => {
    return funcoes
      .map((f) => {
        const frase = f.trim();
        if (!frase) return "";
        const primeiraLetra = frase[0].toUpperCase();
        const resto = frase.slice(1);
        return `• ${primeiraLetra}${resto}`;
      })
      .filter(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const experienciasFormatadas = experiencias.map((exp) => ({
      ...exp,
      funcoes: formatarFuncoes(exp.funcoes),
    }));
    localStorage.setItem(
      "experiencias",
      JSON.stringify(experienciasFormatadas)
    );
    router.push("/escolhaCor");
  };

  return (
    <>
      <section className="max-w-2xl p-6 mx-auto bg-white rounded-xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Experiência Profissional
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            type="text"
            name="empresa"
            text="Empresa"
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
            text="Cargo"
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
            text="Data de Admissão"
            value={
              experiencia.admissao
                ? new Date(experiencia.admissao).toISOString().split("T")[0]
                : ""
            }
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
            name="encerramento"
            text="Data de Encerramento"
            value={
              experiencia.encerramento
                ? new Date(experiencia.encerramento).toISOString().split("T")[0]
                : ""
            }
            onChange={(e) =>
              setExperiencia({
                ...experiencia,
                encerramento: new Date(e.target.value),
              })
            }
            required
          />
          <div>
            <label className="w-full text-xs text-slate-600 font-semibold">
              Funções Desempenhadas
            </label>
            <textarea
              name="funcoes"
              placeholder="Cite as tarefas e funções que você desempenhou nesse cargo..."
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
          </div>
          <button
            type="button"
            onClick={() => {
              setExperiencias([...experiencias, experiencia]);
              setExperiencia({
                empresa: "",
                cargo: "",
                admissao: new Date(),
                encerramento: new Date(),
                funcoes: [],
              });
            }}
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Adicionar Experiência
          </button>
          {experiencias.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">
                Experiências Adicionadas:
              </h3>
              <ul className="space-y-4">
                {experiencias.map((exp, index) => (
                  <li
                    key={index}
                    className="p-4 border border-gray-300 rounded-md bg-gray-50 relative"
                  >
                    <p>
                      <strong>Empresa:</strong> {exp.empresa}
                    </p>
                    <p>
                      <strong>Cargo:</strong> {exp.cargo}
                    </p>
                    <p>
                      <strong>Período:</strong>{" "}
                      {new Date(exp.admissao).toLocaleDateString()} -{" "}
                      {new Date(exp.encerramento).toLocaleDateString()}
                    </p>
                    <p>
                      <strong>Funções:</strong>
                    </p>
                    <ul className="list-disc ml-6">
                      {exp.funcoes.map((funcao, i) => (
                        <li key={i}>{funcao}</li>
                      ))}
                    </ul>

                    <button
                      type="button"
                      onClick={() =>
                        setExperiencias(
                          experiencias.filter((experiencia, i) => i !== index)
                        )
                      }
                      className="absolute top-3 right-3 text-white hover:underline text-sm"
                    >
                      <FaTrashAlt className="text-gray-500 hover:text-gray-800" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Avançar
          </button>
        </form>
      </section>
    </>
  );
}
