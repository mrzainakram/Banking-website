import React from "react";
import { useNavigate } from "react-router-dom";
import { FaMoneyBillWave, FaCreditCard, FaExchangeAlt, FaFileInvoice, FaChartBar } from "react-icons/fa";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-r from-purple-500 to-blue-500 min-h-screen p-6">
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Perform Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <QuickActionCard
            title="Deposit"
            icon={<FaMoneyBillWave className="text-4xl text-purple-500" />}
            onClick={() => navigate("/deposit")}
          />
          <QuickActionCard
            title="Withdraw"
            icon={<FaCreditCard className="text-4xl text-purple-500" />}
            onClick={() => navigate("/withdraw")}
          />
          <QuickActionCard
            title="Transfer"
            icon={<FaExchangeAlt className="text-4xl text-purple-500" />}
            onClick={() => navigate("/transfer")}
          />
         
         
        </div>
      </div>
    </div>
  );
}

function QuickActionCard({ title, icon, onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-gray-200 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col items-center justify-center"
    >
      {icon}
      <h3 className="text-lg font-semibold text-gray-800 mt-2">{title}</h3>
    </button>
  );
}

export default HomePage;