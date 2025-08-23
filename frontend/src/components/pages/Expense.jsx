import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { API_PATHS } from '../../../utils/apiPath'
import axiosInstance from '../../../utils/axiosinstance'
import { toast } from 'react-hot-toast'
import Navbar from '../Navbar/Navbar'
import ExpenseOverView from '../Expense/ExpenseOverView'
import Modal from '../Modal'
import AddExpenseForm from '../Expense/AddExpenseForm'
import ExpenseList from '../Expense/ExpenseList'
import DeleteAlert from '../DeleteAlert'


function Expense() {
  const [ExpenseData, setExpenseData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const fetchExpenseData = async () => {
    if (loading) return;

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`);
      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    } finally {
      setLoading(false);
    }
  };

  //handle add expense

  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation check
    if (!category.trim()) {
      toast.error("category is required");
      return;
    }

    if (!amount.trim() || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
      return;
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon
      });

      setOpenAddExpenseModal(false);
      toast.success("expense added successfully");
      fetchExpenseData();
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    }
  };


  //delete income   

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({
        show: false,
        data: id
      });
      toast.success("Income deleted successfully");
      fetchExpenseData();
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    }
  };

  //handle download income 
  const handleDownloadExpenseDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.EXPENSE.DOWNLOAD_EXPENSE_EXCEL,
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "expense.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.log("Something went wrong, please try again", error);
      toast.error("Something went wrong, please try again");
    }
  };

  useEffect(() => {
    fetchExpenseData();

    return () => { };
  }, []);



  return (
    <div className='overflow-hidden overflow-y-auto'>
      <Navbar />
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <ExpenseOverView
              transactions={ExpenseData}
              onExpenseIncome={() => setOpenAddExpenseModal(true)}
            />
          </div>

          <ExpenseList
            transactions={ExpenseData}
            onDelete={(id) => {
              setOpenDeleteAlert({
                show: true,
                data: id
              })
            }}
            onDownload={handleDownloadExpenseDetails}
          />
        </div>
        <Modal
          isOpen={openAddExpenseModal}
          onClose={() => setOpenAddExpenseModal(false)}
          title="Add Expense"
        >
          <AddExpenseForm onAddExpense={handleAddExpense} />
        </Modal>
        <Modal
          isOpen={openDeleteAlert.show}
          onClose={() => setOpenDeleteAlert({ show: false, data: null })}
          title="Delete Income"
        >
          <DeleteAlert
            content="Are you sure you want to delete this Expense?"
            onDelete={() => deleteIncome(openDeleteAlert.data)}
          />
        </Modal>


      </div>
    </div>
  )
}

export default Expense