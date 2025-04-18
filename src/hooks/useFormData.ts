// hooks/useFormData.ts
import { useCallback } from "react";

export const useFormData = () => {
  const storageKey = "formData";

  const get = useCallback(() => {
    if (typeof window === "undefined") return {};
    return JSON.parse(localStorage.getItem(storageKey) || "{}");
  }, []);

  const update = useCallback(
    (newData: Record<string, any>) => {
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
