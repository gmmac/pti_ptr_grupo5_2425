export const formatDate = (dateString) => {
    return new Date(dateString).toISOString().split("T")[0];
};