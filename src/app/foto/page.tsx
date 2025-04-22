"use client";

import { Area } from "react-easy-crop";
import React, { useState } from "react";
import Cropper from "react-easy-crop";
import { useFormData } from "@/hooks/useFormData";
import { useRouter } from "next/navigation";

const FotoPage = () => {
  const router = useRouter();
  const { update } = useFormData();

  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropComplete = (_: Area, croppedArea: Area) => {
    setCroppedAreaPixels(croppedArea);
  };

  const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: Area
  ): Promise<string | null> => {
    const image = new Image();
    image.src = imageSrc;

    await new Promise((resolve) => {
      image.onload = resolve;
    });

    const canvas = document.createElement("canvas");
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    ctx.drawImage(
      image,
      pixelCrop.x,
      pixelCrop.y,
      pixelCrop.width,
      pixelCrop.height,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );

    return canvas.toDataURL("image/jpeg");
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImageSrc(reader.result as string);
    reader.readAsDataURL(file);
  };

  const handleAvancar = async () => {
    if (!imageSrc || !croppedAreaPixels) return;

    const croppedImage = await getCroppedImg(imageSrc, croppedAreaPixels);
    if (croppedImage) {
      update({ foto: croppedImage });
    }
    router.push("/escolhaCor");
  };

  const handlePular = () => {
    router.push("/escolhaCor");
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6 p-4">
      {!imageSrc ? (
        <div className="flex flex-col items-center gap-4">
          <div className="flex flex-col items-center gap-3">
            <h1 className="font-bold text-xl">Selecionar foto</h1>
            <p className="p-4 bg-yellow-100 shadow-sm">
              Dica: Escolha uma foto de frente e formal.
            </p>
          </div>
          <label className="bg-blue-500 text-white hover:bg-blue-700 px-4 py-2 rounded cursor-pointer">
            Escolher Foto
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>
        </div>
      ) : (
        <div className="relative w-[300px] h-[300px] bg-gray-200 rounded-full overflow-hidden">
          <Cropper
            image={imageSrc}
            crop={crop}
            zoom={zoom}
            aspect={1}
            onCropChange={setCrop}
            onZoomChange={setZoom}
            onCropComplete={onCropComplete}
            cropShape="round"
            showGrid={true}
          />
        </div>
      )}

      {imageSrc && (
        <div className="flex gap-4 mt-4">
          <button
            onClick={handleAvancar}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            Avançar
          </button>
          <button
            onClick={handlePular}
            className="bg-gray-400 text-white px-4 py-2 rounded"
          >
            Pular etapa
          </button>
        </div>
      )}
    </div>
  );
};

export default FotoPage;
