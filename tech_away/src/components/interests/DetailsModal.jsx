import React, { useState, useEffect, use } from "react";
import { Button, Col, Modal, Row, Stack, Form } from "react-bootstrap";
import SelectStoresModal from "./SelectStoresModal";

export default function DetailsModal({
  show,
  setShow,
  interest,
  openDeleteModal,
  editInterest,
}) {
  if (!interest) return null;
  const [isEditing, setIsEditing] = useState(false);
  const [localInterest, setLocalInterest] = useState(interest);
  const [storesModal, setStoresModal] = useState(false);

  const [formData, setFormData] = useState(() => ({
    brand: interest.brand ?? null,
    model: interest.model ?? null,
    type: interest.type ?? null,
    equipmentSheet: interest.equipmentSheetID ?? null,
    equipmentStatus: interest.equipmentStatus ?? null,
    minLaunchYear: interest.minLaunchYear ?? "",
    maxLaunchYear: interest.maxLaunchYear ?? "",
    minPrice: interest.minPrice ?? "",
    maxPrice: interest.maxPrice ?? "",
    preferredStoreIDs:
      interest.preferredStores?.map((s) => ({
        name: s.store?.name || s.storeId,
        nipc: s.store?.nipc || s.storeId,
      })) ?? [],
    description: interest.description ?? "",
  }));

  useEffect(() => {
    if (interest) {
      updateFormData(interest);
    }
  }, [interest]);

  const startYear = 1995;
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - startYear + 1 },
    (_, i) => currentYear - i
  );

  const minYearOptions = formData.maxLaunchYear
    ? years.filter((y) => y <= parseInt(formData.maxLaunchYear))
    : years;
  const maxYearOptions = formData.minLaunchYear
    ? years.filter((y) => y >= parseInt(formData.minLaunchYear))
    : years;

  const PRICE_MIN = 0;
  const PRICE_MAX = 1000;
  const STEP = 25;
  const priceOptions = Array.from(
    { length: (PRICE_MAX - PRICE_MIN) / STEP + 1 },
    (_, i) => PRICE_MIN + i * STEP
  );

  const minPriceOptions = formData.maxPrice
    ? priceOptions.filter((p) => p <= parseInt(formData.maxPrice))
    : priceOptions;
  const maxPriceOptions = formData.minPrice
    ? priceOptions.filter((p) => p >= parseInt(formData.minPrice))
    : priceOptions;

  function updateFormData(fromInterest) {
    setLocalInterest(fromInterest);
    setFormData({
      brand: fromInterest.brand ?? null,
      model: fromInterest.model ?? null,
      type: fromInterest.type ?? null,
      equipmentSheet: fromInterest.equipmentSheetID ?? null,
      equipmentStatus: fromInterest.equipmentStatus ?? null,
      minLaunchYear: fromInterest.minLaunchYear ?? "",
      maxLaunchYear: fromInterest.maxLaunchYear ?? "",
      minPrice: fromInterest.minPrice ?? "",
      maxPrice: fromInterest.maxPrice ?? "",
      preferredStoreIDs:
        fromInterest.preferredStores?.map((s) => ({
          name: s.store?.name || s.storeId,
          nipc: s.store?.nipc || s.storeId,
        })) ?? [],
      description: fromInterest.description ?? "",
    });
  }

  function verifyInput(input) {
    if (typeof input !== "string") return null;
    return input.replace(/['";]|--/g, "").trim();
  }

  function prepareInterestData(formData) {
    return {
      id: localInterest.id,
      brandID: formData.brand?.id ?? null,
      modelID: formData.model?.id ?? null,
      typeID: formData.type?.id ?? null,
      equipmentSheetID:
        formData.equipmentSheet?.id ?? formData.equipmentSheet ?? null,
      equipmentStatusID: formData.equipmentStatus?.id ?? null,
      minLaunchYear: formData.minLaunchYear || null,
      maxLaunchYear: formData.maxLaunchYear || null,
      minPrice: formData.minPrice || null,
      maxPrice: formData.maxPrice || null,
      description: verifyInput(formData.description) || null,
      preferredStoreIDs:
        formData.preferredStoreIDs?.map((store) => store.nipc) ?? [],
    };
  }

  const handleSubmit = async () => {
    const interestData = prepareInterestData(formData);
    const updatedInterest = await editInterest(interestData);
    updateFormData(updatedInterest);
    setLocalInterest(updatedInterest);
    setIsEditing(false);
  };

  /* ---------- render ---------- */

  return (
    <>
      <Modal
        show={show}
        onHide={() => {
          setShow(false);
          setIsEditing(false);
        }}
        size="lg"
        centered
        style={{ fontFamily: "var(--body-font)", color: "var(--dark-grey)" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "var(--title-font)" }}>
            Interest Details
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="align-items-stretch">
            <Col xs={12} lg={6} className="d-flex flex-column mt-2">
              <Stack
                direction="vertical"
                className="p-3 align-items-start h-100"
                style={{
                  backgroundColor: "var(--variant-two-light)",
                  borderRadius: "16px",
                }}
              >
                <p>
                  <span className="text-muted">Created:</span>{" "}
                  {new Date(interest.createdAt).toLocaleDateString("pt-PT")}
                </p>
                {localInterest.updatedAt != localInterest.createdAt && (
                  <p>
                    <span className="text-muted">Updated:</span>{" "}
                    {new Date(localInterest.updatedAt).toLocaleDateString(
                      "pt-PT"
                    )}
                  </p>
                )}
                <p>
                  <span className="text-muted">Model:</span>{" "}
                  {formData?.model?.name || "—"}
                </p>
                <p>
                  <span className="text-muted">Brand:</span>{" "}
                  {formData?.brand?.name || "—"}
                </p>
                <p>
                  <span className="text-muted">Type:</span>{" "}
                  {formData?.type?.name || "—"}
                </p>
                {isEditing ? (
                  <Form.Group controlId="preferredStoreIDs">
                    <Form.Label className="text-muted ">
                      Preferred Stores
                    </Form.Label>

                    {formData?.preferredStoreIDs.length > 0 && (
                      <Stack
                        direction="horizontal"
                        gap={2}
                        className="mb-2 flex-wrap"
                        style={{ maxHeight: "80px", overflowY: "auto" }}
                      >
                        {formData.preferredStoreIDs.map((store) => (
                          <Stack
                            key={store.nipc}
                            direction="horizontal"
                            gap={1}
                            className="rounded-pill px-2 py-1"
                            style={{ backgroundColor: "var(--white)" }}
                          >
                            <span>{store.name}</span>
                            <i
                              className="pi pi-times"
                              style={{ cursor: "pointer" }}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  preferredStoreIDs:
                                    prev.preferredStoreIDs.filter(
                                      (s) => s.nipc !== store.nipc
                                    ),
                                }))
                              }
                            />
                          </Stack>
                        ))}
                      </Stack>
                    )}
                    <Stack
                      direction="horizontal"
                      gap={2}
                      className="justify-content-center"
                    >
                      <Button
                        variant="secondary"
                        className="rounded-pill"
                        disabled={
                          !formData.preferredStoreIDs ||
                          formData.preferredStoreIDs.length === 0
                        }
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            preferredStoreIDs: [],
                          }))
                        }
                      >
                        Clear
                      </Button>
                      <Button
                        className="rounded-pill w-100"
                        style={{
                          backgroundColor: "var(--variant-two)",
                          border: "none",
                        }}
                        onClick={() => setStoresModal(true)}
                      >
                        Select Stores
                      </Button>
                    </Stack>
                  </Form.Group>
                ) : (
                  <p>
                    <span className="text-muted">Preferred Stores:</span>{" "}
                    {formData.preferredStoreIDs?.length > 0
                      ? formData.preferredStoreIDs.map((s, i) => (
                          <span key={s.nipc}>
                            {s.name}
                            {i < formData.preferredStoreIDs.length - 1 && ", "}
                          </span>
                        ))
                      : "—"}
                  </p>
                )}
              </Stack>
            </Col>
            <Col xs={12} lg={6} className="d-flex flex-column mt-2">
              <Stack
                direction="vertical"
                className="p-3 align-items-start h-100"
                style={{
                  backgroundColor: "var(--variant-two-light)",
                  borderRadius: "16px",
                }}
              >
                {isEditing ? (
                  <>
                    <Stack
                      direction="horizontal"
                      gap={3}
                      className="align-items-end justify-content-stretch"
                    >
                      <Button className="rounded-pill" variant="secondary">
                        Clear
                      </Button>
                      <Form.Group className="w-100">
                        <Form.Label className="text-muted">Min Year</Form.Label>
                        <Form.Select
                          className="rounded-pill "
                          value={formData.minLaunchYear}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              minLaunchYear: parseInt(e.target.value),
                            }))
                          }
                        >
                          <option value="">-</option>
                          {minYearOptions.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="w-100">
                        <Form.Label className="text-muted">Max Year</Form.Label>
                        <Form.Select
                          className="rounded-pill"
                          value={formData.maxLaunchYear}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              maxLaunchYear: parseInt(e.target.value),
                            }))
                          }
                        >
                          <option value="">-</option>
                          {maxYearOptions.map((y) => (
                            <option key={y} value={y}>
                              {y}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Stack>
                    <Stack
                      direction="horizontal"
                      gap={3}
                      className="align-items-end justify-content-stretch mb-3"
                    >
                      <Button
                        className="rounded-pill"
                        variant="secondary"
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

                      <Form.Group className="w-100">
                        <Form.Label className="text-muted">
                          Min Price
                        </Form.Label>
                        <Form.Select
                          className="rounded-pill"
                          value={formData.minPrice || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              minPrice: parseInt(e.target.value),
                            }))
                          }
                        >
                          <option value="">-</option>
                          {minPriceOptions.map((price) => (
                            <option key={price} value={price}>
                              {price.toLocaleString("pt-PT", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>

                      <Form.Group className="w-100">
                        <Form.Label className="text-muted">
                          Max Price
                        </Form.Label>
                        <Form.Select
                          className="rounded-pill"
                          value={formData.maxPrice || ""}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              maxPrice: parseInt(e.target.value),
                            }))
                          }
                        >
                          <option value="">-</option>
                          {maxPriceOptions.map((price) => (
                            <option key={price} value={price}>
                              {price.toLocaleString("pt-PT", {
                                style: "currency",
                                currency: "EUR",
                              })}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    </Stack>

                    <Form.Group className="w-100 mb-2">
                      <Form.Label className="text-muted">
                        Description
                      </Form.Label>
                      <Form.Control
                        as="textarea"
                        style={{ borderRadius: "16px" }}
                        rows={2}
                        maxLength={200}
                        value={formData.description || ""}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                      />
                      <small className="text-muted">
                        {formData.description?.length || 0}/200 characters
                      </small>
                    </Form.Group>
                  </>
                ) : (
                  <>
                    <Stack direction="horizontal" gap={4}>
                      <p>
                        <span className="text-muted">Min Year:</span>{" "}
                        {formData.minLaunchYear || "—"}
                      </p>
                      <p>
                        <span className="text-muted">Max Year:</span>{" "}
                        {formData.maxLaunchYear || "—"}
                      </p>
                    </Stack>
                    <Stack direction="horizontal" gap={4}>
                      <p>
                        <span className="text-muted">Min Price:</span>{" "}
                        {formData.minPrice
                          ? formData.minPrice.toLocaleString("pt-PT", {
                              style: "currency",
                              currency: "EUR",
                            })
                          : "—"}
                      </p>
                      <p>
                        <span className="text-muted">Max Price:</span>{" "}
                        {formData.maxPrice
                          ? formData.maxPrice.toLocaleString("pt-PT", {
                              style: "currency",
                              currency: "EUR",
                            })
                          : "—"}
                      </p>
                    </Stack>

                    <p>
                      <span className="text-muted">Description:</span>{" "}
                      {formData.description || "—"}
                    </p>
                  </>
                )}
              </Stack>
            </Col>
          </Row>
          <Stack
            direction="horizontal"
            gap={3}
            className="mt-4 justify-content-end"
          >
            {isEditing ? (
              <>
                <Button
                  onClick={() => setIsEditing(false)}
                  className="rounded-pill d-flex gap-2 align-items-center"
                  variant="secondary"
                >
                  <i className="pi pi-refresh" />
                  <span>Cancel</span>
                </Button>
                <Button
                  className="rounded-pill d-flex gap-2 align-items-center"
                  style={{
                    backgroundColor: "var(--variant-one)",
                    border: "none",
                  }}
                  onClick={handleSubmit}
                >
                  <i className="pi pi-bookmark" />
                  <span>Save</span>
                </Button>
              </>
            ) : (
              <Button
                onClick={() => setIsEditing(true)}
                className="rounded-pill d-flex gap-3 align-items-center"
                style={{
                  backgroundColor: "var(--variant-two)",
                  border: "none",
                }}
              >
                <i className="pi pi-pencil" />
                <span>Edit Interest</span>
              </Button>
            )}
          </Stack>
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
