import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const response = await axiosInstance.post(
      API_PATHS.IMAGE.UPLOAD_IMAGE,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        timeout: 30000,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Image upload error:", error.response?.data || error.message);
    throw error;
  }
};

export default uploadImage;
