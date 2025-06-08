import React from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";

export default function DetailsModal({
  show,
  setShow,
  interest,
  openDeleteModal,
  
}) {
  if (!interest) return null;

  return (
    <Modal
      show={show}
      onHide={() => setShow(false)}
      centered
      style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "var(--title-font)" }}>
          Interest Details
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col xs={12} lg={6}>
            <Stack
              direction="vertical"
              className="p-3 align-items-start"
              style={{
                backgroundColor: "var(--variant-two-light)",
                borderRadius: "16px",
              }}
            >
              <p>
                <strong>Model:</strong> {interest.model?.name || "—"}
              </p>
              <p>
                <strong>Brand:</strong> {interest.brand?.name || "—"}
              </p>
              <p>
                <strong>Type:</strong> {interest.type?.name || "—"}
              </p>
              <div>
                <strong>Preferred Stores:</strong>{" "}
                {interest.preferredStores?.length > 0
                  ? interest.preferredStores.map((s, i) => (
                      <span key={i}>
                        {s.store?.name || s.storeId}
                        {i < interest.preferredStores.length - 1 && ", "}
                      </span>
                    ))
                  : "—"}
              </div>
            </Stack>
          </Col>
          <Col xs={12} lg={6}>
            <Stack
              direction="vertical"
              className="p-3 align-items-start"
              style={{
                backgroundColor: "var(--variant-two-light)",
                borderRadius: "16px",
              }}
            >
              <p>
                <strong>Min Year:</strong> {interest.minLaunchYear || "—"}
              </p>
              <p>
                <strong>Max Year:</strong> {interest.maxLaunchYear || "—"}
              </p>
              <p>
                <strong>Min Price:</strong>{" "}
                {interest.minPrice
                  ? interest.minPrice.toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    })
                  : "—"}
              </p>
              <p>
                <strong>Max Price:</strong>{" "}
                {interest.maxPrice
                  ? interest.maxPrice.toLocaleString("pt-PT", {
                      style: "currency",
                      currency: "EUR",
                    })
                  : "—"}
              </p>
              <p>
                <strong>Created:</strong>{" "}
                {new Date(interest.createdAt).toLocaleDateString("pt-PT")}
              </p>
            </Stack>
          </Col>
        </Row>
      </Modal.Body>
      <Modal.Footer>
        <p
          className="px-4 d-flex flex-row align-items-center gap-2 text-muted"
          style={{
            cursor: "pointer",
            fontSize: "14px",
            color: "var(--dark-grey)",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "red")}
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--dark-grey)")
          }
          onClick={() => {
            setShow(false);
            openDeleteModal();
          }}
        >
          <i className="pi pi-trash" style={{ fontSize: "14px" }} />
          <span>Delete this Interest</span>
        </p>
      </Modal.Footer>
    </Modal>
  );
}
