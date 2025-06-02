import { useContext, createContext, useState, useEffect } from "react";
import { useAuth } from "./AuthenticationProviders/AuthProvider";

import api from "../utils/axios";

const InterestsContext = createContext();

export const InterestsProvider = ({ children }) => {
	const { user } = useAuth();
	const [interests, setInterests] = useState([]);

	const fetchClientInterests = async () => {
		try {
			const response = await api.get(`/api/interest/client/${user.nic}`);
			setInterests(response.data);
		} catch (error) {
			console.error("Error fetching interests:", error);
		}
	};

	const addInterest = async (interestId) => {
		try {
			const response = await api.post(
				`/api/interest/${user.nic}/${interestId}`
			);
			setInterests((prevInterests) => [...prevInterests, response.data]);
		} catch (error) {
			console.error("Error adding interest:", error);
		}
	};

	const removeInterest = async (interestId) => {
		try {
			await api.delete(`/api/interest/${user.nic}/${interestId}`);
			setInterests((prevInterests) =>
				prevInterests.filter((interest) => interest.id !== interestId)
			);
		} catch (error) {
			console.error("Error removing interest:", error);
		}
	};
};

return (
	<InterestsContext.Provider
		value={{
			interests,
			fetchClientInterests,
			addInterest,
			removeInterest,
		}}
	>
		{children}
	</InterestsContext.Provider>
);
