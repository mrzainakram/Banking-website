import { useNavigate, Link } from "react-router-dom";
import { FaHome, FaDollarSign, FaArrowDown, FaArrowUp, FaExchangeAlt, FaEye, FaSignOutAlt } from "react-icons/fa";

function Sidebar({ userData }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userEmail");
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-800 text-white shadow-lg h-screen fixed left-0">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-2xl font-bold">Welcome,</h2>
        <p className="text-gray-400 mt-1">{userData?.name}</p>
        <p className="text-sm text-gray-500 mt-2">Account: {userData?.accountNumber}</p>
        <p className="text-sm text-gray-500">Balance: ${userData?.balance}</p>
      </div>
      <nav className="mt-4">
        <Link
          to="/home"
          className="flex items-center px-6 py-3 hover:bg-purple-700 hover:text-white"
        >
          <FaHome className="mr-2" /> Dashboard
        </Link>
        <Link
          to="/deposit"
          className="flex items-center px-6 py-3 hover:bg-purple-700 hover:text-white"
        >
          <FaArrowDown className="mr-2" /> Deposit
        </Link>
        <Link
          to="/withdraw"
          className="flex items-center px-6 py-3 hover:bg-purple-700 hover:text-white"
        >
          <FaArrowUp className="mr-2" /> Withdraw
        </Link>
        <Link
          to="/transfer"
          className="flex items-center px-6 py-3 hover:bg-purple-700 hover:text-white"
        >
          <FaExchangeAlt className="mr-2" /> Transfer
        </Link>
        <Link
          to="/checkbalance"
          className="flex items-center px-6 py-3 hover:bg-purple-700 hover:text-white"
        >
          <FaEye className="mr-2" /> Check Balance
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center w-full text-left px-6 py-3 text-red-400 hover:bg-red-600 hover:text-white"
        >
          <FaSignOutAlt className="mr-2" /> Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;