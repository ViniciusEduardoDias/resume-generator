"use client";

import { useRouter } from "next/navigation";

const SuccessPage = () => {
  const router = useRouter();

  return (
    <section className="w-full mt-20 p-6 mx-auto max-w-lg bg-white rounded-xl shadow-md text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">Parabéns!</h1>
      <p className="text-gray-700 mb-6">
        Seu currículo foi criado e o download já ocorreu.
      </p>
      <button
        className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
        onClick={() => router.push("/")}
      >
        Voltar para o Início
      </button>
    </section>
  );
};

export default SuccessPage;
