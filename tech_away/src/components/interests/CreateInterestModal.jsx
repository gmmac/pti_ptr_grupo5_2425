import React, { useEffect, useState } from "react";
import { Modal, Stack, Button, Form } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";
import ComponentSelectorModalForm from "./ComponentSelectorModalForm";
import EquipmentSheetModal from "./EquipmentSheetModal";

export default function CreateInterestModal({ show, setShow }) {
  const [brandModal, setBrandModal] = useState(false);
  const [modelModal, setModelModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [equipmentSheetModal, setEquipmentSheetModal] = useState(false);
  const [sheetSelected, setSheetSelected] = useState(false);
  const { createGenericInterest } = useInterests();

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
    equipmentStatusID: { id: "", name: "" },
    minLaunchYear: "",
    maxLaunchYear: "",
    minPrice: "",
    maxPrice: "",
    preferredStoreIDs: [""],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleStoreChange = (index, value) => {
    const updatedStores = [...formData.preferredStoreIDs];
    updatedStores[index] = value;
    setFormData((prev) => ({ ...prev, preferredStoreIDs: updatedStores }));
  };

  const addStoreField = () => {
    setFormData((prev) => ({
      ...prev,
      preferredStoreIDs: [...prev.preferredStoreIDs, ""],
    }));
  };

  useEffect(() => {
    if (sheetSelected) {
      setFormData((prev) => ({
        ...prev,
        brandID: { ...formData.equipmentSheet.brand },
        modelID: { ...formData.equipmentSheet.model },
        typeID: { ...formData.equipmentSheet.type },
      }));
    }
    setSheetSelected(false);
  }, [sheetSelected]);

  return (
    <>
      <Modal show={show} centered size="lg">
        <Modal.Header>
          <Stack
            direction="horizontal"
            className="w-100 justify-content-between"
          >
            <h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
              Create New Interest
            </h5>
            <Button variant="close" onClick={() => setShow(false)} />
          </Stack>
        </Modal.Header>
        <Modal.Body>
          <Form>
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
                <Stack direction="horizontal" className="mb-2" gap={2}>
                  <Form.Control
                    type="text"
                    name="equipmentSheetID"
                    className="rounded-pill"
                    value={formData.equipmentSheet.id}
                    readOnly
                  />
                  <Button
                    className="rounded-pill mt-2 w-50"
                    style={{
                      backgroundColor: "var(--variant-one)",
                      border: "none",
                    }}
                    onClick={() => setEquipmentSheetModal(true)}
                  >
                    Select Equipment Sheet
                  </Button>
                  <Button
                    className="rounded-pill mt-2"
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
                <Stack direction="horizontal" className="mb-2" gap={2}>
                  <Form.Control
                    type="text"
                    name="brandID"
                    className="rounded-pill"
                    value={formData.brandID.name}
                    readOnly
                  />
                  <Button
                    className="rounded-pill mt-2 w-50"
                    style={{
                      backgroundColor: "var(--variant-one)",
                      border: "none",
                    }}
                    onClick={() => setBrandModal(true)}
                  >
                    Select Brand
                  </Button>
                  <Button
                    className="rounded-pill mt-2"
                    style={{
                      backgroundColor: "var(--variant-one)",
                      border: "none",
                    }}
                    variant="secondary"
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
                <Stack direction="horizontal" className="mb-2" gap={2}>
                  <Form.Control
                    type="text"
                    name="modelID"
                    className="rounded-pill"
                    value={formData.modelID.name}
                    readOnly
                  />
                  <Button
                    className="rounded-pill mt-2 w-50"
                    style={{
                      backgroundColor: "var(--variant-one)",
                      border: "none",
                    }}
                    onClick={() => setModelModal(true)}
                  >
                    Select Model
                  </Button>
                  <Button
                    className="rounded-pill mt-2"
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
                <Stack direction="horizontal" className="mb-2" gap={2}>
                  <Form.Control
                    type="text"
                    name="typeID"
                    className="rounded-pill"
                    value={formData.typeID.name}
                    readOnly
                  />
                  <Button
                    className="rounded-pill mt-2 w-50"
                    style={{
                      backgroundColor: "var(--variant-one)",
                      border: "none",
                    }}
                    onClick={() => setTypeModal(true)}
                  >
                    Select Type
                  </Button>
                  <Button
                    className="rounded-pill mt-2"
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
          </Form>
        </Modal.Body>
      </Modal>

      {/* MODALS */}
      <ComponentSelectorModalForm
        showModal={brandModal}
        setShowModal={setBrandModal}
        routeName={"brand"}
        title="Select Brand"
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, brandID: selected }))
        }
      />
      <ComponentSelectorModalForm
        showModal={modelModal}
        setShowModal={setModelModal}
        routeName={"model"}
        title="Select Model"
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, modelID: selected }))
        }
      />
      <ComponentSelectorModalForm
        showModal={typeModal}
        setShowModal={setTypeModal}
        routeName={"type"}
        title="Select Type"
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, typeID: selected }))
        }
      />
      <EquipmentSheetModal
        showModal={equipmentSheetModal}
        setShowModal={setEquipmentSheetModal}
        onSelect={(selected) =>
          setFormData((prev) => ({ ...prev, equipmentSheet: selected }))
        }
        setSeetSelected={setSheetSelected}
      />
    </>
  );
}
