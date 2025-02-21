import axios from "axios";

export async function getFile() {}

export async function getAllFiles() {
  const response = await axios.get("http://localhost:3000/files");
  return response.data;
}

export async function saveFile() {}

export async function uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await axios.post("http://localhost:3000/upload", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });

  return response.data;
}
