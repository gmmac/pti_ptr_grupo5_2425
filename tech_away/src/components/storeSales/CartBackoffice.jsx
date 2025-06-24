import React from "react";
import { Stack, Row, Col, Button, Badge } from "react-bootstrap";

export default function CartBackoffice({ cart, removeItemFromCart, clearCart, totalPrice }) {
  return (
    <div className="d-flex flex-column h-100" style={{ minHeight: "400px" }}>
      <Stack direction="horizontal" className="justify-content-between align-items-center mb-2">
        <h5 className="m-0">Cart</h5>
        {cart.length > 0 && (
          <Button
            variant="outline-secondary"
            className="rounded-pill"
            size="sm"
            onClick={clearCart}
          >
            Clear Cart
          </Button>
        )}
      </Stack>

      <div
        style={{
          flexGrow: 1,
          minHeight: "200px",
          maxHeight: "380px",
          overflowY: "auto",
          overflowX: "hidden",
          paddingRight: "0.25rem"
        }}
      >
        {cart.length > 0 ? (
          <Stack gap={2}>
            {cart.map((item) => (
              <div
                key={item.id}
                className="p-2"
                style={{
                  background: "#f9f9f9",
                  borderRadius: "0.5rem",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.05)"
                }}
              >
                <Row className="align-items-center">
                  <Col xs={9}>
                    <Stack direction="horizontal" gap={2} className="flex-wrap">
                      <p className="m-0 fw-bold">
                        {item.EquipmentSheet?.EquipmentModel?.name || "Unnamed"}
                      </p>
                      {item.EquipmentStatus?.state && (
                        <Badge bg="secondary">{item.EquipmentStatus.state}</Badge>
                      )}
                    </Stack>
                    <p className="m-0 text-muted small">
                      {item.EquipmentSheet?.EquipmentModel?.Brand?.name || "No Brand"} | ID: {item.id}
                    </p>
                    <p className="m-0 small">{(item.price || 0).toFixed(2)} €</p>
                  </Col>
                  <Col xs={3} className="d-flex justify-content-end">
                    <Button
                      size="sm"
                      variant="outline-danger"
                      className="rounded-circle d-flex align-items-center justify-content-center"
                      style={{ width: "28px", height: "28px", padding: 0 }}
                      onClick={() => removeItemFromCart(item.id)}
                    >
                      <i className="pi pi-times"></i>
                    </Button>
                  </Col>
                </Row>
              </div>
            ))}
          </Stack>
        ) : (
          <p className="text-center text-muted">Cart is empty</p>
        )}
      </div>

      {cart.length > 0 && (
        <div
          className="border-top pt-2 mt-3"
          style={{
            paddingBottom: "0.75rem",
            marginTop: "auto"
          }}
        >
          <Stack direction="horizontal" className="justify-content-between align-items-center">
            <h5 className="m-0">Total</h5>
            <h5 className="m-0">{totalPrice} €</h5>
          </Stack>
        </div>
      )}
    </div>
  );
}
