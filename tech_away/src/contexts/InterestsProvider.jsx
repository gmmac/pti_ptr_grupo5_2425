import { useContext, createContext, useState, useEffect, use } from "react";
import { useAuth } from "./AuthenticationProviders/AuthProvider";
import api from "../utils/axios";

const InterestsContext = createContext();

const InterestsProvider = ({ children }) => {
	const { user } = useAuth();
	const [userLoaded, setUserLoaded] = useState(false);
	const [loadedInterests, setLoadedInterests] = useState([]);
	const [folders, setFolders] = useState([]);
	const [folderToOpen, setFolderToOpen] = useState("");

	useEffect(() => {
		if (user && !userLoaded) {
			setUserLoaded(true);
		}
	}, []);

	const createFolder = async (folderName) => {
		try {
			const res = await api.post(`/api/interestsFolder`, {
				name: folderName,
				clientNIC: user.nic,
			});
			setFolders((prevFolders) => [...prevFolders, res.data]);
		} catch (error) {
			console.error("Error creating interest folder:", error);
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
			const res = await api.get(`/api/interests/${user.nic}/${folderToOpen}`);
			setLoadedInterests(res.data);
		} catch (error) {
			console.error("Error fetching interests:", error);
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
			}}
		>
			{children}
		</InterestsContext.Provider>
	);
};

export default InterestsProvider;
export const useInterests = () => useContext(InterestsContext);
