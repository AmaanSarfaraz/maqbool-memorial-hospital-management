import React, { useState, useEffect, useContext } from 'react';
import AppointmentContext from './appointmentContext.js';
import AdminContext from '../admin/adminContext.js'
import axios from 'axios';
import {API_URL} from '../../services/config.js'
import { toast } from 'react-toastify';

const AppointmentContextProvider = ({ children }) => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = React.useState(true);
    const {isAdminAuthenticated} = useContext(AdminContext)


    useEffect(() => {  
        const fetchAppointments = async () => {
            setLoading(true);
                try {
                    const response = await axios.get(
                        `${API_URL}/api/v1/admin/allappointments`,
                        {
                            withCredentials: true,
                        }
                    );
                    setAppointments(response.data.data);
                } catch (error) {
                    toast.error(error.response.data.message);
                    setAppointments([]);
                } finally {
                    setLoading(false);
                }
            };

        if (isAdminAuthenticated) {
            fetchAppointments();
        }
    }, [isAdminAuthenticated])
    return (
        <AppointmentContext.Provider value={{ appointments, setAppointments, setLoading, loading }}>
            {children}
        </AppointmentContext.Provider>
    );
};

export default AppointmentContextProvider;
