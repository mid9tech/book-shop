import { BACKEND_URL } from "@/lib/constants";

export async function UploadFileService(file: File) {
  const url = BACKEND_URL + "/upload";

  const formData = new FormData();
  formData.append("image", file);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorResponse = await response.json();
      throw new Error(errorResponse.message || "File upload failed");
    }

    const result = await response.json();

    return result.data.url;
  } catch (error: any) {
    console.error("Error uploading file:", error.message);
    return null;
  }
}
