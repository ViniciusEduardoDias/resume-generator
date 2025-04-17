"use client";

import { ReactNode } from "react";
import { FaUser, FaBullseye, FaCheckCircle } from "react-icons/fa";
import { HiAcademicCap } from "react-icons/hi2";

import { IoColorPaletteSharp } from "react-icons/io5";
import { MdAddPhotoAlternate } from "react-icons/md";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

type Step = {
  name: string;
  path: string;
  icon: ReactNode;
};

const steps: Step[] = [
  { name: "Pessoais", path: "/dadosPessoais", icon: <FaUser /> },
  { name: "Objetivo", path: "/objetivo", icon: <FaBullseye /> },
  { name: "Formação", path: "/formacao", icon: <HiAcademicCap /> },
  { name: "Experiencia", path: "/experiencia", icon: <FaCheckCircle /> },
  { name: "Paleta de Cores", path: "/cor", icon: <IoColorPaletteSharp /> },
  { name: "Foto", path: "/photo", icon: <MdAddPhotoAlternate /> },
];

function StepSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <div className="flex flex-col gap-2 p-4 bg-gray-100 rounded-xl">
      {steps.map((step) => (
        <div
          key={step.name}
          className={`flex items-center gap-2 p-2 rounded transition cursor-pointer ${
            pathname === step.path
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-600"
          }`}
          onClick={() => router.push(`${step.path}`)}
        >
          <span className="text-lg">{step.icon}</span>
          <span>{step.name}</span>
        </div>
      ))}
    </div>
  );
}

export default StepSidebar;
