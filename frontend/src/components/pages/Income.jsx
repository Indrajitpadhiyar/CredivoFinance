import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { useState } from 'react'
import IncomeOverview from '../Income/IncomeOverview'
import { API_PATHS } from '../../../utils/apiPath'
import axiosInstance from '../../../utils/axiosinstance'
import Modal from '../Modal'
import AddIncomeForm from '../Income/AddIncomeForm'
import { toast } from 'react-hot-toast'
import IncomeList from '../Income/IncomeList'
import DeleteAlert from '../DeleteAlert'


const Income = () => {
  const [IncomeData, setIncomeData] = useState([])
  const [loading, setLoading] = useState(false)
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });
  const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);

  //get all income details
  const fetchIncomeData = async () => {
    if (loading) return;

    setLoading(true)

    try {
      const response = await axiosInstance.get(`${API_PATHS.INCOME.GET_ALL_INCOME}`);
      if (response.data) {
        setIncomeData(response.data);
      }
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    } finally {
      setLoading(false);
    }
  };

  //handle add Income

  const handleAddIncome = async (income) => {
    const { source, amount, date, icon } = income;

    // Validation check
    if (!source.trim()) {
      toast.error("Source is required");
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
      await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
        source,
        amount,
        date,
        icon
      });

      setOpenAddIncomeModal(false);
      toast.success("Income added successfully");
      fetchIncomeData();
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    }
  };

  //delete income   

  const deleteIncome = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
      setOpenDeleteAlert({
        show: false,
        data: null
      });
      toast.success("Income deleted successfully");
      fetchIncomeData();
    } catch (error) {
      console.log("Something went wrong, please try again", error);
    }
  };

  //handle download income 

  const handleDownloadIncomeDetails = async () => {
    try {
      const response = await axiosInstance.get(
        API_PATHS.INCOME.DOWNLOAD_INCOME_EXCEL, // 🔁 make sure this is defined in your apiPath.js
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "income.xlsx");
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
    fetchIncomeData();

    return () => { };
  }, []);
  return (
    <div className='overflow-hidden overflow-y-auto'>
      <Navbar />
      <div className='my-5 mx-auto'>
        <div className='grid grid-cols-1 gap-6'>
          <div className=''>
            <IncomeOverview
              transactions={IncomeData}
              onAddIncome={() => setOpenAddIncomeModal(true)}
            />
          </div>

          <IncomeList
            transactions={IncomeData}
            onDelete={(id) => {
              console.log("Delete Clicked ID:", id); // Debug log
              setOpenDeleteAlert({
                show: true,
                data: { id }
              });
            }}
            onDownload={handleDownloadIncomeDetails}
          />
        </div>
      </div>
      <Modal
        isOpen={openAddIncomeModal}
        onClose={() => setOpenAddIncomeModal(false)}
        title="Add Income"
      >
        <div>
          Add Income Form
        </div>
        <AddIncomeForm onAddIncome={handleAddIncome} />
      </Modal>
      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Income"
      >
        <DeleteAlert
          content="Are you sure you want to delete this income?"
          onDelete={() => deleteIncome(openDeleteAlert.data.id)}
        />
      </Modal>
    </div>
  )
}

export default Income
