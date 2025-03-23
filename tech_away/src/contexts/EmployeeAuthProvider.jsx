import { useContext, createContext, useState, useEffect } from 'react';
import api from '../utils/axios';

const EmployeeAuthContext = createContext();

const EmployeeAuthProvider = ({ children }) => {
    // const [user, setUser] = useState("");
    // const [loading, setLoading] = useState(true);

    // const [refresh, setRefresh] = useState(false);

    // useEffect(() => {
    //     const fetchUser = async () => {
    //         try {
    //             const response = await api.get("/api/auth/user-info", { withCredentials: true });
    //             if (response.data?.userInfo) {
    //                 setUser(response.data.userInfo);
    //             }
    //         } catch (err) {
    //             console.error("Erro ao buscar usuário:", err);
    //         } finally {
    //             setLoading(false);
    //         }
    //     };

    //     fetchUser();
    // }, [refresh]);

    // const loginAction = async (formData, setErrors) => {
    //     await api.post('/api/auth/login', {
    //         email: formData.email,
    //         password: formData.password,
    //         userType: "client"
    //     })
    //     .then(async response => {
    //         setRefresh(true);

    //     })
    //     .catch(error => {
    //         if(error.status == 403){
    //             newErrors.invalidCredentials = "Invalid credentials!";
    //             setErrors(newErrors);
    //         }else if(error.status == 429){
    //             newErrors.invalidCredentials = "Too many attempts. Try again later!";
    //             setErrors(newErrors);
    //         }
    //     })
    // };

    // const logOut = async () => {
    //     try {
    //         await api.get('/api/auth/logout');
    //     } catch (error) {
    //         console.error("Erro ao fazer logout:", error);
    //     } finally {
    //         setUser(null);
    //     }
    // };


    // const isUserLoggedIn = () => {
    //     return!!user;
    // }

    // const refreshPage = () => {
    //     setRefresh(true);
    // }

    return (
        <EmployeeAuthContext.Provider
            value={{ user, loginAction, isUserLoggedIn, logOut, refreshPage }}
        >
            {children}
        </EmployeeAuthContext.Provider>
    );
};

export default EmployeeAuthProvider;

export const useAuth = () => {
    return useContext(EmployeeAuthContext);
};
