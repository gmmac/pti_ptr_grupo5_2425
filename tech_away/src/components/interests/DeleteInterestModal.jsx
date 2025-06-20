import React from "react";
import { Modal, Stack, Button } from "react-bootstrap";

export default function DeleteInterestModal({
  show,
  setShow,
  onConfirm,
  reopenDetails,
}) {
  return (
    <Modal show={show} centered>
      <Modal.Header>
        <Stack
          direction="horizontal"
          gap={2}
          className="justify-content-between align-items-center w-100"
        >
          <h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
            Delete Interest
          </h5>
          <Button
            variant="close"
            onClick={() => {
              setShow(false);
              reopenDetails();
            }}
          />
        </Stack>
      </Modal.Header>

      <Modal.Body>
        <Stack gap={4}>
          <p
            style={{ fontSize: "15px", fontFamily: "var(--body-font)" }}
            className="m-0"
          >
            Are you sure you want to delete this interest? This action cannot be
            undone.
          </p>

          <Stack
            direction="horizontal"
            gap={2}
            className="justify-content-center text-muted p-3"
            style={{
              backgroundColor: "#edcccf",
              borderRadius: "16px",
            }}
          >
            <i className="pi pi-exclamation-triangle"></i>
            <p className="m-0">
              Deleting this interest will permanently remove it from the system,
              and you will no longer be notified if a similar product becomes
              available.
            </p>
          </Stack>

          <Stack direction="horizontal" gap={3}>
            <Button
              variant="secondary"
              className="rounded-pill w-100"
              onClick={() => {
                setShow(false);
                reopenDetails();
              }}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              className="rounded-pill w-100 text-white"
              onClick={() => {
                onConfirm();
                setShow(false);
              }}
            >
              Delete
            </Button>
          </Stack>
        </Stack>
      </Modal.Body>
    </Modal>
  );
}
