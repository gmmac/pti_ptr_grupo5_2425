import React, { useEffect, useRef, useState } from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";
import { Stepper } from "primereact/stepper";
import { StepperPanel } from "primereact/stepperpanel";
import { Button } from "primereact/button";
import ClientsSalesStepper from "./ClientsSalesStepper";
import FormsClientBackoffice from "../client/FormsClientBackoffice";
import CartProductStepper from "./CartProductStepper";
import api from "../../utils/axios";
import CartBackoffice from "./CartBackoffice";
import { useAuthEmployee } from "../../contexts/AuthenticationProviders/EmployeeAuthProvider";

export default function NewSaleModal({ showModal, closeModal, refreshTable }) {
  const stepperRef = useRef(null);
  const [cart, setCart] = useState([]);
  const [client, setClient] = useState(null);
  const [showClientModal, setShowClientModal] = useState(false);
  const [clientPage, setClientPage] = useState(1);

  const { employee } = useAuthEmployee();
  const [store, setStore] = useState(null);

  useEffect(() => {
    const fetchStoreInfo = async () => {
      if (employee?.storeNIPC) {
        try {
          const res = await api.get(`/api/store/${employee.storeNIPC}`);
          setStore(res.data);
        } catch (err) {
          console.error("Error fetching store info:", err);
        }
      }
    };
    fetchStoreInfo();
  }, [employee?.storeNIPC]);

  const handleNext = () => stepperRef.current?.nextCallback();
  const handleBack = () => stepperRef.current?.prevCallback();

  const handleCancel = () => {
    closeModal();
    resetState();
  };

  const resetState = () => {
    setCart([]);
    setClient(null);
    setClientPage(1);
  };

  const handleOpenClientModal = () => {
    setShowClientModal(true);
  };

  const handleCloseClientModal = () => {
    setShowClientModal(false);
  };

  const handleClientCreated = (newClient) => {
    handleCloseClientModal();
    setClient(newClient);
    setClientPage(1);
    refreshTable();
  };

  const addItemToCart = (item) => {
    if (cart.some((c) => c.id === item.id)) {
      console.warn("Item already in cart");
      return;
    }
    setCart((prev) => [...prev, item]);
  };

  const removeItemFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const totalPrice = cart
    .reduce((acc, item) => acc + (item.price || 0), 0)
    .toFixed(2);

  const verifyCartAvailability = async () => {
    try {
      const promises = cart.map((item) =>
        api.get(`/api/usedEquipment/by-used-equiment-id/${item.id}`)
      );
      const results = await Promise.all(promises);
      const unavailable = results.filter(
        (res) =>
          !res.data.usedEquipments ||
          res.data.usedEquipments.purchaseDate !== null
      );
      return {
        isValid: unavailable.length === 0,
        unavailableItems: unavailable.map((res) => res.data.usedEquipments?.id),
      };
    } catch (err) {
      console.error("Error verifying cart availability:", err);
      return { isValid: false, unavailableItems: [] };
    }
  };

const handleSubmit = async () => {
  try {
    const availability = await verifyCartAvailability();
    if (!availability.isValid) {
      alert(
        `Some items are no longer available: ${availability.unavailableItems.join(
          ", "
        )}`
      );
      return;
    }

    // 1️⃣ Criar a compra primeiro
    const purchaseRes = await api.post("/api/clientPurchase/", {
      clientNIC: client.nic,
      totalPrice: Number(totalPrice),
      employeeID: employee?.nic,
      storeId: employee?.storeNIPC,
      address: "",
    });

    const clientPurchaseId = purchaseRes.data.id;
    if (!clientPurchaseId) throw new Error("Purchase not created");

    // 2️⃣ Só agora iterar e criar os equipamentos ligados à compra
    for (const item of cart) {
      console.log("Sending to purchaseCartEquipment:", {
        clientPurchaseId,
        equipmentId: item.id,
      });

      await api.post("/api/purchaseCartEquipment/", {
        clientPurchaseId,
        equipmentId: item.id,
      });
    }

    alert(`Sale created successfully with ID: ${clientPurchaseId}`);
    clearCart();
    refreshTable();
    handleCancel();
  } catch (error) {
    console.error("Error during sale submit:", error);
    alert("Error during submission, check console.");
  }
};



  return (
    <>
      <Modal
        size="xl"
        show={showModal && !showClientModal}
        onHide={handleCancel}
        centered
        backdropClassName="custom-backdrop"
      >
        <Modal.Header closeButton>
          <Modal.Title>New Sale</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Stepper ref={stepperRef} style={{ width: "100%" }} linear>
            <StepperPanel header="Select Client">
              <div>
                <ClientsSalesStepper
                  handleSelectClient={(clientObj, page) => {
                    setClient(clientObj);
                    setClientPage(page);
                  }}
                  selectedClient={client?.nic}
                  currentPage={clientPage}
                  setCurrentPage={setClientPage}
                />
                <Row className="d-flex justify-content-between align-items-center mt-2">
                  <Col xs={7} className="text-start">
                    If the client you're looking for does not exist, create a
                    new one:
                  </Col>
                  <Col
                    xs="auto"
                    className="d-flex justify-content-end align-self-center"
                  >
                    <Button
                      className="rounded-pill"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={handleOpenClientModal}
                    >
                      Create New Client
                    </Button>
                  </Col>
                </Row>
              </div>
              <div className="d-flex justify-content-between mt-3">
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  severity="secondary"
                  className="rounded-pill"
                  onClick={handleCancel}
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={handleNext}
                  disabled={!client}
                  className={!client ? "p-button-secondary" : ""}
                  style={{
                    backgroundColor: "var(--variant-one)",
                    border: "none",
                  }}
                />
              </div>
            </StepperPanel>

            <StepperPanel header="Cart">
              <CartProductStepper
                cart={cart}
                setCart={setCart}
                addItemToCart={addItemToCart}
                removeItemFromCart={removeItemFromCart}
                clearCart={clearCart}
                totalPrice={totalPrice}
              />
              <div className="d-flex justify-content-between mt-3">
                <Button
                  label="Back"
                  icon="pi pi-arrow-left"
                  severity="secondary"
                  onClick={handleBack}
                />
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  severity="secondary"
                  onClick={handleCancel}
                />
                <Button
                  label="Next"
                  icon="pi pi-arrow-right"
                  iconPos="right"
                  onClick={handleNext}
                  style={{
                    backgroundColor: "var(--variant-one)",
                    border: "none",
                  }}
                  disabled={cart.length === 0}
                />
              </div>
            </StepperPanel>

            <StepperPanel header="Check Out">
            <Row className="g-4">
                <Row className="g-3">
                    <Col md={6}>
                    <div
                        className="d-flex flex-column h-100"
                        style={{
                        background: "#fff",
                        borderRadius: "0.5rem",
                        boxShadow: "var(--shadow-default)",
                        fontFamily: "var(--body-font)",
                        padding: "1rem"
                        }}
                    >
                        <h5
                        className="mb-2"
                        style={{
                            fontWeight: "700",
                            fontSize: "1.25rem",
                            borderBottom: "1px solid #e0e0e0",
                            paddingBottom: "0.5rem"
                        }}
                        >
                        Sale Summary
                        </h5>

                        <Stack gap={3} className="flex-grow-1">
                        <div>
                            <span className="fw-semibold">Client:</span>
                            <div className="ms-2">
                            {client ? (
                                <>
                                <div>{client.name}</div>
                                <div className="text-muted small">
                                    NIC: <span className="fw-normal">{client.nic}</span>
                                </div>
                                <div className="text-muted small">
                                    NIF: <span className="fw-normal">{client.nif || "N/A"}</span>
                                </div>
                                </>
                            ) : (
                                <div className="text-muted">No client selected</div>
                            )}
                            </div>
                        </div>

                        <div>
                            <span className="fw-semibold">Store:</span>
                            <div className="ms-2">
                            <div className="text-muted">{store?.name || "Unknown Store"}</div>
                            <div className="text-muted small">{store?.address || "No address available"}</div>
                            </div>
                        </div>

                        <div>
                            <span className="fw-semibold">Processed by:</span>
                            <div className="ms-2">
                            <div className="text-muted">{(employee?.firstName + " " + employee?.lastName)  || "Unknown Employee"}</div>
                            <div className="text-muted small">
                                    NIC: <span className="fw-normal">{employee?.nic}</span>
                            </div>
                            </div>
                        </div>

                        <div>
                            <span className="fw-semibold">Total Items:</span>
                            <div className="ms-2">
                            <div className="text-muted">{cart.length}</div>
                            </div>
                        </div>
                        </Stack>
                    </div>
                    </Col>

                <Col md={6}>
                    <div
                    className="h-100"
                    style={{
                        background: "#fff",
                        borderRadius: "0.5rem",
                        boxShadow: "var(--shadow-default)",
                        padding: "1rem",
                        display: "flex",
                        flexDirection: "column"
                    }}
                    >
                    <CartBackoffice
                        cart={cart}
                        removeItemFromCart={removeItemFromCart}
                        clearCart={clearCart}
                        totalPrice={totalPrice}
                        fixedFooter={true}
                    />
                    </div>
                </Col>
                </Row>


            </Row>

            <div className="d-flex justify-content-between mt-3">
                <Button
                label="Back"
                icon="pi pi-arrow-left"
                severity="secondary"
                onClick={handleBack}
                />
                <Button
                label="Cancel"
                icon="pi pi-times"
                severity="secondary"
                onClick={handleCancel}
                />
                <Button
                label="Submit"
                icon="pi pi-check"
                onClick={handleSubmit}
                style={{
                    backgroundColor: "var(--variant-one)",
                    border: "none"
                }}
                />
            </div>
            </StepperPanel>


          </Stepper>
          <style>{`
            .p-stepper .p-stepper-header.p-highlight .p-stepper-number {
              background-color: var(--variant-one);
            }
            .p-stepper .p-stepper-header:has(~ .p-highlight) .p-stepper-separator {
              background-color: var(--variant-one);
            }
            .custom-backdrop {
              backdrop-filter: blur(40px);
              -webkit-backdrop-filter: blur(40px);
              background-color: rgba(0, 0, 0, 0.6);
            }
            .p-stepper button,
            .p-stepper .p-button {
              border-radius: 0.5rem !important;
              border: none;
            }
          `}</style>
        </Modal.Body>
      </Modal>

      <FormsClientBackoffice
        showModal={showClientModal}
        closeModal={handleCloseClientModal}
        refreshTable={refreshTable}
        onClientCreated={handleClientCreated}
      />
    </>
  );
}
