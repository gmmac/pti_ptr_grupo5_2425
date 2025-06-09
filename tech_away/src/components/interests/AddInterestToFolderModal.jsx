import React from "react";
import { Col, Modal, Row, Stack } from "react-bootstrap";

export default function AddInterestToFolderModal({ show, setShow, folder }) {
  return (
    <Modal
      show={show}
      centered
      size="lg"
      onHide={() => setShow(false)}
      style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
    >
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "var(--title-font)" }}>
          Add Interests to {folder?.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row className="align-items-stretch">
          <Col xs={12} lg={6} className="d-flex flex-column">
            <Stack
              direction="vertical"
              className="p-3 align-items-start h-100"
              style={{
                backgroundColor: "var(--variant-two-light)",
                borderRadius: "16px",
              }}
            ></Stack>
          </Col>
          <Col xs={12} lg={6} className="d-flex flex-column">
            <Stack
              direction="vertical"
              className="p-3 align-items-start h-100"
              style={{
                backgroundColor: "var(--variant-two-light)",
                borderRadius: "16px",
              }}
            ></Stack>
          </Col>
        </Row>
      </Modal.Body>
    </Modal>
  );
}
