import { useState, useEffect } from "react";
import { useNavigate, Outlet } from "react-router-dom";
import axios from "axios";
import Sidebar from "./Sidebar";

function DashboardLayout() {
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userEmail = localStorage.getItem("userEmail");
    if (!userEmail) {
      navigate("/");
      return;
    }

    axios.get(`http://localhost:8000/user-info/${userEmail}`)
      .then(result => {
        setUserData(result.data);
      })
      .catch(() => {
        navigate("/");
      });
  }, [navigate]);

  if (!userData) return null;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar userData={userData} />
      <div className="ml-64 flex-1 bg-white shadow-lg rounded-lg p-6">
        <div className="p-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default DashboardLayout;