import axios from "../http";

class UplaodFileService {
  upload(file, data, url, onUploadProgress) {
    let formData = new FormData();
    formData.append("file", file);
    for (const key in data) {
      formData.append(key, data[key]);
    }

    return axios.post(url, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress,
    });
  }
}
export default new UplaodFileService();
