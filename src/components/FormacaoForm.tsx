"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "./Input";
import { FaTrashAlt } from "react-icons/fa";
import { useFormData } from "@/hooks/useFormData";
import { Formacao } from "@/types/FormTypes";

export default function FormacaoForm() {
  const router = useRouter();
  const { get, update } = useFormData();

  const [formacoes, setFormacoes] = useState<Formacao[]>([]);
  const [formacao, setFormacao] = useState<Formacao>({
    instituicao: "",
    curso: "",
    nivel: "",
    conclusao: "",
  });

  function formatText(text: string) {
    return text
      .trim()
      .replace(/\s*([.,;:!?])\s*/g, "$1 ")
      .replace(/\.\s*(\w)/g, (_, p1) => `. ${p1.toUpperCase()}`)
      .replace(/(^\w)/, (match) => match.toUpperCase());
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    update({ formacoes });
    const updatedData = get(); // Aqui, estamos pegando os dados atualizados
    console.log(updatedData); // Imprimindo o objeto atualizado
    router.push("/experiencia");
  };

  const handleAddFormacao = () => {
    const novaFormacao: Formacao = {
      curso: formatText(formacao.curso),
      instituicao: formatText(formacao.instituicao),
      nivel: formatText(formacao.nivel),
      conclusao: formacao.conclusao,
    };

    setFormacoes((prev) => [...prev, novaFormacao]);

    setFormacao({
      curso: "",
      instituicao: "",
      nivel: "",
      conclusao: "",
    });
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
        />
        <div className="flex flex-col">
          <label className="w-full text-xs text-slate-600 font-semibold">
            Grau de Instrução
          </label>
          <select
            name="nivel"
            value={formacao.nivel}
            onChange={(e) =>
              setFormacao({ ...formacao, nivel: e.target.value })
            }
            className="p-2 border rounded text-gray-400 focus:text-black focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          >
            <option value="">Selecione um grau</option>
            <option value="Ensino Fundamental">Ensino Fundamental</option>
            <option value="Ensino Médio">Ensino Médio</option>
            <option value="Ensino Superior">Ensino Superior</option>
            <option value="Graduação">Graduação</option>
            <option value="Bacharelado">Bacharelado</option>
            <option value="Licenciatura">Licenciatura</option>
            <option value="Pós-Graduação">Pós-Graduação</option>
            <option value="Mestrado">Mestrado</option>
            <option value="Doutorado">Doutorado</option>
          </select>
        </div>
        <Input
          type="date"
          name="conclusao"
          text="Data de Conclusão"
          placeholder="Ano de Conclusão"
          value={formacao.conclusao}
          onChange={(e) =>
            setFormacao({
              ...formacao,
              conclusao: e.target.value,
            })
          }
        />

        <button
          type="button"
          onClick={handleAddFormacao}
          className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        >
          Adicionar Formação
        </button>

        {formacoes.length > 0 && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Formações Adicionadas:
            </h3>
            <ul className="space-y-4">
              {formacoes.map((formacao, index) => (
                <li
                  key={index}
                  className="p-4 border border-gray-300 rounded-md bg-gray-50 relative"
                >
                  <p>
                    <strong>{`${formacao.nivel} em`}</strong> {formacao.curso}
                  </p>
                  <p>
                    <strong>Instituição:</strong> {formacao.instituicao}
                  </p>
                  <p>
                    <strong>Conclusão:</strong>{" "}
                    {new Date(formacao.conclusao).toLocaleDateString()}
                  </p>
                  <button
                    type="button"
                    onClick={() =>
                      setFormacoes(formacoes.filter((_, i) => i !== index))
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
  );
}
