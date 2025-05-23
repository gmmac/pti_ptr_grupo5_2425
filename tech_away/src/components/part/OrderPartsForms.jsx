import { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import api from "../../utils/axios";

const sampleParts = [
    { id: 1, name: "Brake Pad", price: 30 },
    { id: 2, name: "Oil Filter", price: 15 },
    { id: 3, name: "Air Filter", price: 20 },
    { id: 4, name: "Spark Plug", price: 10 },
];

export default function OrderPartsForms({ equipmentSheetID, repairID, showModal, closeModal }) {
    const [cart, setCart] = useState([]);
    const [parts, setParts] = useState([]);

    // Faz a requisição ao backend
    useEffect(() => {
        if (!equipmentSheetID) return;

        api.get(`/api/part/equipmentSheet/${equipmentSheetID}`)
            .then((res) => {
                console.log(res.data)
                // setParts(res.data);
            })
            .catch((err) => {
                console.error("Erro ao carregar peças:", err);
                setParts([]);
            });
    }, [equipmentSheetID]);

    const addToCart = (part) => {
        setCart((prev) => {
            const existing = prev.find((p) => p.id === part.id);
            if (existing) {
                return prev.map((p) =>
                    p.id === part.id ? { ...p, quantity: p.quantity + 1 } : p
                );
            } else {
                return [...prev, { ...part, quantity: 1 }];
            }
        });
    };

    const removeFromCart = (partId) => {
        setCart((prev) =>
            prev
                .map((p) =>
                    p.id === partId ? { ...p, quantity: p.quantity - 1 } : p
                )
                .filter((p) => p.quantity > 0)
        );
    };

    const total = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const orderParts = () => {
        console.log(`Encomenda enviada para o repair ID ${repairID}:`, cart);
        setCart([]);
        closeModal();
    };

    return (
        <Dialog
            header={`Encomendar Peças (Reparação #${repairID})`}
            visible={showModal}
            onHide={closeModal}
            style={{ width: "90vw" }}
            maximizable
        >
            <div style={{ display: "flex", gap: "2rem", height: "70vh" }}>
                {/* Galeria de peças */}
                <div style={{ flex: 3, display: "flex", flexWrap: "wrap", gap: "1rem", overflowY: "auto" }}>
                    {sampleParts.map((part) => (
                        <Card
                            key={part.id}
                            title={part.name}
                            subTitle={`€${part.price.toFixed(2)}`}
                            style={{ width: "200px", height: "180px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                            footer={
                                <Button
                                    label="Adicionar"
                                    icon="pi pi-plus"
                                    onClick={() => addToCart(part)}
                                />
                            }
                        />
                    ))}
                </div>

                {/* Carrinho */}
                <div style={{ flex: 1, overflowY: "auto" }}>
                    <h5>Carrinho</h5>
                    {cart.length === 0 ? (
                        <p>Nenhuma peça no carrinho.</p>
                    ) : (
                        <ul className="list-group mb-3">
                            {cart.map((item) => (
                                <li
                                    key={item.id}
                                    className="list-group-item d-flex justify-content-between align-items-center"
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
                    <h6>Total: €{total.toFixed(2)}</h6>
                    <Button
                        label="Encomendar"
                        icon="pi pi-check"
                        onClick={orderParts}
                        disabled={cart.length === 0}
                        className="mt-2"
                    />
                </div>
            </div>
        </Dialog>
    );
}
