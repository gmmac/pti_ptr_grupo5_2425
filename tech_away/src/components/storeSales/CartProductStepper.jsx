import React, { useState, useEffect, useRef } from "react";
import { Row, Col, Stack, Card } from "react-bootstrap";
import Filters from "../StorePage/Filters";
import ProductTableSales from "./ProductTableSales";
import CartBackoffice from "./CartBackoffice";
import { useAuthEmployee } from "../../contexts/AuthenticationProviders/EmployeeAuthProvider";
import api from "../../utils/axios";

export default function CartProductStepper({
  cart,
  setCart,
  addItemToCart,
  removeItemFromCart,
  clearCart,
  totalPrice,
}) {
  const [filters, setFilters] = useState({
    orderBy: "",
    type: "",
    model: "",
    brand: "",
  });

  const { employee } = useAuthEmployee();
  const [storeName, setStoreName] = useState("");

  const productRef = useRef(null);
  const cartRef = useRef(null);

  useEffect(() => {
    if (productRef.current && cartRef.current) {
      const productHeight = productRef.current.offsetHeight;
      cartRef.current.style.minHeight = `${productHeight}px`;
    }
  }, [cart, filters]);

  useEffect(() => {
    const fetchStoreName = async () => {
      if (employee && employee.storeNIPC) {
        try {
          const res = await api.get(`/api/store/${employee.storeNIPC}`);
          setStoreName(res.data.name || "Unknown Store");
        } catch (error) {
          console.error("Error fetching store name:", error.message);
          setStoreName("Unknown Store");
        }
      }
    };

    fetchStoreName();
  }, [employee]);

  return (
    <Row className="g-4">
      <Col md={9}>
        <Card
          ref={productRef}
          style={{
            border: "none",
            boxShadow: "var(--shadow-default)",
            borderRadius: "0.75rem"
          }}
        >
          <Card.Body>
            <Stack gap={3}>
              <h5 className="m-0">
                Products in {storeName || (employee?.storeNIPC ? "Loading..." : "N/A")}
              </h5>
              <Filters filters={filters} setFilters={setFilters} />
              <div className="table-container">
                <ProductTableSales
                  filters={filters}
                  onAddToCart={addItemToCart}
                  cart={cart}
                />
              </div>
            </Stack>
          </Card.Body>
        </Card>
      </Col>
      <Col md={3}>
        <Card
          ref={cartRef}
          style={{
            border: "none",
            boxShadow: "var(--shadow-default)",
            borderRadius: "0.75rem",
            display: "flex",
            flexDirection: "column",
            height: "100%"
          }}
        >
          <Card.Body className="d-flex flex-column" style={{ paddingBottom: 0 }}>
            <CartBackoffice
              cart={cart}
              removeItemFromCart={removeItemFromCart}
              clearCart={clearCart}
              totalPrice={totalPrice}
              fixedFooter={true}
            />
          </Card.Body>
        </Card>
      </Col>

      

      <style>{`
        .rounded-pill {
          border-radius: 1.5rem !important;
        }

        .table {
          margin: 0;
        }
        .table th {
          background-color: #f8f9fa; 
          color: var(--dark-grey);
          font-weight: 500;
          text-align: center;
        }
        .table td {
          vertical-align: middle;
          text-align: center;
        }
      `}</style>
    </Row>
  );
}
