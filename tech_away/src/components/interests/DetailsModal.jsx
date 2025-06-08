import React from "react";
import { Col, Modal, Row, Stack, Button } from "react-bootstrap";

export default function DetailsModal({ show, setShow, interest }) {
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
          {/* Coluna 1: Dados principais */}
          <Col xs={12} lg={6} className="d-flex flex-column">
            <Stack
              direction="vertical"
              gap={2}
              className="p-3 "
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
                  ? interest.preferredStores.map((store, index) => (
                      <span key={index}>
                        {store.store?.name || store.storeId}
                        {index < interest.preferredStores.length - 1 && ", "}
                      </span>
                    ))
                  : "—"}
              </div>
            </Stack>
          </Col>

          {/* Coluna 2: Dados complementares */}
          <Col xs={12} lg={6} className="d-flex flex-column">
            <Stack
              direction="vertical"
              gap={2}
              className="p-3 align-items-start"
              style={{
                backgroundColor: "var(--variant-two-light)",
                borderRadius: "16px",
              }}
            >
              <p>
                <strong>Min Launch Year:</strong>{" "}
                {interest.minLaunchYear || "—"}
              </p>
              <p>
                <strong>Max Launch Year:</strong>{" "}
                {interest.maxLaunchYear || "—"}
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
                <strong>Creation Date:</strong>{" "}
                {new Date(interest.createdAt).toLocaleDateString("pt-PT")}
              </p>
            </Stack>
          </Col>
        </Row>
      </Modal.Body>

      <Modal.Footer>
        <Button
          variant="secondary"
          onClick={() => setShow(false)}
          className="rounded-pill px-4"
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
