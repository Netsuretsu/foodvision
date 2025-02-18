"use client";
import React from 'react';
import Image from 'next/image';

interface CustomFileInputProps {
    file: File | null;
    setFile: React.Dispatch<React.SetStateAction<File | null>>;
    handleUpload: () => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export default function CustomFileInput({ file, setFile, handleUpload, handleFileChange }: CustomFileInputProps) {


    return (
        <div className="flex items-center justify-center min-w-[600px]">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-80 border-2 border-blue-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">

                {
                    file ?

                        <div className='relative flex flex-col items-center justify-center rounded-lg p-2'>

                            <svg onClick={(e) => { setFile(null); e.preventDefault(); }} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.1} stroke="currentColor" className="absolute size-6 top-[-5px] right-[-5px]">
                                <path strokeLinecap="round" strokeLinejoin="round" d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                            </svg>

                            <Image
                                src={URL.createObjectURL(file)}
                                width={150}
                                height={80}
                                alt=''
                                className='rounded-lg'
                            />

                            <div className='flex flex-col items-center justify-center mt-2'>
                                <span className='text-sm font-semibold text-blue-400'>{file.name}</span>
                                <span className='text-xs text-gray-500 dark:text-gray-400'>{file.size} bytes</span>

                                <button onClick={handleUpload} className="px-4 py-2 mt-4 text-sm font-semibold text-white bg-blue-400 rounded-md hover:bg-blue-500 focus:outline-none focus:ring">Predict</button>
                            </div>
                        </div>
                        :
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                            </svg>
                            <p className="mb-2 text-sm text-blue-300 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF</p>
                        </div>
                }

                <input onChange={handleFileChange} id="dropzone-file" type="file" className="hidden" />
            </label>
        </div>

    );
}
