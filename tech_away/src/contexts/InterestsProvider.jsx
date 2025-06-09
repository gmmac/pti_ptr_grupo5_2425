import { useContext, createContext, useState, useEffect, use } from "react";
import { useAuth } from "./AuthenticationProviders/AuthProvider";
import api from "../utils/axios";

const InterestsContext = createContext();

const InterestsProvider = ({ children }) => {
  const { user } = useAuth();
  const [userLoaded, setUserLoaded] = useState(false);
  const [loadedInterests, setLoadedInterests] = useState([]);
  const [folders, setFolders] = useState([]);
  const [folderToOpen, setFolderToOpen] = useState(null);

  useEffect(() => {
    if (user && !userLoaded) {
      setUserLoaded(true);
    }
  }, []);

  useEffect(() => {
    console.log("loadedInterests", loadedInterests);
  }, [loadedInterests]);

  const createFolder = async (folderName) => {
    try {
      await api.post(`/api/interestsFolder`, {
        name: folderName,
        clientNIC: user.nic,
      });
      fetchInterestFolders();
    } catch (error) {
      console.error("Error creating interest folder:", error);
    }
  };

  const createGenericInterest = async (newInterest) => {
    try {
      await api.post(`/api/interest`, {
        ...newInterest,
        clientNic: user.nic,
      });
      fetchInterests();
      return res.data;
    } catch (error) {
      console.error("Error creating interest:", error);
    }
  };

  const fetchInterestFolders = async () => {
    try {
      const res = await api.get(`/api/interestsFolder/${user.nic}`);
      setFolders(res.data);
    } catch (error) {
      console.error("Error fetching interest folders:", error);
    }
  };

  const fetchInterests = async () => {
    try {
      console.log(`/api/interest/${user.nic}/${folderToOpen}`);

      const res = await api.get(`/api/interest/${user.nic}/${folderToOpen}`);
      setLoadedInterests(res.data);
    } catch (error) {
      console.error("Error fetching interests:", error);
    }
  };

  const editInterest = async (editedInterest) => {
    try {
      const response = await api.put(
        `/api/interest/${editedInterest.id}`,
        editedInterest
      );
      fetchInterests();
      return response.data; // aqui retornas o objeto atualizado
    } catch (error) {
      console.error("Error editing interest:", error);
      throw error;
    }
  };

  const deleteInterest = async (interestId) => {
    try {
      await api.delete(`/api/interest/${interestId}`);
      fetchInterests();
    } catch (error) {
      console.error("Error deleting interest:", error);
    }
  };

  const deleteInterestFolder = async (folderId) => {
    try {
      await api.delete(`/api/interestFolder/${folderId}`);
      fetchInterestFolders();
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  return (
    <InterestsContext.Provider
      value={{
        userLoaded,
        loadedInterests,
        folders,
        fetchInterestFolders,
        fetchInterests,
        folderToOpen,
        setFolderToOpen,
        createFolder,
        createGenericInterest,
        deleteInterest,
        deleteInterestFolder,
        editInterest,
      }}
    >
      {children}
    </InterestsContext.Provider>
  );
};

export default InterestsProvider;
export const useInterests = () => useContext(InterestsContext);
