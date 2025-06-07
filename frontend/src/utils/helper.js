import uploadImage from "./uploadImage"; // ✅ Correct

export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export { uploadImage }; // ✅ Add this line

export const addThousandSeparators = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart, ] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};
