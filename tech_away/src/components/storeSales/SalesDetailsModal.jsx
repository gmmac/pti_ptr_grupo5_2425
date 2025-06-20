import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import api from "../../utils/axios";

export default function SalesDetailsModal({ saleId, visible, onHide }) {
  const [saleDetails, setSaleDetails] = useState(null);

  useEffect(() => {
    if (visible && saleId) {
      api.get(`api/clientPurchase/details/${saleId}`)
        .then((res) => setSaleDetails(res.data))
        .catch((err) => console.error("Error loading sale details:", err));
    }
  }, [visible, saleId]);

  return (
    <Dialog
      header={`Sale number: ${saleId}`}
      visible={visible}
      style={{ width: "70vw", maxWidth: "900px" }}
      onHide={onHide}
      draggable={false}
    >
      {saleDetails ? (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          
          {/* TOP SUMMARY */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
          }}>
            <div style={{ flex: "1 1 250px" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#555" }}>Date of Sale</div>
              <div>{new Date(saleDetails.sale.createdAt).toLocaleDateString()}</div>
            </div>
            <div style={{ flex: "1 1 250px" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#555" }}>Order Status</div>
              <div>{saleDetails.sale.state}</div>
            </div>
            <div style={{ flex: "1 1 250px" }}>
              <div style={{ fontWeight: "bold", fontSize: "0.9rem", color: "#555" }}>Last Update</div>
              <div>{new Date(saleDetails.sale.updatedAt).toLocaleDateString()}</div>
            </div>
          </div>

          <Divider />

          {/* INFO COLUMNS */}
          <div style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            justifyContent: "space-between",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
          }}>
            <div style={{ flex: "1 1 250px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>Client</div>
              <div>{saleDetails.sale.client?.name}</div>
              <div>{saleDetails.sale.client?.nic}</div>
            </div>
            <div style={{ flex: "1 1 250px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>Employee</div>
              <div>{saleDetails.sale.employee?.name}</div>
              <div>{saleDetails.sale.employee?.nic}</div>
            </div>
            <div style={{ flex: "1 1 250px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "0.3rem" }}>Store</div>
              <div>{saleDetails.sale.store?.name || "—"}</div>
              <div>{saleDetails.sale.store?.address || "—"}</div>
            </div>
          </div>

          <Divider />

          {/* ITEMS + TOTAL */}
          <div style={{
            display: "flex",
            justifyContent: "space-between",
            flexWrap: "wrap",
            alignItems: "center",
            gap: "0.5rem",
            paddingLeft: "0.5rem",
            paddingRight: "0.5rem"
          }}>
            <div style={{ fontWeight: "bold" }}>
              {saleDetails.equipments.length} Items Sold
            </div>
            <div style={{ fontWeight: "bold" }}>
              Total Price: {saleDetails.sale.total.toFixed(2)} €
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            {saleDetails.equipments.slice()
                .sort((a, b) => a.id - b.id)
                .map((eq, idx) => (
              <div
                key={idx}
                style={{
                  background: "#f9f9f9",
                  borderRadius: "8px",
                  padding: "0.7rem 1rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  marginLeft: "0.25rem",
                  marginRight: "0.25rem"
                }}
              >
                <div>
                  <div style={{ fontWeight: "bold" }}> ID: {eq.id} - {eq.name}</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>{eq.brand}</div>
                  <div style={{ fontSize: "0.85rem", color: "#666" }}>Status: {eq.status}</div>
                </div>
                <div style={{ fontWeight: "bold" }}>{eq.price?.toFixed(2)} €</div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </Dialog>
  );
}
