import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import EquipmentSheetTableModal from "../equipmentSheet/EquipmentSheetTableModal";
import EquipmentSheetCardModal from "../equipmentSheet/EquipmentSheetCardModal";
// import EquipmentSheetCardModal from "./EquipmentSheetCardModal"; // Você pode criar esse componente se quiser versão mobile
// import EquipmentSheetFilter from "./EquipmentSheetFilter"; // Precisa adaptar ou criar esse filtro

export default function UsedEquipmentSelect({ show, handleClose, handleSelectUsedEquipment, selectedUsedEquipment }) {
  const [equipmentSheets, setEquipmentSheets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  const [filters, setFilters] = useState({
    Barcode: "",
    Brand: "",
    EquipmentModel: "",
    EquipmentType: "",
    BrandModel: "",
    active: "1",
    sortOrder: "ASC"
  });

  const handleClosePopUp = () => {
    handleClose();
    setFilters({
      Barcode: "",
      Brand: "",
      EquipmentModel: "",
      EquipmentType: "",
      BrandModel: "",
      active: "1",
      sortOrder: "ASC"
    });
  };

  useEffect(() => {
    const fetchEquipmentSheets = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get(`/api/equipmentSheet`, {
          params: {
            ...filters,
            page: currentPage,
            pageSize: itemsPerPage,
          }
        });
        setEquipmentSheets(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Error loading equipment sheets");
      }
      setLoading(false);
    };

    if (show) {
      fetchEquipmentSheets();
    }
  }, [show, currentPage, filters]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

const handleEquipmentSheetSelection = (equipmentSheet) => {
  if (!equipmentSheet) {
    handleSelectUsedEquipment(null);
    return;
  }

  if (selectedUsedEquipment?.Barcode === equipmentSheet.Barcode) {
    handleSelectUsedEquipment(null);
  } else {
    handleSelectUsedEquipment(equipmentSheet);
  }
};


  return (
    <Modal show={show} onHide={handleClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>Equipment Sheets Catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* <EquipmentSheetFilter setFilters={setFilters} /> */}
        {loading ? (
          <p>Loading Data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : equipmentSheets.length === 0 ? (
          <p>Data not found.</p>
        ) : (
          <Container>
            {/* Desktop */}
            <EquipmentSheetTableModal
              equipmentSheets={equipmentSheets}
              selectedBarcode={selectedUsedEquipment?.Barcode}
              handleEquipmentSheetSelection={handleEquipmentSheetSelection}
            />

            {/* Mobile - se quiser */}
            {equipmentSheets.map(sheet => (
              <EquipmentSheetCardModal
                key={sheet.Barcode}
                sheet={sheet}
                selectedBarcode={selectedUsedEquipment?.Barcode}
                handleEquipmentSheetSelection={handleEquipmentSheetSelection}
              />
            ))}

            <PaginationControl
              handlePageChange={handlePageChange}
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </Container>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClosePopUp}>
          Fechar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
