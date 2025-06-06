import React, { useState } from "react";
import { Card, Row, Col } from "react-bootstrap";
import { confirmDialog } from "primereact/confirmdialog";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";

export default function UsedEquipmentCardView({
  usedEquipments,
  onEdit,
  isActiveFilter,
  actionFilter,
  onDelete,
  putOnSale,
  handleDonate
}) {
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [price, setPrice] = useState(null);

  const handleOpenPriceModal = (equipment) => {
    setSelectedEquipment(equipment);
    setPrice(null);
    setShowPriceModal(true);
  };

  const handleConfirmPutOnSale = () => {
    if (selectedEquipment && price && price > 0) {
      putOnSale(selectedEquipment, price);
      setShowPriceModal(false);
    }
  };

  return (
    <>
      <Row className="g-3 d-lg-none">
        {usedEquipments.map((equipment, index) => (
          <Col key={index} xs={12}>
            <Card className="shadow-sm rounded p-3">
              <Card.Body>
                <Card.Title className="fw-bold">
                  ID: {equipment?.id}
                  <br />
                  {equipment?.EquipmentSheet?.brandModel || "Unknown Model"}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {equipment?.EquipmentSheet?.EquipmentType?.name || "Unknown Type"}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Store:</strong> {equipment?.Store?.name || equipment.storeId}
                  <br />
                  <strong>Status:</strong> {equipment?.EquipmentStatus?.state || "N/A"}
                  <br />

                  {isActiveFilter === "0" && (
                    <>
                      <strong>Store Price:</strong> €
                      {equipment.price?.toFixed(2) || "N/A"}
                      <br />
                    </>
                  )}

                  {actionFilter === "D" && (
                    <>
                      <strong>Donate Date:</strong>{" "}
                      {equipment.Purchase?.purchaseDate
                        ? new Date(equipment.Purchase.purchaseDate).toLocaleDateString("pt-PT")
                        : "———"}
                      <br />
                    </>
                  )}

                  {isActiveFilter === "new" && (
                    <>
                      <strong>Purchase Price:</strong>{" "}
                      {equipment.Purchase?.purchasePrice != null
                        ? `€${equipment.Purchase.purchasePrice.toFixed(2)}`
                        : "———"}
                      <br />
                    </>
                  )}

                  {isActiveFilter !== "new" &&
                    isActiveFilter !== "1" &&
                    actionFilter !== "D" &&
                    actionFilter !== "S" && (
                      <>
                        <strong>Put on Sale:</strong>{" "}
                        {equipment.putOnSaleDate
                          ? new Date(equipment.putOnSaleDate).toLocaleDateString("pt-PT")
                          : "———"}
                        <br />
                      </>
                    )}

                  {actionFilter === "S" && (
                    <>
                      <strong>Sold Price:</strong>{" "}
                      {equipment.price ? `€${equipment.price.toFixed(2)}` : "———"}
                      <br />
                      <strong>Sale Date:</strong>{" "}
                      {equipment.Purchase?.purchaseDate
                        ? new Date(equipment.Purchase.purchaseDate).toLocaleDateString("pt-PT")
                        : "———"}
                      <br />
                    </>
                  )}
                </Card.Text>

                <div className="d-flex gap-2 justify-content-center align-items-center">
                  {isActiveFilter === "new" && equipment.Purchase?.purchasePrice !== 0 &&(
                    <Button
                      icon="pi pi-cart-plus"
                      label="Put on Sale"
                      className="p-button-rounded p-button-secondary"
                      aria-label="Put on Sale"
                      style={{
                        backgroundColor: "var(--variant-two)",
                        color: "white",
                        border: "none",
                      }}
                      onClick={() => handleOpenPriceModal(equipment)}
                    />
                  )}

                  {isActiveFilter === "new" && equipment.Purchase?.purchasePrice === 0 && (
                    <Button
                      icon="pi pi-gift"
                      label="Donate"
                      className="p-button-rounded p-button-secondary"
                      aria-label="Donate"
                      style={{
                        backgroundColor: "var(--variant-two)",
                        color: "white",
                        border: "none",
                      }}
                      onClick={() => handleDonate(equipment)}
                    />
                  )}

                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>

      {/* Modal para definir preço de venda */}
      <Dialog
        header="Set Sale Price"
        visible={showPriceModal}
        style={{ width: "400px" }}
        onHide={() => setShowPriceModal(false)}
        modal
        footer={
          <div className="d-flex justify-content-end gap-2">
            <Button
              label="Cancel"
              severity="secondary"
              className="p-button-text"
              onClick={() => setShowPriceModal(false)}
            />
            <Button
              label="Put on Sale"
              icon="pi pi-check"
              onClick={handleConfirmPutOnSale}
              disabled={!price || price <= 0}
            />
          </div>
        }
      >
        <div className="p-fluid">
          <div className="field">
            <label htmlFor="price">Price (€)</label>
            <InputNumber
              id="price"
              inputId="currency-eur"
              mode="currency"
              currency="EUR"
              locale="en-US"
              value={price}
              onValueChange={(e) => setPrice(e.value)}
              placeholder="Enter sale price"
              min={0}
            />
          </div>
        </div>
      </Dialog>
    </>
  );
}
