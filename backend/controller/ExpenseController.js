const xlsx = require("xlsx");
const Expense = require("../models/Expense");

//add Expense category
exports.addExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const { icon, category, amount, date } = req.body;

    //validate chack for missing data
    if (!category || !amount || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const newExpense = new Expense({
      userId,
      icon,
      category,
      amount,
      date: new Date(date),
    });
    await newExpense.save();
    res.status(200).json(newExpense);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//get all Expense categorys
exports.getAllExpense = async (req, res) => {
  const userId = req.user.id;

  try {
    const expenses = await Expense.find({ userId }).sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//delete Expense category
exports.deleteExpense = async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.json({ message: "Expense category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
//download excel
exports.downloadExpenseExcel = async (req, res) => {
  const userId = req.user.id;

  try {
    const Expense = await Expense.find({ userId }).sort({ date: -1 });

    //paper data to excel
    const data = Expense.map((item) => ({
      category: item.category,
      amount: item.amount,
      date: item.date,
      // .toISOString().split('T')[0],
    }));
    const wb = xlsx.utils.book_new();
    const ws = xlsx.utils.json_to_sheet(data);
    xlsx.utils.book_append_sheet(wb, ws, "Expense");
    xlsx.writeFile(wb, "Expense_data.xlsx");
    res.download("Expense_data.xlsx");
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
