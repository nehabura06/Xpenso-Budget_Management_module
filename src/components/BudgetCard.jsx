import React from 'react';
// import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/budgetCard.css';

const getProgressBarColor = (percentage) => {
    return percentage <= 75 ? "progress-purple" : "progress-red";
};

const BudgetCard = ({ budget, onEdit, onDelete }) => {
    const usagePercentage = budget.budgetAmount > 0
        ? ((budget.spentAmount / budget.budgetAmount) * 100).toFixed(0)
        : 0;
    const finalUsagePercentage = isNaN(usagePercentage) ? 0 : usagePercentage;

    const remainingAmount = budget.budgetAmount - budget.spentAmount;
    const finalRemainingAmount = isNaN(remainingAmount) ? 0 : remainingAmount;

    const isOverBudget = budget.spentAmount > budget.budgetAmount;

    const handleDelete = () => {
        onDelete(budget._id); // Delete immediately without confirmation
    };


    return (
        <div className="budget-card">
            <div className="budget-card-header">
                <div className="budget-category">
                    <span className="budget-icon">{budget.icon}</span>
                    <h3>{budget.category}</h3>
                </div>
                <div className="budget-card-actions">
                    <button onClick={() => onEdit(budget)} className="edit-button-text">
                        Edit
                    </button>
                    <button onClick={handleDelete} className="delete-button-text">
                        Delete
                    </button>
                </div>
            </div>

            <p><strong>Budget:</strong> ₹{budget.budgetAmount}</p>
            <p><strong>Spent:</strong> ₹{budget.spentAmount}</p>
            <p><strong>Usage:</strong> {finalUsagePercentage}%</p>

            <div className="progress-bar">
                <div className={`progress-fill ${getProgressBarColor(finalUsagePercentage)}`} style={{ width: `${finalUsagePercentage}%` }}></div>
            </div>

            {isOverBudget ? (
                <p className="over-budget">Over budget by ₹{Math.abs(finalRemainingAmount)}</p>
            ) : (
                <p className="remaining-budget">₹{finalRemainingAmount} remaining</p>
            )}
        </div>
    );
};

export default BudgetCard;
