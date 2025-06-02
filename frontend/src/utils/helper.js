import { uploadImage } from "./uploadImage";

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export { uploadImage }; // ✅ Add this line
