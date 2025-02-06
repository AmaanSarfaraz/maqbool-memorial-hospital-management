import React from "react";
import DoctorContext from "./doctorContext.js";
import axios from "axios";
import { toast } from "react-toastify";
import {API_URL} from '../../services/config.js'


const DoctorContextProvider = ({children}) => {
    const [doctors, setDoctors] = React.useState([]);
    const [isDoctorAuthenticated, setIsDoctorAuthenticated] = React.useState([]);
    const [loading, setLoading] = React.useState(true);


    React.useEffect(() => {
        const getAllDoctors = async () => {
          setLoading(true);
          try {
            const { data } = await axios.get(
              `${API_URL}/api/v1/doctor/all/doctors`,
              {
                withCredentials: true,
              }
            );
            setDoctors(data.data);
          } catch (error) {
            toast.error(error.response.data.message);
          } finally {
            setLoading(false);
          }
        };
        getAllDoctors();
      }, [setDoctors]);

    return(
        <DoctorContext.Provider value={{doctors, setDoctors, isDoctorAuthenticated, setIsDoctorAuthenticated, loading}}>
            {children}
        </DoctorContext.Provider>
    )
}

export default DoctorContextProvider;