import { useCallback } from "react";
import { FormDataCompleto } from "@/types/FormTypes";
import { ExperienciaProfissional } from "@/types/FormTypes";

export const useFormData = () => {
  const storageKey = "formData";

  const get = useCallback((): FormDataCompleto => {
    if (typeof window === "undefined") return {} as FormDataCompleto;

    const rawData = localStorage.getItem(storageKey);
    if (!rawData) return {} as FormDataCompleto;

    const data = JSON.parse(rawData);

    if (data.dadosPessoais?.idade)
      data.dadosPessoais.idade = Number(data.dadosPessoais.idade);

    if (data.experiencias?.length) {
      data.experiencias = data.experiencias.map(
        (exp: Partial<ExperienciaProfissional>) => ({
          ...exp,
          admissao: exp.admissao ? new Date(exp.admissao) : undefined,
          encerramento: exp.encerramento
            ? new Date(exp.encerramento)
            : undefined,
        })
      );
    }

    return data;
  }, []);

  const update = useCallback(
    (newData: Partial<FormDataCompleto>) => {
      if (typeof window === "undefined") return;

      const currentData = get();
      const merged = { ...currentData, ...newData };

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
