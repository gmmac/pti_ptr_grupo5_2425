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
			const folder = folderToOpen?.id || null;
			const res = await api.get(`/api/interest/${user.nic}/${folder}`);
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
			return res.data;
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
				await fetch("/api/folderInterestEquipments", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ folderInterestId, interestId }),
				});
			}

			console.log("Interesses adicionados com sucesso.");
		} catch (error) {
			console.error("Erro ao adicionar interesses à pasta:", error);
		}
	};

	const removeInterestFromFolder = async (folderInterestId, interestIds) => {
		try {
			const ids = Array.isArray(interestIds) ? interestIds : [interestIds];

			// Para cada interesse, procura o registo correspondente e remove
			for (const interestId of ids) {
				// Primeiro, obter o registo específico (supondo que só existe um registo por combinação)
				const res = await fetch("/api/folderInterestEquipments");
				const allItems = await res.json();

				const target = allItems.find(
					(item) =>
						item.folderInterestId === folderInterestId &&
						item.interestId === interestId
				);

				if (target) {
					await fetch("/api/folderInterestEquipments", {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify({ id: target.id }),
					});
				}
			}

			console.log("Interesses removidos com sucesso.");
		} catch (error) {
			console.error("Erro ao remover interesses da pasta:", error);
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
			}}
		>
			{children}
		</InterestsContext.Provider>
	);
};

export default InterestsProvider;
export const useInterests = () => useContext(InterestsContext);
