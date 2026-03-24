import React, { useState, useEffect } from 'react'; 
import BudgetCard from '../components/BudgetCard';
import BudgetModal from '../components/budgetModal';
import BudgetService from '../services/BudgetService';
import '../styles/budgetPage.css';

const BudgetPage = () => {
    const [budgets, setBudgets] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedBudget, setSelectedBudget] = useState(null);
    const [loading, setLoading] = useState(true);
    const [overallBudget, setOverallBudget] = useState(null);

    const fetchBudgets = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                console.error('No token found. Please log in.');
                return;
            }
            const data = await BudgetService.getCategoryBudgets(`Bearer ${token}`);

            const overall = data.find(budget => budget.category === 'Overall Budget');
            setOverallBudget(overall);

            const filteredData = data.filter(budget => budget.category !== 'Overall Budget');
            setBudgets(filteredData);
        } catch (error) {
            console.error('Error fetching budgets:', error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchBudgets();
    }, []);

    const handleEdit = (budget) => {
        setSelectedBudget(budget);
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        // const confirmed = window.confirm("Are you sure you want to delete this budget?");
        // if (!confirmed) return;

        try {
            const token = localStorage.getItem('token');
            await BudgetService.deleteBudget(token, id);
            fetchBudgets(); // Refresh after deletion
        } catch (error) {
            console.error('Error deleting budget:', error.message);
        }
    };

    const handleModalClose = () => {
        setIsModalOpen(false);
        setSelectedBudget(null);
        fetchBudgets();
    };

    return (
        <div className="budget-page-container">
            <div className="budget-header">
                <div className="budget-header-left">
                    <h1 className="budget-title">Budgets</h1>
                    <p className="budget-subtitle">Set and manage your monthly spending limits</p>
                </div>
                <button onClick={() => setIsModalOpen(true)} className="add-budget-btn">+ Add Budget</button>
            </div>

            {overallBudget && (
                <div className="overall-budget-card">
                    <h2>Total Budget</h2>
                    <p className="budget-amount">₹{overallBudget.budgetAmount}</p>
                </div>
            )}

            {loading ? (
                <p className="loading-text">Loading budgets...</p>
            ) : (
                <div className="budget-grid">
                    {budgets.length > 0 ? (
                        budgets.map((budget) => (
                            <BudgetCard 
                                key={budget._id} 
                                budget={budget} 
                                onEdit={handleEdit} 
                                onDelete={handleDelete}  // ✅ PASS onDelete here
                            />
                        ))
                    ) : (
                        <p className="no-budget-text">No budgets available. Please add a budget.</p>
                    )}
                </div>
            )}

            {isModalOpen && (
                <BudgetModal isOpen={isModalOpen} onClose={handleModalClose} budgetData={selectedBudget} />
            )}
        </div>
    );
};

export default BudgetPage;
