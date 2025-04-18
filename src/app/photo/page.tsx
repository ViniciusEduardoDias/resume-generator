"use client";
import Image from "next/image";
import { useState, ChangeEvent } from "react";

export default function PhotoPage() {
  const [foto, setFoto] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  const handleFotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFoto(file);
    const previewUrl = URL.createObjectURL(file);
    setPreview(previewUrl);
  };

  return (
    <div className="flex flex-col items-center min-h-screen p-6">
      <h1 className="text-2xl font-bold mb-4 text-slate-600">Envie sua Foto</h1>
      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          className="w-40 h-40 rounded-full object-cover mb-4 shadow-md"
        />
      ) : (
        <div className="w-40 h-40 flex items-center justify-center rounded-full bg-gray-200 mb-4 text-gray-500">
          Insira a foto{" "}
        </div>
      )}

      <input
        type="file"
        accept="image/*"
        onChange={handleFotoChange}
        className="bg-white p-2 border rounded cursor-pointer"
      />
    </div>
  );
}
