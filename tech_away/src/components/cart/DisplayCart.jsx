import React, { useEffect, useState } from "react";
import api from "../../utils/axios";
import { OrderList } from "primereact/orderlist";
import { Image, Stack } from "react-bootstrap";
import ItemCart from "./ItemCart";

export default function DisplayCart({}) {
	const [cartId, setCartId] = useState("");
	const [cart, setCart] = useState([]);
	useEffect(() => {
		api
			.get("/api/actualCart/clientCartID/123456789")
			.then((res) => {
				setCartId(res.data);
			})
			.catch((error) => {
				console.log("Api error: ", error.message);
			});
	}, []);

	useEffect(() => {
		api
			.get(`/api/actualCartEquipment/${cartId}`)
			.then((res) => {
				setCart(res.data);
			})
			.catch((error) => {
				console.log("Api error: ", error.message);
			});
	}, [cartId]);

	useEffect(() => {
		console.log(cart);
	}, [cart]);

	return (
		<Stack gap={3} className="w-50">
			{cart.map((item, index) => {
				return <ItemCart key={index} equipment={item} />;
			})}
		</Stack>
	);
}
