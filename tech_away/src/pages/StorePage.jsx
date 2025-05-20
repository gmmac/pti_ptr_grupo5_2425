import React, { useEffect, useState, useContext, use } from "react";
import { Container, Row, Col, Stack, Button } from "react-bootstrap";
import EquipmentSheetCard from "../components/StorePage/EquipmentSheetCard";
import PaginationControl from "../components/pagination/PaginationControl";
import api from "../utils/axios";
import Filters from "../components/StorePage/Filters";
import MapProvider from "../contexts/MapProvider";
import { IsMobileContext } from "../contexts/IsMobileContext";
import Swirl from "../components/svg/Swirl";

export default function StorePage() {
  const [equipmentModelCatalog, setEquipmentModelCatalog] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 9;
  const [filters, setFilters] = useState({
    orderBy: "",
    type: "",
    model: "",
    brand: "",
  });
  const isMobile = useContext(IsMobileContext);

  const [showMap, setShowMap] = useState(false);

  useEffect(() => {
    api
      .get("/api/equipmentSheet/in-stock", {
        params: {
          page: currentPage,
          pageSize: itemsPerPage,
          orderBy: filters.orderBy || "recent-date", // Use selected orderBy or default to createdAt
          modelId: filters.model,
          typeId: filters.type,
          brandId: filters.brand,
        },
      })
      .then((res) => {
        setEquipmentModelCatalog(res.data.data);
        setTotalPages(res.data.totalPages);
      })
      .catch((error) => {
        console.error("API error:", error.message);
      });
  }, [currentPage, filters]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  useEffect(() => {
    console.log(filters);
  }, [filters]);

  return (
    <Container className="mb-5">
      <Stack gap={4} direction="vertical" className="mb-5">
        {isMobile ? (
          <Stack
            direction="horizontal"
            style={{
              backgroundColor: "var(--white)",
              boxShadow: "var(--shadow-default)",
              borderRadius: "0 0 var(--rounded-sm) var(--rounded-sm)",
              height: "170px",
              WebkitMaskImage: "inset(0 round var(--rounded-lg))",
              maskImage: "inset(0 round var(--rounded-lg))",
            }}
            className="justify-content-between overflow-hidden"
          >
            <h1
              className="ps-4 fs-1"
              style={{ fontFamily: "var(--title-font)" }}
            >
              Second{" "}
              <span
                style={{
                  color: "var(--variant-one)",
                }}
              >
                Life
              </span>{" "}
              Quality{" "}
              <span
                style={{
                  color: "var(--variant-two)",
                }}
              >
                Tech
              </span>
            </h1>
            <Swirl
              w="80%"
              h="170%"
              vb="0 0 530 600"
              d="M31.0907 11.8915C16.2225 71.7413 0.113726 131.302 22.8298 187.875C46.2484 246.198 95.6589 280.411 163.087 261.617C204.366 250.111 240.888 217.379 253.421 176.213C258.834 158.431 259.246 140.37 247.635 127.094C237.331 115.31 219.239 135.035 212.026 143.591C176.874 185.291 164.459 234.932 160.572 285.598C155.612 350.268 168.376 410.887 223.789 445.93C300.758 494.606 448.962 501.693 507.136 400.946C522.825 373.775 546.956 333.667 536.026 303.199C529.022 283.676 511.582 274.846 489.63 281.907C458.842 291.809 433.644 327.527 421.169 354.955C404.584 391.418 400.882 437.318 422.167 468.662C438.731 493.055 514.063 544.436 546.614 542.427"
              color="var(--variant-two)"
              strokeWidth="40"
            />
          </Stack>
        ) : (
          ""
        )}
        <Stack gap={4}>
          <Stack direction="horizontal" gap={2} className="align-items-start">
            {isMobile ? (
              <Button
                className="rounded-pill px-4 py-3"
                style={{
                  backgroundColor: "var(--variant-two)",
                  border: "none",
                  color: "var(--dark-grey)",
                  boxShadow: "var(--shadow-default)",
                }}
                onClick={() => setShowMap(!showMap)}
              >
                <i className="pi pi-map"></i>
              </Button>
            ) : (
              ""
            )}
            <div className="flex-grow-1">
              <Filters filters={filters} setFilters={setFilters} />
            </div>
          </Stack>
          {/* Mapa */}
          {(showMap || !isMobile) && (
            <div
              className="rounded-sm"
              style={{
                boxShadow: "var(--shadow-default)",
              }}
            >
              <MapProvider filters={filters} setFilters={setFilters} />
            </div>
          )}

          {/* Grid de Equipamentos */}
          <Row className="g-4">
            {equipmentModelCatalog.length > 0 ? (
              equipmentModelCatalog.map((item, index) => (
                <Col key={index} xs={12} sm={6} md={4} lg={3}>
                  <EquipmentSheetCard eSheet={item} />
                </Col>
              ))
            ) : (
              <Col xs={12} className="text-center mt-5">
                <i className="pi pi-exclamation-triangle"></i>
                <p className="m-0">No equipment found</p>
              </Col>
            )}
          </Row>

          {/* Paginação */}
          {totalPages > 1 && (
            <PaginationControl
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          )}
        </Stack>
      </Stack>
    </Container>
  );
}
