import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthenticationProviders/AuthProvider";
import api from "../utils/axios";

const InterestsContext = createContext();

const InterestsProvider = ({ children }) => {
	const { user } = useAuth();
	const [loadedInterests, setLoadedInterests] = useState([]);
	const [folders, setFolders] = useState([]);
	const [folderToOpen, setFolderToOpen] = useState("");

	const fetchInterestFolders = async () => {
		if (user) {
			console.log("user", user);

			try {
				console.log(user.nic);

				const res = await api.get(`/api/interestsFolder/${user.nic}`);
				setFolders(res.data);
			} catch (error) {
				console.error("Error fetching interest folders:", error);
			}
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
				loadedInterests,
				folders,
				fetchInterestFolders,
				fetchInterests,
				folderToOpen,
				setFolderToOpen,
			}}
		>
			{children}
		</InterestsContext.Provider>
	);
};

export default InterestsProvider;
export const useInterests = () => useContext(InterestsContext);
