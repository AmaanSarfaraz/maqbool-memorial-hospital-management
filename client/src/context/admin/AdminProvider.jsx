import React, { useEffect, useState } from "react";
import AdminContext from "./adminContext";
import axios from "axios";
import { API_URL } from '../../services/config';
import { toast } from "react-toastify";

const AdminContextProvider = ({ children }) => {
    const [admin, setAdmin] = useState({});
    const [allAdmins, setAllAdmins] = useState([]);
    const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
    const [adminId, setAdminId] = useState(null);
    const [loading, setLoading] = useState(false);

    // Fetch Admin Profile when authenticated
    useEffect(() => {
        const fetchAdmin = async () => {
            const token = localStorage.getItem("adminAccessToken");

            if (!token) {
                setIsAdminAuthenticated(false);
                setAdmin({});
                setAdminId(null);
                return;
            }

            try {
                const response = await axios.get(`${API_URL}/api/v1/admin/profile`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAdmin(response.data.data);
                setIsAdminAuthenticated(true);
                setAdminId(response.data.data?._id || null);
            } catch (error) {
                setIsAdminAuthenticated(false);
                setAdmin({});
                setAdminId(null);
                toast.error(error.response?.data?.message || "Failed to fetch admin profile.");
            }
        };

        if (isAdminAuthenticated) fetchAdmin();
    }, [isAdminAuthenticated]);

    // Fetch All Admins when authenticated
    useEffect(() => {
        const fetchAdmins = async () => {
            if (!isAdminAuthenticated) return;

            setLoading(true);
            try {
                const token = localStorage.getItem("adminAccessToken");
                const response = await axios.get(`${API_URL}/api/v1/admin/getalladmins`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                setAllAdmins(response.data.data);
            } catch (error) {
                toast.error(error.response?.data?.message || "Failed to fetch admins.");
                setAllAdmins([]);
            } finally {
                setLoading(false);
            }
        };

        fetchAdmins();
    }, [isAdminAuthenticated]);

    return (
        <AdminContext.Provider value={{
            admin, setAdmin,
            allAdmins, setAllAdmins,
            isAdminAuthenticated, setIsAdminAuthenticated,
            adminId, setAdminId,
            loading
        }}>
            {children}
        </AdminContext.Provider>
    );
};

export default AdminContextProvider;
