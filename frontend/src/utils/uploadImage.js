import axiosInstance from "./axiosinstance";
import { API_PATHS } from "./apiPath";

export const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  const response = await axiosInstance.post(
    API_PATHS.IMAGE.UPLOAD_IMAGE,
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );

  return response.data;
};
