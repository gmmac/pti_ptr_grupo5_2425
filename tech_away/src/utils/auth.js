import api from './axios';


export const getLoggedUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};


export const checkIfAdmin = async () => {
    const user = getLoggedUser();
    if (!user) return false;
    
    try {
        const res = await api.get(`/api/employeeRole/${user?.role}`);
        return res.data.role === "Admin";
    } catch (error) {
        console.error("Erro ao verificar admin:", error.message);
        return false;
    }
};


export const employeeChangedPassword = async () => {
    const user = getLoggedUser();
    if (!user) return false;
    return user?.passwordReseted == 1
}

export const removeLoggedUser = () => {
    sessionStorage.removeItem("user");


};