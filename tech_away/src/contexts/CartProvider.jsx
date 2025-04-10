import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "./AuthenticationProviders/AuthProvider";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const { user } = useAuth();
	const [cartId, setCartId] = useState(null);
	const [numCartItems, setNumCartItems] = useState(0);

	useEffect(() => {
		if (user) {
			api
				.get(`/api/actualCart/clientCartID/${user.nic}`)
				.then((res) => {
					setCartId(res.data);
				})
				.catch((error) =>
					console.error("Erro ao buscar ID do carrinho:", error)
				);
		}
	}, [user]);

	useEffect(() => {
		if (cartId) {
			fetchNumCartItems();
		}
	}, [cartId]);

	const fetchNumCartItems = () => {
		if (!cartId) return;
		api
			.get(`/api/actualCartEquipment/countItems/${cartId}`)
			.then((res) => {
				setNumCartItems(res.data.count);
			})
			.catch((error) =>
				console.error("Erro ao buscar número de itens no carrinho:", error)
			);
	};

	const addItemToCart = async (equipmentId) => {
		if (!cartId) return;

		try {
			await api.post("/api/actualCartEquipment", { equipmentId, cartId });

			// Atualiza imediatamente o número de itens

			fetchNumCartItems();
		} catch (error) {
			console.error("Erro ao adicionar equipamento ao carrinho:", error);
		}
	};

	return (
		<CartContext.Provider
			value={{ cartId, numCartItems, fetchNumCartItems, addItemToCart }}
		>
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
