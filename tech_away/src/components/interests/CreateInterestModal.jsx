import React, { useEffect, useState } from "react";
import { Modal, Stack, Button, Form, Row, Col } from "react-bootstrap";
import { useInterests } from "../../contexts/InterestsProvider";
import ComponentSelectorModalForm from "./ComponentSelectorModalForm";
import EquipmentSheetModal from "./EquipmentSheetModal";
import SelectStoresModal from "./SelectStoresModal";

export default function CreateInterestModal({ show, setShow }) {
  /* ---------- modal visibility ---------- */
  const [brandModal, setBrandModal] = useState(false);
  const [modelModal, setModelModal] = useState(false);
  const [typeModal, setTypeModal] = useState(false);
  const [equipmentSheetModal, setEquipmentSheetModal] = useState(false);
  const [stateModal, setStateModal] = useState(false);
  const [storesModal, setStoresModal] = useState(false);

  const isChildOpen =
    brandModal ||
    modelModal ||
    typeModal ||
    equipmentSheetModal ||
    stateModal ||
    storesModal;

  /* ---------- years  ---------- */
  const startYear = 1995;
  const currentYear = new Date().getFullYear();

  // 1) gerar logo decrescente
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  /* ---------- price ---------- */
  const PRICE_MIN = 0;
  const PRICE_MAX = 1000;
  const STEP = 25;

  const priceOptions = Array.from(
    { length: (PRICE_MAX - PRICE_MIN) / STEP + 1 },
    (_, i) => PRICE_MIN + i * STEP
  );

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
    description: "",
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

  /* ---------- helpers ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

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
            <Row>
              {/* ----------- LEFT COLUMN (Sheet, Brand, Model, Type) ----------- */}
              <Col lg={6} md={12} className="mb-3">
                <Stack
                  className="p-3 flex-wrap"
                  direction="vertical"
                  gap={4}
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

                    <Form.Control
                      value={formData.equipmentSheet.id}
                      readOnly
                      className="rounded-pill mb-2"
                    />
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="justify-content-stretch"
                    >
                      <Button
                        className="rounded-pill w-100"
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
                        variant="secondary"
                        disabled={!formData.equipmentSheet.id}
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

                    <Form.Control
                      value={formData.brandID.name}
                      readOnly
                      className="rounded-pill mb-2"
                    />
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        className="rounded-pill w-100"
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
                        variant="secondary"
                        disabled={!formData.brandID.id}
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
                    <Form.Control
                      value={formData.modelID.name}
                      readOnly
                      className="rounded-pill mb-2"
                    />
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        className="rounded-pill w-100"
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
                        variant="secondary"
                        disabled={!formData.modelID.id}
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
                    <Form.Control
                      value={formData.typeID.name}
                      readOnly
                      className="rounded-pill mb-2"
                    />
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        className="rounded-pill w-100"
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
                        variant="secondary"
                        disabled={!formData.typeID.id}
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
              </Col>
              {/* ----------- RIGHT COLUMN ----------- */}
              <Col lg={6} md={12} className="mb-3">
                <Stack
                  className="p-3"
                  direction="vertical"
                  gap={4}
                  style={{
                    backgroundColor: "var(--variant-one-light)",
                    borderRadius: "16px",
                  }}
                >
                  <Form.Group controlId="equipmentStatusID">
                    <Form.Label className="text-muted ms-1">State</Form.Label>
                    <Form.Control
                      value={formData.equipmentStatusID.state}
                      readOnly
                      className="rounded-pill mb-2"
                    />
                    <Stack direction="horizontal" gap={2}>
                      <Button
                        className="rounded-pill w-100"
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
                        variant="secondary"
                        disabled={!formData.equipmentStatusID.id}
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
                  {/* Launch Year */}
                  <Stack
                    direction="horizontal"
                    gap={3}
                    className="align-items-end justify-content-between"
                  >
                    {/* minLaunchYear */}
                    <Form.Group controlId="minLaunchYear" className="">
                      <Form.Label className="text-muted ms-1">
                        Min Year
                      </Form.Label>

                      <Form.Select
                        name="minLaunchYear"
                        className="rounded-pill"
                        value={formData.minLaunchYear}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            minLaunchYear: e.target.value,
                          }))
                        }
                      >
                        <option value="">—</option>
                        {years.map((y) => (
                          <option key={y} value={y}>
                            {y}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>

                    {/* maxLaunchYear */}
                    <Form.Group controlId="maxLaunchYear" className="">
                      <Form.Label className="text-muted ms-1">
                        Max Year
                      </Form.Label>
                      <Stack direction="horizontal" gap={2}>
                        <Form.Select
                          name="maxLaunchYear"
                          className="rounded-pill "
                          value={formData.maxLaunchYear}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              maxLaunchYear: e.target.value,
                            }))
                          }
                        >
                          <option value="">—</option>
                          {years.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </Form.Select>
                      </Stack>
                    </Form.Group>

                    <Button
                      className="rounded-pill"
                      variant="secondary"
                      disabled={
                        !formData.minLaunchYear && !formData.maxLaunchYear
                      }
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          minLaunchYear: "",
                          maxLaunchYear: "",
                        }))
                      }
                    >
                      Clear
                    </Button>
                  </Stack>
                  {/* Price Range */}
                  <Stack
                    direction="horizontal"
                    gap={3}
                    className="align-items-end justify-content-between"
                  >
                    {/* minPrice */}
                    <Form.Group controlId="minPrice" className="">
                      <Form.Label className="text-muted ms-1">
                        Min Price
                      </Form.Label>
                      <Form.Select
                        name="minPrice"
                        className="rounded-pill"
                        value={formData.minPrice}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            minPrice: e.target.value,
                          }))
                        }
                      >
                        <option value="">—</option>
                        {priceOptions.map((price) => (
                          <option key={price} value={price}>
                            {price.toLocaleString("pt-PT", {
                              style: "currency",
                              currency: "EUR",
                            })}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                    {/* maxPrice */}
                    <Form.Group controlId="maxPrice" className="">
                      <Form.Label className="text-muted ms-1">
                        Max Price
                      </Form.Label>
                      <Stack direction="horizontal" gap={2}>
                        <Form.Select
                          name="maxPrice"
                          className="rounded-pill"
                          value={formData.maxPrice}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              maxPrice: e.target.value,
                            }))
                          }
                        >
                          <option value="">—</option>
                          {priceOptions.map((price) => (
                            <option key={price} value={price}>
                              {price.toLocaleString("pt-PT", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </option>
                          ))}
                        </Form.Select>
                      </Stack>
                    </Form.Group>

                    <Button
                      className="rounded-pill"
                      variant="secondary"
                      disabled={!formData.minPrice && !formData.maxPrice}
                      onClick={() =>
                        setFormData((prev) => ({
                          ...prev,
                          minPrice: "",
                          maxPrice: "",
                        }))
                      }
                    >
                      Clear
                    </Button>
                  </Stack>
                  {/* Preferred Stores */}
                  <Form.Group controlId="preferredStoreIDs">
                    <Form.Label className="text-muted ms-1">
                      Preferred Stores
                    </Form.Label>
                    <Stack direction="horizontal" gap={2}>
                      <Form.Control
                        value={
                          formData.preferredStoreIDs.length
                            ? formData.preferredStoreIDs.join(", ")
                            : ""
                        }
                        readOnly
                        className="rounded-pill mb-2"
                      />
                      <Button
                        className="rounded-pill w-100"
                        style={{
                          backgroundColor: "var(--variant-one)",
                          border: "none",
                        }}
                        onClick={() => setStoresModal(true)}
                      >
                        Select Stores
                      </Button>
                    </Stack>
                  </Form.Group>
                  {/* Description */}
                  <Form.Group controlId="description">
                    <Form.Label className="text-muted ms-1">
                      Description
                    </Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      style={{ borderRadius: "16px" }}
                      placeholder="Describe your interest..."
                    />
                  </Form.Group>
                </Stack>
              </Col>
            </Row>
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

      <SelectStoresModal
        showModal={storesModal}
        setShowModal={setStoresModal}
        selectedStores={formData.preferredStoreIDs}
        setSelectedStores={(selected) =>
          setFormData((prev) => ({
            ...prev,
            preferredStoreIDs: selected,
          }))
        }
      />
    </>
  );
}
