import Image from "next/image";

type CardModelProps = {
  model: string;
  modelo: {
    id: string;
    nome: string;
    imagem: string;
  };
};

const CardModel = ({ model, modelo }: CardModelProps) => {
  const isSelected = model === modelo.id;

  return (
    <div
      className={`border rounded-lg p-2 cursor-pointer transition hover:scale-110 ${
        isSelected ? "border-blue-500 ring-2 ring-blue-300" : "border-gray-300"
      }`}
    >
      <Image
        src={modelo.imagem}
        alt={modelo.nome}
        width={150}
        height={200}
        className="rounded-md object-cover"
      />
      <p className="mt-2 text-center text-gray-700">{modelo.nome}</p>
    </div>
  );
};

export default CardModel;
