import React, { useEffect, useState } from "react";
import { Modal, Stack, Button, Form } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";
import ComponentSelectorModalForm from "./ComponentSelectorModalForm";
import EquipmentSheetModal from "./EquipmentSheetModal";

export default function CreateInterestModal({ show, setShow }) {
  /* ---------- modal visibility ---------- */
  const [brandModal, setBrandModal] = useState(false);
  const [modelModal, setModelModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [equipmentSheetModal, setEquipmentSheetModal] = useState(false);
  const [stateModal, setStateModal] = useState(false);

  const isChildOpen =
    brandModal || modelModal || typeModal || equipmentSheetModal || stateModal;

  /* ---------- data ---------- */
  const [sheetSelected, setSheetSelected] = useState(false);

  const [formData, setFormData] = useState({
    brandID: { id: "", name: "" },
    modelID: { id: "", name: "" },
    typeID: { id: "", name: "" },
    equipmentSheet: {
      id: "",
      brand: { id: "", name: "" },
      model: { id: "", name: "" },
      type: { id: "", name: "" },
    },
    equipmentStatusID: { id: "", state: "" }, // usa .state
    minLaunchYear: "",
    maxLaunchYear: "",
    minPrice: "",
    maxPrice: "",
    preferredStoreIDs: [""],
  });

  /* ---------- copy brand/model/type from sheet ---------- */
  useEffect(() => {
    if (sheetSelected) {
      setFormData((prev) => ({
        ...prev,
        brandID: { ...prev.equipmentSheet.brand },
        modelID: { ...prev.equipmentSheet.model },
        typeID: { ...prev.equipmentSheet.type },
      }));
      setSheetSelected(false);
    }
  }, [sheetSelected]);

  /* ---------- clear sheet if brand/model/type change ---------- */
  useEffect(() => {
    const sheet = formData.equipmentSheet;
    if (!sheet.id) return;

    const same =
      sheet.brand.id === formData.brandID.id &&
      sheet.model.id === formData.modelID.id &&
      sheet.type.id === formData.typeID.id;

    if (!same) {
      setFormData((prev) => ({
        ...prev,
        equipmentSheet: {
          id: "",
          brand: { id: "", name: "" },
          model: { id: "", name: "" },
          type: { id: "", name: "" },
        },
      }));
    }
  }, [formData.brandID, formData.modelID, formData.typeID]);

  /* ---------- render ---------- */
  return (
    <>
      {/* MAIN MODAL ---------------------------------------------- */}
      <Modal
        show={show && !isChildOpen}
        centered
        size="lg"
        onHide={() => setShow(false)}
        style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "var(--title-font)" }}>
            Create New Interest
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form>
            <Stack direction="horizontal" gap={3}>
              {/* ----------- LEFT COLUMN (Sheet, Brand, Model, Type) ----------- */}
              <Stack
                className="p-3 flex-wrap"
                direction="vertical"
                gap={3}
                style={{
                  backgroundColor: "var(--variant-one-light)",
                  borderRadius: "16px",
                }}
              >
                {/* Equipment Sheet */}
                <Form.Group controlId="equipmentSheetID">
                  <Form.Label className="text-muted ms-1">
                    Equipment Sheet
                  </Form.Label>
                  <Stack direction="horizontal" gap={2}>
                    <Form.Control
                      value={formData.equipmentSheet.id}
                      readOnly
                      className="rounded-pill"
                    />
                    <Button
                      className="rounded-pill w-50"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() => setEquipmentSheetModal(true)}
                    >
                      Select Equipment Sheet
                    </Button>
                    <Button
                      className="rounded-pill"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          equipmentSheet: {
                            id: "",
                            brand: { id: "", name: "" },
                            model: { id: "", name: "" },
                            type: { id: "", name: "" },
                          },
                          brandID: { id: "", name: "" },
                          modelID: { id: "", name: "" },
                          typeID: { id: "", name: "" },
                        }))
                      }
                    >
                      Clear
                    </Button>
                  </Stack>
                </Form.Group>

                {/* Brand */}
                <Form.Group controlId="brandID">
                  <Form.Label className="text-muted ms-1">Brand</Form.Label>
                  <Stack direction="horizontal" gap={2}>
                    <Form.Control
                      value={formData.brandID.name}
                      readOnly
                      className="rounded-pill"
                    />
                    <Button
                      className="rounded-pill w-50"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() => setBrandModal(true)}
                    >
                      Select Brand
                    </Button>
                    <Button
                      className="rounded-pill"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          brandID: { id: "", name: "" },
                        }))
                      }
                    >
                      Clear
                    </Button>
                  </Stack>
                </Form.Group>

                {/* Model */}
                <Form.Group controlId="modelID">
                  <Form.Label className="text-muted ms-1">Model</Form.Label>
                  <Stack direction="horizontal" gap={2}>
                    <Form.Control
                      value={formData.modelID.name}
                      readOnly
                      className="rounded-pill"
                    />
                    <Button
                      className="rounded-pill w-50"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() => setModelModal(true)}
                    >
                      Select Model
                    </Button>
                    <Button
                      className="rounded-pill"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          modelID: { id: "", name: "" },
                        }))
                      }
                    >
                      Clear
                    </Button>
                  </Stack>
                </Form.Group>

                {/* Type */}
                <Form.Group controlId="typeID">
                  <Form.Label className="text-muted ms-1">Type</Form.Label>
                  <Stack direction="horizontal" gap={2}>
                    <Form.Control
                      value={formData.typeID.name}
                      readOnly
                      className="rounded-pill"
                    />
                    <Button
                      className="rounded-pill w-50"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() => setTypeModal(true)}
                    >
                      Select Type
                    </Button>
                    <Button
                      className="rounded-pill"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          typeID: { id: "", name: "" },
                        }))
                      }
                    >
                      Clear
                    </Button>
                  </Stack>
                </Form.Group>
              </Stack>

              {/* ----------- RIGHT COLUMN (State) ----------- */}
              <Stack
                className="p-3 flex-wrap"
                direction="vertical"
                gap={3}
                style={{
                  backgroundColor: "var(--variant-one-light)",
                  borderRadius: "16px",
                }}
              >
                <Form.Group controlId="equipmentStatusID">
                  <Form.Label className="text-muted ms-1">State</Form.Label>
                  <Stack direction="horizontal" gap={2}>
                    <Form.Control
                      value={formData.equipmentStatusID.state}
                      readOnly
                      className="rounded-pill"
                    />
                    <Button
                      className="rounded-pill w-50"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() => setStateModal(true)}
                    >
                      Select State
                    </Button>
                    <Button
                      className="rounded-pill"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none",
                      }}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          equipmentStatusID: { id: "", state: "" },
                        }))
                      }
                    >
                      Clear
                    </Button>
                  </Stack>
                </Form.Group>
              </Stack>
            </Stack>
          </Form>
        </Modal.Body>
      </Modal>

      {/* CHILD MODALS ------------------------------------------- */}
      <EquipmentSheetModal
        showModal={equipmentSheetModal}
        setShowModal={setEquipmentSheetModal}
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, equipmentSheet: selected }))
        }
        setSeetSelected={setSheetSelected}
      />

      <ComponentSelectorModalForm
        showModal={brandModal}
        setShowModal={setBrandModal}
        routeName="brand"
        title="Select Brand"
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, brandID: selected }))
        }
      />

      <ComponentSelectorModalForm
        showModal={modelModal}
        setShowModal={setModelModal}
        routeName="model"
        title="Select Model"
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, modelID: selected }))
        }
      />

      <ComponentSelectorModalForm
        showModal={typeModal}
        setShowModal={setTypeModal}
        routeName="type"
        title="Select Type"
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, typeID: selected }))
        }
      />

      <ComponentSelectorModalForm
        showModal={stateModal}
        setShowModal={setStateModal}
        routeName="equipmentStatus"
        title="Select State"
        displayField="state" /* devolve .state */
        onSelect={(selected) =>
          setFormData((prev) => ({
            ...prev,
            equipmentStatusID: { id: selected.id, state: selected.state },
          }))
        }
      />
    </>
  );
}
