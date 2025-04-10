import { createContext, useContext, useState, useEffect } from "react";
import api from "../utils/axios";
import { useAuth } from "./AuthenticationProviders/AuthProvider";
import OffCanvasCart from "../components/cart/OffCanvasCart";
import { Badge } from "primereact/badge";
const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const { user } = useAuth();
	const [cartId, setCartId] = useState(null);
	const [numCartItems, setNumCartItems] = useState(0);
	const [isCartOpen, setIsCartOpen] = useState(false);

	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);

	useEffect(() => {
		if (user) {
			api
				.get(`/api/actualCart/clientCartID/${user.nic}`)
				.then((res) => setCartId(res.data))
				.catch((error) =>
					console.error("Erro ao buscar ID do carrinho:", error)
				);
		}
	}, [user]);

	useEffect(() => {
		if (cartId) fetchNumCartItems();
	}, [cartId]);

	const fetchNumCartItems = () => {
		if (!cartId) return;
		api
			.get(`/api/actualCartEquipment/countItems/${cartId}`)
			.then((res) => setNumCartItems(res.data.count))
			.catch((error) =>
				console.error("Erro ao buscar número de itens no carrinho:", error)
			);
	};

	const addItemToCart = async (equipmentId) => {
		if (!cartId) return;

		const payload = {
			equipmentId: equipmentId,
			cartId: cartId,
		};

		try {
			await api.post("/api/actualCartEquipment", payload);

			fetchNumCartItems();
		} catch (error) {
			console.error("Erro ao adicionar equipamento ao carrinho:", error);
		}
	};

	const CartBadge = () => (
		<Badge
			value={numCartItems}
			style={{
				fontSize: "10px",
				backgroundColor: "var(--white)",
				color: "var(--dark-grey)",
			}}
		/>
	);

	return (
		<CartContext.Provider
			value={{
				cartId,
				numCartItems,
				fetchNumCartItems,
				addItemToCart,
				isCartOpen,
				openCart,
				closeCart,
				CartBadge,
			}}
		>
			{cartId && (
				<OffCanvasCart
					cartId={cartId}
					isOpen={isCartOpen}
					onClose={closeCart}
				/>
			)}
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
