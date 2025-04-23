import { ElementType } from "react";

import CurriculoModelo01 from "@/models/CurriculoModelo01";
import CurriculoModelo02 from "@/models/CurriculoModelo02";

// Novo modelo? Só adicionar aqui:
export const modelComponents: Record<string, ElementType> = {
  modelo1: CurriculoModelo01,
  modelo2: CurriculoModelo02,
};
