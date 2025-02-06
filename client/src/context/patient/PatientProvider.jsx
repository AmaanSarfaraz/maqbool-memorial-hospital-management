import React from "react";
import PatientContext from "./patientContext";
import axios from "axios";
import AdminContext from "../admin/adminContext.js";
import {API_URL} from '../../services/config.js'
import { toast } from "react-toastify";

const PatientContextProvider = ({children}) => {
    const [patient, setPatient] = React.useState(null);
    const [allPatients, setAllPatients] = React.useState([]);
    const [isPatientAuthenticated, setIsPatientAuthenticated] = React.useState(false)
    const [patientId, setPatientId] = React.useState(null);
    const { isAdminAuthenticated } = React.useContext(AdminContext)
    const [loading, setLoading] = React.useState(true)

        React.useEffect(() => {
            const patientAuthentication = async () => {
                const token = localStorage.getItem("patientAccessToken");
                if (!token) {
                    setIsPatientAuthenticated(false);
                    setPatient({});
                    setPatientId(null);
                    return;
                }
                try {
                    const response = await axios.get(
                        `${API_URL}/api/v1/patient/profile`,
                        {
                            headers: { Authorization: `Bearer ${token}` }
                        }
                    )
                    setIsPatientAuthenticated(true);
                    setPatient(response.data.data);
                    setPatientId(response.data.data._id);
                } catch (error) {
                    setIsPatientAuthenticated(false);
                    setPatient({});
                    setPatientId(null);
                }
            }
            if(isPatientAuthenticated){
            patientAuthentication()};
        }, [isPatientAuthenticated]);


    React.useEffect(() => {
        const fetchPatients = async () => {
            setLoading(true);
            if(isAdminAuthenticated){
                try {
                    const response = await axios.get(
                        `${API_URL}/api/v1/admin/getallpatients`,
                        {
                            withCredentials: true
                        }
                    )
                    setAllPatients(response.data.data);
                } catch (error) {
                    toast.error(error.response?.data?.message);
                    setAllPatients([]);
                } finally {
                    setLoading(false);
                }
            }
        };
        fetchPatients()
    }, [isAdminAuthenticated]);
    return(
        <PatientContext.Provider value={{ loading, allPatients,setAllPatients, patient, setPatient, isPatientAuthenticated, setIsPatientAuthenticated, patientId, setPatientId}}>
            {children}
        </PatientContext.Provider>
    )
}

export default PatientContextProvider;
