import { createContext, useContext, useState, useEffect, useRef } from "react";
import api from "../utils/axios";
import { useAuth } from "./AuthenticationProviders/AuthProvider";
import OffCanvasCart from "../components/cart/OffCanvasCart";
import { Toast } from "primereact/toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
	const { user } = useAuth();
	const [cartId, setCartId] = useState(null);
	const [numCartItems, setNumCartItems] = useState(0);
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [totalPrice, setTotalPrice] = useState(0);
	const [cartItems, setCartItems] = useState([]);

	const openCart = () => setIsCartOpen(true);
	const closeCart = () => setIsCartOpen(false);

	const toast = useRef(null);

	const showSuccess = () => {
		toast.current.show({
			severity: "success",
			summary: "Success",
			detail: "Item added to cart",
			life: 2000,
		});
	};
	const showWarning = () => {
		toast.current.show({
			severity: "warn",
			summary: "Warning",
			detail: "This item is already in cart",
			life: 2000,
		});
	};

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
		if (cartId) {
			fetchNumCartItems();
		}
	}, [cartId]);

	useEffect(() => {
		if (isCartOpen) {
			fetchCartItems();
			fetchTotalPrice();
		}
	}, [isCartOpen]);

	const fetchNumCartItems = () => {
		if (!cartId) return;
		api
			.get(`/api/actualCartEquipment/countItems/${cartId}`)
			.then((res) => setNumCartItems(res.data.count))
			.catch((error) =>
				console.error("Erro ao buscar número de itens no carrinho:", error)
			);
	};

	const checkIfItemExists = async (equipmentId) => {
		if (!cartId) return false;
		try {
			const res = await api.get(
				`/api/actualCartEquipment/exists/${cartId}/${equipmentId}`
			);
			return res.data.exists;
		} catch (error) {
			console.error("Erro ao verificar se item já está no carrinho:", error);
			return false;
		}
	};

	const addItemToCart = async (equipmentId) => {
		if (!cartId) return;

		const alreadyExists = await checkIfItemExists(equipmentId);

		if (alreadyExists) {
			showWarning();
			return;
		}

		const payload = {
			equipmentId: equipmentId,
			cartId: cartId,
		};

		try {
			await api.post("/api/actualCartEquipment", payload);

			fetchNumCartItems();
			fetchTotalPrice();
			showSuccess();
		} catch (error) {
			console.error("Erro ao adicionar equipamento ao carrinho:", error);
		}
	};

	const removeItemFromCart = (id) => {
		api
			.delete(`/api/actualCartEquipment/${id}`)
			.then(() => {
				console.log("item removido com sucesso");

				fetchNumCartItems();
				fetchCartItems();
				fetchTotalPrice();
			})
			.catch((error) => {
				console.log("Erro ao remover item: ", error.message);
			});
	};

	const clearCart = async () => {
		api
			.delete(`/api/actualCartEquipment/clearCart/${cartId}`)
			.then(() => {
				console.log("Carrinho limpo com sucesso");

				fetchNumCartItems();
				fetchCartItems();
				fetchTotalPrice();
			})
			.catch((error) => {
				console.log("Erro ao limpar carrinho: ", error.message);
			});
	};

	const fetchTotalPrice = async () => {
		try {
			const response = await api.get(
				`/api/actualCartEquipment/totalPrice/${cartId}`
			);
			setTotalPrice(Math.round(response.data.totalPrice * 100) / 100);
		} catch (error) {
			console.error("Erro ao buscar preço total do carrinho:", error);
		}
	};

	const fetchCartItems = async () => {
		try {
			const response = await api.get(`/api/actualCartEquipment/${cartId}`);
			setCartItems(response.data);
		} catch (error) {
			console.error("Erro ao buscar itens do carrinho:", error);
		}
	};

	const putPurchaseInBd = async () => {
		try {
			const clientPurchaseRes = await api.post(`/api/clientPurchase`, {
				clientNIC: user.nic,
				totalPrice: totalPrice,
				// employeeID: opcional
			});

			const clientPurchaseId = clientPurchaseRes.data.id;
			console.log(clientPurchaseId);

			await api.post("/api/purchaseCartEquipment/all-actual-cart", {
				clientPurchaseId,
				cartId: cartId,
			});

			console.log("Compra registrada com sucesso!");

			clearCart();
		} catch (error) {
			console.error("Erro ao registrar a compra:", error);
		}
	};

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
				removeItemFromCart,
				totalPrice,
				cartItems,
				clearCart,
				putPurchaseInBd,
			}}
		>
			{cartId && (
				<OffCanvasCart
					cartId={cartId}
					isOpen={isCartOpen}
					onClose={closeCart}
				/>
			)}
			<Toast ref={toast} />
			{children}
		</CartContext.Provider>
	);
};

export const useCart = () => useContext(CartContext);
