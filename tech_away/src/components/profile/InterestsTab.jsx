import React, { useState } from "react";
import { Button, Stack } from "react-bootstrap";
import FolderStack from "./FolderStack";
import FolderContent from "./FolderContent";
import CreateInterestModal from "../interests/createInterestModal";

export default function InterestsTab() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <Stack
        direction="vertical"
        className="p-4"
        gap={3}
        style={{
          fontFamily: "var(--body-font)",
          backgroundColor: "var(--white)",
          borderRadius: "var(--rounded-sm)",
          boxShadow: "var(--shadow-default)",
        }}
      >
        <Stack direction="horizontal" className="justify-content-between">
          <h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
            My Interests
          </h5>

          <Button
            className="rounded-pill py-2 px-3 d-flex gap-2 justify-content-center align-items-center gap-2"
            style={{
              backgroundColor: "var(--variant-two)",
              color: "var(--white)",
              border: "none",
            }}
            onClick={() => setShowModal(true)}
          >
            <i className="pi pi-heart"></i>
            <span>Add New Interest</span>
          </Button>
        </Stack>
        <Stack direction="vertical" gap={4}>
          <FolderStack />
          <FolderContent />
        </Stack>
      </Stack>

      <CreateInterestModal show={showModal} setShow={setShowModal} />
    </>
  );
}
