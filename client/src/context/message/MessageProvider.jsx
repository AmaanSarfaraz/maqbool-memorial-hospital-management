import React from "react";
import MessageContext from "./messageContext";
import axios from "axios";
import { toast } from "react-toastify";
import AdminContext from "../admin/adminContext.js";
import {API_URL} from '../../services/config.js'


const MessageContextProvider = ({children}) => {
    const [messages, setMessages] = React.useState([]);
    const {isAdminAuthenticated} = React.useContext(AdminContext)
    const [loading, setLoading] = React.useState(null);
    React.useEffect(() => {
        const fetchMessages = async () => {
          setLoading(true);
          try {
            const { data } = await axios.get(
              `${API_URL}/api/v1/admin/getAll/messages`,
              {
                withCredentials: true,
              }
            );
            setMessages(data.data);
          } catch (error) {
            toast.error(error.response.data.message);
            setMessages([]);
          } finally {
            setLoading(false);
          }
        };
        if(isAdminAuthenticated){
        fetchMessages()};
      }, [isAdminAuthenticated]);

    return(
        <MessageContext.Provider value={{messages, setMessages, loading }}>
            {children}
        </MessageContext.Provider>
    )
}

export default MessageContextProvider;