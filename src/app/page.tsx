"use client";
import { useState } from "react";
import CustomFileInput from "@/components/custom-file-input";
import { predict } from "@/services";
import { useMutation } from "@tanstack/react-query";


export default function Home() {

  // const reader = new FileReader();

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  // const handleUpload = () => { }

  const createMutation = useMutation({
    mutationFn: (data: File) => {
      return predict(data)
    },
    onSuccess: (data) => {
      console.log("data", data)

    },
    onError: (error) => {
      console.error("Erreur pendant la prédiction", error);
    }
  })

  const create = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event) {
      event.preventDefault();
    }

    if (!file) {
      console.error("Aucun fichier sélectionné");
      return;
    }

    createMutation.mutate(file);
  };

  // const result = useQuery({
  //   queryKey: ['result'],
  //   queryFn: getResult(file?.name || ''),
  // });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <CustomFileInput
        file={file}
        setFile={setFile}
        handleFileChange={handleFileChange}
        handleUpload={create}
      />
    </div>
  );
}
