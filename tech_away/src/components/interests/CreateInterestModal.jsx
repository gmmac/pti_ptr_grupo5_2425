import React, { useEffect, useState } from "react";
import { Modal, Stack, Button, Form } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";
import ComponentSelectorModalForm from "./ComponentSelectorModalForm";

export default function CreateInterestModal({ show, setShow }) {
  const [brandModal, setBrandModal] = useState(false);
  const [modelModal, setModelModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const { createGenericInterest } = useInterests();
  const [formData, setFormData] = useState({
    brandID: { id: "", name: "" },
    modelID: { id: "", name: "" },
    typeID: { id: "", name: "" },
    equipmentSheetID: { id: "", name: "" },
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
    console.log(formData);
  }, [formData]);

  return (
    <>
      <Modal show={show} centered>
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
              className="p-3"
              direction="vertical"
              gap={3}
              style={{
                backgroundColor: "var(--variant-one-light)",
                borderRadius: "16px",
              }}
            >
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
                    className="rounded-pill mt-2 "
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
              <Form.Group controlId="modelID">
                <Form.Label className="text-muted ms-1">Model</Form.Label>
                <Stack direction="horizontal" className="mb-2" gap={2}>
                  <Form.Control
                    type="text"
                    name="ModelID"
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
                    className="rounded-pill mt-2 "
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
              <Form.Group controlId="typeID">
                <Form.Label className="text-muted ms-1">Type</Form.Label>
                <Stack direction="horizontal" className="mb-2" gap={2}>
                  <Form.Control
                    type="text"
                    name="TypelID"
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
                    className="rounded-pill mt-2 "
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
    </>
  );
}
