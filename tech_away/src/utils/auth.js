import api from './axios';


export const getLoggedUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};


export const checkIfAdmin = async (user) => {
    if (!user) return false;

    try {
        const res = await api.get(`/api/employeeRole/${user?.role}`);
        return res.data.role === "Admin"; // Retorna true se for Admin
    } catch (error) {
        console.error("Erro ao verificar admin:", error.message);
        return false; // Em caso de erro, assume que não é admin
    }
};
