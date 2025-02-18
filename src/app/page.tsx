"use client";
import { useState } from "react";
import CustomFileInput from "@/components/custom-file-input";
import { predict } from "@/services";
import { useMutation } from "@tanstack/react-query";


export default function Home() {

  interface PredictionItem {
    name: string;
    class: string;
    confidence: number;
    box: string;
  }

  interface PredictionType {
    data: Array<PredictionItem>;
    error: string;
    image_url: string;
  }

  const [file, setFile] = useState<File | null>(null);

  const [prediction, setPrediction] = useState<PredictionType>();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };


  const createMutation = useMutation({
    mutationFn: (data: File) => {
      return predict(data)
    },
    onSuccess: (data) => {
      // console.log("data", data)
      setPrediction(data);
    },
    onError: (error) => {
      console.error("Erreur pendant la prédiction", error);
    }
  })


  const predictFood = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (!file) {
      console.error("Aucun fichier sélectionné");
      return;
    }

    createMutation.mutate(file);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 space-y-10">
      <CustomFileInput
        file={file}
        setFile={setFile}
        handleFileChange={handleFileChange}
        handleUpload={predictFood}
      />

      {
        prediction && prediction.data.length > 0 &&
        <div className="flex flex-col items-center justify-center">
          <div className="flex flex-col items-center justify-center mt-4">
            <span className="text-xl font-semibold text-blue-400">Prédiction</span>
            <div className="flex flex-col items-center justify-center md:flex-row flex-wrap gap-4 mt-4 w-full">
              {
                prediction.data.map((item, index) => (
                  <div key={index} className="text-sm text-gray-500 dark:text-gray-400 p-4 border border-gray-300 dark:border-gray-600 rounded-lg w-fit">
                    <div>Nom: {item.name}</div>
                    <div>Classe: {item.class}</div>
                    <div>Confiance: {item.confidence}</div>
                    {/* <div>Box: {JSON.stringify(item.box)}</div> */}
                  </div>
                ))
              }
            </div>

            <div className="flex items-center justify-center">
              {
                prediction.image_url &&
                <div className="mt-4">
                  <img src={prediction.image_url} alt="Prediction" className="rounded-lg mx-auto w-96 h-auto cover" />
                </div>
              }
            </div>
          </div>
        </div>
      }

    </div>
  );
}
