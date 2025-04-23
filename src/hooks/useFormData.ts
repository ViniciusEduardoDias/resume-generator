import { useCallback } from "react";
import { FormDataCompleto } from "@/types/FormTypes";

export const useFormData = () => {
  const storageKey = "formData";

  const get = useCallback((): FormDataCompleto => {
    if (typeof window === "undefined") return { modelo: "", color: "" };

    const rawData = localStorage.getItem(storageKey);
    if (!rawData) return { modelo: "", color: "" };

    const data: FormDataCompleto = JSON.parse(rawData);

    // Corrige idade se necessário
    if (data.dadosPessoais?.idade)
      data.dadosPessoais.idade = Number(data.dadosPessoais.idade);

    // Corrige datas de experiências
    if (data.experiencias?.length) {
      data.experiencias = data.experiencias.map((exp) => ({
        ...exp,
        admissao: exp.admissao
          ? new Date(exp.admissao).toISOString()
          : new Date().toISOString(),
        encerramento: exp.encerramento
          ? new Date(exp.encerramento).toISOString()
          : new Date().toISOString(),
      }));
    }

    return data;
  }, []);

  const update = useCallback(
    (newData: Partial<FormDataCompleto>) => {
      if (typeof window === "undefined") return;

      const currentData = get();
      const merged: FormDataCompleto = {
        ...currentData,
        ...newData,
        modelo: newData.modelo ?? currentData.modelo ?? "",
      };

      localStorage.setItem(storageKey, JSON.stringify(merged));
    },
    [get]
  );

  const clear = useCallback(() => {
    if (typeof window === "undefined") return;
    localStorage.removeItem(storageKey);
  }, []);

  return { get, update, clear };
};
