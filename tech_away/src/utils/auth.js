
export const getLoggedUser = () => {
    return JSON.parse(sessionStorage.getItem("user"));
};

export const removeLoggedUser = () => {
    sessionStorage.removeItem("user");
};