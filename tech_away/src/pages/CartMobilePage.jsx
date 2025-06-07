import React, { useEffect, useState } from "react";
import { Container, Stack, Button, Modal } from "react-bootstrap";
import { useCart } from "../contexts/CartProvider";
import Swirl from "../components/svg/Swirl";
import ItemCart from "../components/cart/ItemCart";
import { useNavigate } from "react-router-dom";

export default function CartMobilePage() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const {
    removeItemFromCart,
    numCartItems,
    totalPrice,
    cartItems,
    clearCart,
    fetchCartItems,
    fetchTotalPrice,
  } = useCart();

  useEffect(() => {
    fetchCartItems();
    fetchTotalPrice();
  }, []);

  return (
    <>
      <Container style={{ fontFamily: "var(--body-font)" }} className="mb-navbar">
        <Stack direction="vertical" gap={4}>
          <Stack
            direction="horizontal"
            style={{
              backgroundColor: "var(--white)",
              boxShadow: "var(--shadow-default)",
              borderRadius: "0 0 var(--rounded-sm) var(--rounded-sm)",
              height: "170px",
              WebkitMaskImage: "inset(0 round var(--rounded-lg))",
              maskImage: "inset(0 round var(--rounded-lg))",
            }}
            className="justify-content-between overflow-hidden"
          >
            <h1 className="ps-4 fs-1">Cart</h1>
            <Swirl
              w="70%"
              h="170%"
              vb="0 0 530 600"
              d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
              color="var(--variant-one)"
              strokeWidth="40"
            />
          </Stack>
          <Stack
            className="p-3 justify-content-between align-items-center"
            direction="horizontal"
            style={{
              backgroundColor: "var(--white)",
              boxShadow: "var(--shadow-default)",
              borderRadius: " var(--rounded-sm) ",
            }}
          >
            <p className="m-0">Total Items: {numCartItems}</p>
            <Button
              className="m-0 me-3 p-0"
              style={{
                fontFamily: "var(--body-font)",
                textDecoration: "underline",
                opacity: numCartItems == 0 ? "50%" : "100%", // Altera a opacidade com base em numCartItems
                fontSize: "15px",
                cursor: numCartItems == 0 ? "not-allowed" : "pointer", // Cursor mude para "not-allowed" quando desabilitado
                background: "none",
                border: "none",
                color:
                  numCartItems == 0 ? "var(--light-grey)" : "var(--dark-grey)", // Altere a cor para indicar desabilitação
              }}
              onClick={() => setShowModal(true)}
              disabled={numCartItems == 0}
            >
              Clean cart
            </Button>
          </Stack>
          <Stack
            direction="vertical"
            gap={3}
            className="p-3"
            style={{
              backgroundColor: "var(--white)",
              boxShadow: "var(--shadow-default)",
              borderRadius: " var(--rounded-sm) ",
            }}
          >
            <Stack
              direction="vertical"
              style={{
                maxHeight: "400px",
                overflowY: "scroll",
                overflowX: "hidden",
              }}
            >
              {/* Renderiza os itens do carrinho */}
              {cartItems ? (
                cartItems.map((item, index) => (
                  <ItemCart
                    key={index}
                    equipment={item}
                    onRemove={removeItemFromCart}
                  />
                ))
              ) : (
                <p className="text-center">Cart is empty :(</p>
              )}
            </Stack>
            <Stack
              direction="horizontal"
              className="justify-content-between align-items-center pt-2"
            >
              <h5 className="m-0">Total Price</h5>{" "}
              <h5 className="m-0">{totalPrice}€</h5>
            </Stack>
            <Button
              className="rounded-pill py-2 fs-5"
              style={{
                backgroundColor: "var(--variant-one)",
                border: "none",
                fontFamily: "var(--title-font)",
              }}
              disabled={numCartItems == 0}
              onClick={() => {
                navigate("/checkout-order");
              }}
            >
              Pay
            </Button>
          </Stack>
        </Stack>
      </Container>
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stack direction="horizontal" gap={3}>
            <i className="pi pi-exclamation-triangle"></i>
            <p className="m-0">Are you sure you want to clear the cart?</p>
          </Stack>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="rounded-pill"
            variant="secondary"
            onClick={() => setShowModal(false)}
          >
            Cancel
          </Button>
          <Button
            className="rounded-pill"
            style={{
              backgroundColor: "var(--danger)",
              border: "none",
            }}
            onClick={() => {
              clearCart();
              setShowModal(false);
            }}
          >
            Remove
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
