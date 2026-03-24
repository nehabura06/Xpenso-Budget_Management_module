// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// import BudgetModal from "../components/budgetModal";

// const Dashboard = () => {
//   const navigate = useNavigate();
//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [showMessage, setShowMessage] = useState(false);
//   const [overallBudget, setOverallBudget] = useState(0); // State to store overall budget

//   const fetchOverallBudget = async () => {
//     try {
//       let token = localStorage.getItem("token");
//       if (!token) {
//         // alert("User not found. Please login again.");
//         // navigate("/login");
//         return;
//       }
//       if (!token.startsWith("Bearer ")) {
//         token = `Bearer ${token}`;
//       }

//       const response = await axios.get("http://localhost:5000/api/budget/overall", {
//         headers: { Authorization: token }
//       });

//       setOverallBudget(response.data.budgetAmount || 0);
//     } catch (error) {
//       console.error("Error fetching overall budget:", error);
//       setOverallBudget(0); // Default if fetch fails
//     }
//   };
//   useEffect(() => {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       alert("User not found. Please login again.");
//       navigate("/login");
//       return;
//     }
//     fetchOverallBudget();
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     navigate("/login");
//   };
//   const handleNavigateToBudgetPage = () => {
//     navigate("/budgetPage"); // Redirect to BudgetPage
//   };

//   return (
//     <div className={`flex flex-col items-center justify-center min-h-screen p-6 ${isModalOpen ? 'bg-white bg-opacity-40 backdrop-blur-lg' : 'bg-gray-100'}`}>
//       <div className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full text-center relative">
//         <h1 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Your Dashboard</h1>
//         <p className="text-gray-600 mb-6">You are successfully logged in!</p>
//         {/* Display Overall Budget */}
//         <div className="bg-green-100 p-4 rounded-lg shadow-md mb-4">
//           <h3 className="text-lg font-semibold text-gray-700">Monthly Budget</h3>
//           <p className="text-2xl font-bold text-green-600">₹{overallBudget}</p>
//         </div>
//         <div className="flex gap-4 justify-center">
//           <button onClick={() => setIsModalOpen(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded-md">Set Budget</button>
//           <button onClick={handleLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-6 rounded-md">Logout</button>
//           <button onClick={handleNavigateToBudgetPage} className="bg-purple-500 hover:bg-purple-600 text-white font-semibold py-2 px-6 rounded-md">View Budgets</button>
//         </div>
//       </div>

//       {isModalOpen && (
//         <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBudgetSet={fetchOverallBudget} />


//       )}

//       {showMessage && (
//         <div className="fixed bottom-4 right-4 bg-blue-500 text-white px-6 py-3 rounded-lg">Budget saved successfully!</div>
//       )}
//     </div>
//   );
// };

// export default Dashboard;


import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import BudgetModal from "../components/budgetModal";
import "../styles/Dashboard.css"; // Import the external CSS file

const Dashboard = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [overallBudget, setOverallBudget] = useState(0);

  const fetchOverallBudget = async () => {
    try {
      let token = localStorage.getItem("token");
      if (!token) return;
      if (!token.startsWith("Bearer ")) {
        token = `Bearer ${token}`;
      }

      const response = await axios.get("http://localhost:5000/api/budget/overall", {
        headers: { Authorization: token }
      });

      setOverallBudget(response.data.budgetAmount || 0);
    } catch (error) {
      console.error("Error fetching overall budget:", error);
      setOverallBudget(0);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("User not found. Please login again.");
      navigate("/login");
      return;
    }
    fetchOverallBudget();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const handleNavigateToBudgetPage = () => {
    navigate("/budgetPage");
  };

  return (
    <div className={`dashboard-container ${isModalOpen ? "blurred" : ""}`}>
      <div className="dashboard-box">
        <h1 className="dashboard-title">Welcome to Your Dashboard</h1>
        <p className="dashboard-text">You are successfully logged in!</p>

        {/* Display Overall Budget */}
        <div className="budget-card">
          <h3>Monthly Budget</h3>
          <p className="budget-amount">₹{overallBudget}</p>
        </div>

        <div className="button-container">
          <button onClick={() => setIsModalOpen(true)} className="dashboard-button blue">
            Set Budget
          </button>
          <button onClick={handleLogout} className="dashboard-button red">
            Logout
          </button>
          <button onClick={handleNavigateToBudgetPage} className="dashboard-button purple">
            View Budgets
          </button>
        </div>
      </div>

      {isModalOpen && (
        <BudgetModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onBudgetSet={fetchOverallBudget} />
      )}

      {showMessage && <div className="message-popup">Budget saved successfully!</div>}
    </div>
  );
};

export default Dashboard;
