import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import api from "../../utils/axios";
import "./OrderPartsForms.css";

export default function OrderPartsForms({ equipmentSheetID, repairID, showModal, closeModal }) {
    const [cart, setCart] = useState([]);
    const [parts, setParts] = useState([]);

    useEffect(() => {
        if (!equipmentSheetID) return;

        api.get(`/api/part/equipmentSheet/${equipmentSheetID}`)
            .then((res) => setParts(res.data))
            .catch((err) => {
                console.error("Erro ao carregar peças:", err);
                setParts([]);
            });
    }, [equipmentSheetID]);

    const addToCart = (part) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === part.id);
            return existing
                ? prev.map((p) => p.id === part.id ? { ...p, quantity: p.quantity + 1 } : p)
                : [...prev, { ...part, quantity: 1 }];
        });
    };

    const removeFromCart = (partID) => {
        setCart((prev) =>
            prev
                .map((p) => p.id === partID ? { ...p, quantity: p.quantity - 1 } : p)
                .filter((p) => p.quantity > 0)
        );
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderParts = async () => {
        try {
            await Promise.all(cart.map((item) =>
                api.post("/api/repairParts/", {
                    repairID: repairID,
                    partID: item.id,
                    quantity: item.quantity,
                    totalPrice: item.price * item.quantity
                })
            ));

            setCart([]);
            closeModal();
        } catch (error) {
            console.error("Error:", error);
        }
    };

    return (
        <Dialog
            header={`Order Parts | Repair #${repairID}`}
            visible={showModal}
            onHide={closeModal}
            style={{ width: "95vw", maxWidth: "1000px" }}
            modal
            maximizable
        >
            <div className="order-dialog-content">
                {/* Galeria de peças */}
                <div className="part-gallery">
                    {parts.map((part) => (
                        <Card key={part.id} className="part-card">
                            <div className="part-name">{part.name}</div>
                            <div className="part-price">€{part.price.toFixed(2)}</div>
                            <div className="part-time">Arrive Time: {part.arriveTime} Days</div>
                            <Button
                                label="Add"
                                icon="pi pi-plus"
                                onClick={() => addToCart(part)}
                                className="p-button-sm"
                                style={{ marginTop: "20px", width: "100%" }}
                            />
                        </Card>
                    ))}
                </div>

                {/* Carrinho */}
                <div className="cart-section">
                    <h5>Cart</h5>
                    <div className="cart-section-content">
                        {cart.length === 0 ? (
                            <p>No items in cart.</p>
                        ) : (
                            <ul className="list-group mb-3" style={{ paddingLeft: 0 }}>
                                {cart.map((item) => (
                                    <li
                                        key={item.id}
                                        className="list-group-item"
                                        style={{
                                            listStyle: "none",
                                            display: "flex",
                                            justifyContent: "space-between",
                                            alignItems: "center",
                                            marginBottom: "0.5rem"
                                        }}
                                    >
                                        <div>
                                            {item.name} x{item.quantity}
                                        </div>
                                        <div>
                                            <Button
                                                icon="pi pi-minus"
                                                className="p-button-sm p-button-text"
                                                onClick={() => removeFromCart(item.id)}
                                            />
                                            <Button
                                                icon="pi pi-plus"
                                                className="p-button-sm p-button-text"
                                                onClick={() => addToCart(item)}
                                            />
                                        </div>
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>
                    <div className="cart-footer">
                        <h6>Total: €{total.toFixed(2)}</h6>
                        <Button
                            label="Order"
                            icon="pi pi-check"
                            onClick={orderParts}
                            disabled={cart.length === 0}
                            className="mt-2"
                            style={{ width: "100%" }}
                        />
                    </div>
                </div>
            </div>
        </Dialog>
    );
}
