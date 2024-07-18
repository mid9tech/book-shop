"use client";

import { useSession } from "next-auth/react";
import { Fragment, useState } from "react";

interface avatarProps {
  getFile(file: File): void;
}

export default function Avatar({ getFile }: avatarProps) {
  const { data: session } = useSession();
  const [image, setImage] = useState<string | ArrayBuffer | null>(
    session?.user?.avatar || null
  );

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      getFile(file);
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className="text-center">
      <div className="resource flex justify-center">
        <div className="preview">
          <button
            type="button"
            onClick={() => document.getElementById("upload-button")?.click()}
          >
            Upload Image
          </button>
          <input
            type="file"
            id="upload-button"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />

          {typeof image === "string" ? (
            <img
              src={image}
              alt="Preview"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
                borderRadius: "10px",
              }}
            />
          ) : (
            <Fragment></Fragment>
          )}
        </div>
      </div>
    </div>
  );
}
