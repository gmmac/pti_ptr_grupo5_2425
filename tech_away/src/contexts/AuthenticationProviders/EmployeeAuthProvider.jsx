import { useContext, createContext, useState, useEffect } from 'react';
import api from '../../utils/axios';

const EmployeeAuthContext = createContext();

const EmployeeAuthProvider = ({ children }) => {
    const [employee, setEmployee] = useState(null);

    const [loading, setLoading] = useState(true);

    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await api.get("/api/employee/user-info", { withCredentials: true });
                if (response.data?.employeeInfo) {
                    setEmployee(response.data.employeeInfo);
                } else {
                    setEmployee(null);
                }
            } catch (err) {
                console.error("Erro ao buscar usuário:", err);
                setEmployee(null);
            } finally {
                setLoading(false);
                setRefresh(false);
            }
        };
    
        fetchUser();
    }, [refresh]);
    

    const loginAction = async (formData, setErrors, newErrors) => {
        try {
            const response = await api.post('/api/auth/login', {
                email: formData.email,
                password: formData.password,
                userType: "employee"
            });
    
            setRefresh(true);
            return true;
    
        } catch (error) {
            if (error.response?.status === 403) {
                newErrors.invalidCredentials = "Invalid credentials!";
            } else if (error.response?.status === 429) {
                newErrors.invalidCredentials = "Too many attempts. Try again later!";
            } else {
                newErrors.invalidCredentials = "Login failed. Try again.";
            }
            setErrors(newErrors);
            return false;
        }
    };
    

    const logOut = async () => {
        try {
            await api.get('/api/auth/logout?userType=employee');
        } catch (error) {
            console.error("Erro ao fazer logout:", error);
        } finally {
            setEmployee(null);
        }
    };

    const checkPasswordStatus = async (setPasswordChanged) => {
        try {

            if (!employee) {
                console.error("Usuário não encontrado.");
                return;
            }

            const response = await api.get(`/api/auth/getUserByEmail/${employee.email}`);
            
            const passwordReset = !!response.data.last_password_reset;
            setPasswordChanged(passwordReset);
    
            return passwordReset;
        } catch (error) {
            console.error("Error verifying password:", error.response?.data || error.message);
            return false;
        }
    };

    const changePassword = async (setEmailMessage, setEmailSent) => {
        try {
            if (!employee) {
                console.error("Usuário não encontrado.");
                return;
            }
    
            await api.post("/api/auth/changePassword", { email: employee.email });
    
            setEmailMessage({ message: "Password reset email sent. Please check your email.", type: "success" });
            setEmailSent(true);
        } catch (error) {
            console.error("Error changing password:", error.response?.data || error.message);
            setEmailMessage({ message: "Error sending password reset email. Try again later.", type: "danger" });
        }
    };


    const checkIsAdmin = async () => {
        if (!employee) return false;

        try {
            const res = await api.get(`/api/employeeRole/${employee?.role}`);
            return res.data.role === "Admin";
        } catch (error) {
            console.error("Erro ao verificar admin:", error.message);
            return false;
        }
    }


    const isEmployeeLoggedIn = () => {
        console.log(employee)
        return!!employee;
    }

    const refreshPage = () => {
        setRefresh(true);
    }

    const toggleActivateAccount = async (internNum) => {
        try {
            await api.patch(`/api/employee/activation/${internNum}`);
        } catch (error) {
            console.error("Erro ao desativar a conta:", error.message);
        }
    }

    const verifyEmployeeIsActive = (givenEmployee) => {
        return givenEmployee?.isActive === "1";
    }

    return (
        <EmployeeAuthContext.Provider
            value={{ employee, loginAction, isEmployeeLoggedIn, checkPasswordStatus, changePassword, logOut, refreshPage, checkIsAdmin, toggleActivateAccount, verifyEmployeeIsActive }}
        >
            {children}
        </EmployeeAuthContext.Provider>
    );
};

export default EmployeeAuthProvider;

export const useAuthEmployee = () => {
    return useContext(EmployeeAuthContext);
};
