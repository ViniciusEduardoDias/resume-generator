"use client";

import { FaCircleCheck } from "react-icons/fa6";
import Image from "next/image";
import { Button } from "@/components";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
    <main className="flex flex-col flex-wrap md:flex-nowrap sm:flex-row justify-center items-center">
      <div className="flex flex-col gap-2">
        <h2 className="text-4xl md:text-6xl mb-2">
          Crie um currículo profissional em minutos
        </h2>
        <ul className="flex flex-col gap-2">
          <li className="flex flex-nowrap gap-2 items-center">
            <FaCircleCheck />
            Forma interativa e fácil
          </li>
          <li className="flex flex-nowrap gap-2 items-center">
            <FaCircleCheck />
            Disponibilizado em PDF
          </li>
          <li className="flex flex-nowrap gap-2 items-center">
            <FaCircleCheck />
            São 4 mini-questionários
          </li>
        </ul>
        <Button
          onClick={() => {
            router.push("/dadosPessoais");
          }}
          text="CRIAR MEU CV"
        />
      </div>
      <div className="w-full sm:w-[50%] flex justify-center">
        <Image
          src="/images/imagePage.png"
          alt="Imagem decorativa"
          width={300}
          height={300}
          className="w-auto max-w-[500px] h-auto"
        />
      </div>
    </main>
  );
}
