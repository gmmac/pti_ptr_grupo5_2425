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
	const [interestsNotInFolder, setInterestsNotInFolder] = useState([]);

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
			let res;

			if (folderToOpen?.id) {
				// Se houver uma pasta, buscar interesses dentro dela
				res = await api.get(
					`/api/interest/folder/${user.nic}/${folderToOpen.id}`
				);
			} else {
				// Caso contrário, buscar todos os interesses do utilizador
				res = await api.get(`/api/interest/user/${user.nic}`);
			}

			setLoadedInterests(res.data);
		} catch (error) {
			console.error("Error fetching interests:", error);
		}
	};

	const fetchInterestsNotInFolder = async (folderId) => {
		try {
			const res = await api.get(
				`/api/interest/not-in-folder/${user.nic}/${folderId}`
			);
			const data = res.data;
			setInterestsNotInFolder(data);
		} catch (error) {
			console.error("Error fetching interests not in folder:", error);
			return [];
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

	const editFolderName = async (folderId, newName) => {
		try {
			await api.put(`/api/interestsFolder/${folderId}`, {
				name: newName,
			});
			fetchInterestFolders();
			setFolderToOpen((prev) => {
				if (prev?.id === folderId) {
					return { ...prev, name: newName };
				}
				return prev;
			});
		} catch (error) {
			console.error("Error editing folder name:", error);
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
			await api.delete(`/api/interestsFolder/${folderId}`);
			fetchInterestFolders();
			setFolderToOpen(null);
		} catch (error) {
			console.error("Error deleting folder:", error);
		}
	};

	const addInterestToFolder = async (folderInterestId, interestIds) => {
		try {
			const ids = Array.isArray(interestIds) ? interestIds : [interestIds];

			for (const interestId of ids) {
				await api.post("/api/interestsFolderEquipments", {
					folderInterestId,
					interestId,
				});
			}

			console.log("Interesses adicionados com sucesso.");
			fetchInterestsNotInFolder(folderToOpen?.id);
			fetchInterests();
		} catch (error) {
			console.error("Erro ao adicionar interesses à pasta:", error);
		}
	};

	const removeInterestFromFolder = async (folderInterestId, interestId) => {
		try {
			await api.delete("/api/interestsFolderEquipments", {
				data: {
					folderInterestId,
					interestId,
				},
			});

			// Atualiza a interface — por exemplo, refazendo o fetch
			fetchInterestsNotInFolder(folderToOpen?.id);
			fetchInterests(); // ou outra função para atualizar a lista
		} catch (err) {
			console.error("Erro ao remover interesse da pasta:", err);
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
				fetchInterestsNotInFolder,
				folderToOpen,
				setFolderToOpen,
				createFolder,
				createGenericInterest,
				deleteInterest,
				deleteInterestFolder,
				editInterest,
				editFolderName,
				addInterestToFolder,
				removeInterestFromFolder,
				interestsNotInFolder,
			}}
		>
			{children}
		</InterestsContext.Provider>
	);
};

export default InterestsProvider;
export const useInterests = () => useContext(InterestsContext);
