"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import { FaTrashAlt } from "react-icons/fa";
import { useFormData } from "@/hooks/useFormData";
import { ExperienciaProfissional } from "@/types/FormTypes";

export default function ExpForm() {
  const router = useRouter();
  const { update, get } = useFormData();
  const [experiencias, setExperiencias] = useState<ExperienciaProfissional[]>(
    (get().experiencias as ExperienciaProfissional[]) || []
  );

  const [experiencia, setExperiencia] = useState<ExperienciaProfissional>({
    empresa: "",
    cargo: "",
    admissao: "",
    encerramento: "",
    funcoes: [],
  });

  function formatText(text: string) {
    return text
      .trim()
      .replace(/\s*([.,;:!?])\s*/g, "$1 ")
      .replace(/\.\s*(\w)/g, (_, p1) => `. ${p1.toUpperCase()}`)
      .replace(/(^\w)/, (match) => match.toUpperCase());
  }

  const formatarFuncoes = (funcoes: string[]) => {
    return funcoes
      .map((f) => {
        const frase = f.trim();
        if (!frase) return "";
        const primeiraLetra = frase[0].toUpperCase();
        const resto = frase.slice(1);
        return `${primeiraLetra}${resto}`;
      })
      .filter(Boolean);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    update({
      experiencias: experiencias,
    });
    const updatedData = get();
    console.log(updatedData);
    router.push("/foto");
  };

  const handleAddExperience = () => {
    if (
      !experiencia.empresa ||
      !experiencia.cargo ||
      !experiencia.admissao ||
      !experiencia.encerramento
    ) {
      alert("Preencha todos os campos obrigatórios antes de adicionar!");
      return;
    }

    const experienciaFormatada = {
      ...experiencia,
      empresa: formatText(experiencia.empresa),
      cargo: formatText(experiencia.cargo),
      funcoes: formatarFuncoes(experiencia.funcoes),
    };

    setExperiencias([...experiencias, experienciaFormatada]);
    setExperiencia({
      empresa: "",
      cargo: "",
      admissao: "",
      encerramento: "",
      funcoes: [],
    });
  };

  return (
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
            setExperiencia({
              ...experiencia,
              empresa: e.target.value,
            })
          }
        />
        <Input
          type="text"
          name="cargo"
          text="Cargo"
          placeholder="Cargo de Registro"
          value={experiencia.cargo}
          onChange={(e) =>
            setExperiencia({
              ...experiencia,
              cargo: e.target.value,
            })
          }
        />
        <Input
          type="date"
          name="admissao"
          text="Data de Admissão"
          value={experiencia.admissao}
          onChange={(e) =>
            setExperiencia({
              ...experiencia,
              admissao: e.target.value,
            })
          }
        />
        <Input
          type="date"
          name="encerramento"
          text="Data de Encerramento"
          value={experiencia.encerramento}
          onChange={(e) =>
            setExperiencia({
              ...experiencia,
              encerramento: e.target.value,
            })
          }
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
          />
        </div>

        <button
          type="button"
          onClick={handleAddExperience}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Adicionar Experiência
        </button>

        {experiencias.length === 0 && (
          <div className="mt-6 bg-yellow-100 text-yellow-700 p-4 rounded-md">
            <p>
              Você ainda não adicionou nenhuma experiência profissional. Caso
              não tenha experiências, você pode avançar sem preencher esta
              etapa.
            </p>
          </div>
        )}

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
                  {exp.funcoes.length > 0 && (
                    <>
                      <p>
                        <strong>Funções:</strong>
                      </p>
                      <ul className="list-disc ml-6">
                        {exp.funcoes.map((funcao, i) => (
                          <li key={i}>{funcao}</li>
                        ))}
                      </ul>
                    </>
                  )}

                  <button
                    type="button"
                    onClick={() =>
                      setExperiencias(
                        experiencias.filter((_, i) => i !== index)
                      )
                    }
                    className="absolute top-1.5 right-1.5 text-white hover:underline text-sm"
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
          className="mt-4 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          {experiencias.length && experiencias.length > 0
            ? "Avançar"
            : "Avançar sem adicionar"}
        </button>
      </form>
    </section>
  );
}
