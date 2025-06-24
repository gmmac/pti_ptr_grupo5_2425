import React from "react";
import { Card, Button } from "react-bootstrap";

export default function ProductCardSales({ product, onAddToCart, cart }) {
  const id = product.id;
  const type = product.EquipmentSheet?.EquipmentType?.name || "N/A";
  const brand = product.EquipmentSheet?.EquipmentModel?.Brand?.name || "N/A";
  const model = product.EquipmentSheet?.EquipmentModel?.name || "N/A";
  const status = product.EquipmentStatus?.state || "N/A";
  const price = product.price !== undefined ? product.price.toFixed(2) : "0.00";

  const isInCart = cart.some(item => item.id === id);

  return (
    <Card className="mb-3 d-lg-none">
      <Card.Body>
        <Card.Title>{brand} {model}</Card.Title>
        <Card.Text>
          <strong>ID:</strong> {id}<br />
          <strong>Type:</strong> {type}<br />
          <strong>Status:</strong> {status}<br />
          <strong>Price:</strong> {price}€
        </Card.Text>
        <Button
          size="sm"
          className="rounded-pill"
          style={{
            backgroundColor: "var(--variant-one)",
            border: "none"
          }}
          onClick={() => onAddToCart(product)}
          disabled={isInCart}
        >
          {isInCart ? "In Cart" : "Add"}
        </Button>
      </Card.Body>
    </Card>
  );
}
