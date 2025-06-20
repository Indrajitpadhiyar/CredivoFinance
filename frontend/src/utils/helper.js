import uploadImage from "./uploadImage"; 
import moment from "moment";


export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export { uploadImage }; // ✅ Add this line

export const addThousandSeparators = (num) => {
  if (num == null || isNaN(num)) return "";

  const [integerPart, fractionalPart] = num.toString().split(".");
  const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return fractionalPart
    ? `${formattedInteger}.${fractionalPart}`
    : formattedInteger;
};

export const preparExpenseBarChartData = (data = []) => {
  const chartData = data.map((item) => ({
    category: item.category,
    amount: item.amount,
  }));

  return chartData;
};

export const preparIncomeBarChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a, b) => new DataTransfer(a.data) - b.data
  );
  const chartData =sortedData.map((item) => ({
    month:moment(item?.date).format("Do MMM"),
    source: item.source,
    amount: item.amount,
  }));

  return chartData;
};

export const preparExpenseLinrChartData = (data = []) => {
  const sortedData = [...data].sort(
    (a,b)=> new Date(a.date) - new Date(b.date)
  )
  const chartData = sortedData.map((item) => ({
    month:moment(item?.date).format("Do MMM"),
    amount: item?.amount,
    category: item?.category,
  }));

  return chartData;
};
