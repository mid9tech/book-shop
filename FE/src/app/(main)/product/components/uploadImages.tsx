import React, { useState, ChangeEvent } from "react";

interface imagesProps {
  getFile(file: File[]): void;
}

export default function UploadImagesReview({ getFile }: imagesProps) {
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) =>
        URL.createObjectURL(file)
      );
      const newFiles = Array.from(files);

      setSelectedImages((prevImages) => [...prevImages, ...newImages]);
      setSelectedFiles((prevFiles) => {
        const updatedFiles = [...prevFiles, ...newFiles];
        getFile(updatedFiles);
        return updatedFiles;
      });
    }
  };

  const removeImage = (index: number) => {
    setSelectedImages((prevImages) => prevImages.filter((_, i) => i !== index));
    setSelectedFiles((prevFiles) => {
      const updatedFiles = prevFiles.filter((_, i) => i !== index);
      getFile(updatedFiles);
      return updatedFiles;
    });
  };

  return (
    <div className="p-4 max-w-full overflow-hidden">
      <input
        type="file"
        id="product-thumbnails"
        name="thumbnails"
        accept="image/*"
        multiple
        className="absolute w-auto px-3 py-2 mt-1 border rounded-none opacity-0 cursor-pointer overflow-hidden"
        onChange={handleImageUpload}
      />
      <div
        className="w-full bg-white border border-gray-300 rounded-md flex items-center justify-center py-2 px-4 cursor-pointer"
        onClick={() => document.getElementById("product-thumbnails")?.click()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 text-gray-500 mr-2"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
          />
        </svg>
        <span className="text-gray-500">Add Image</span>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-4">
        {selectedImages.map((image, index) => (
          <div key={index} className="relative">
            <img
              src={image}
              alt={`Uploaded preview ${index}`}
              className="w-full h-32 object-cover rounded"
            />
            <button
              onClick={() => removeImage(index)}
              className="absolute top-0 right-0 bg-red-500 h-5 w-5 text-sm text-white rounded-full"
            >
              &times;
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
