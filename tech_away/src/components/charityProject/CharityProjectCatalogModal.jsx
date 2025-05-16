// CharityProjectCatalogModal.jsx
import React, { useEffect, useState } from "react";
import { Modal, Button, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";
import ProjectFilter from "./ProjectFilter";
import ProjectTableModal from "./ProjectTableModal";
import ProjectCardModal from "./ProjectCardModal";

export default function CharityProjectCatalogModal({
  show,
  handleClose,
  handleSelectCharity,
  selectedCharityID,
}) {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  // ① Lift filters state into the parent
  const [filters, setFilters] = useState({
    id: "",
    projectName: "",
    status: "Opened",
    warehouse: "",
    organizerName: "",
    startDate: "",
    completionDate: "",
    orderBy: "id",
    orderDirection: "ASC",
  });

  const handleClosePopUp = () => {
    handleClose();
    setCurrentPage(1);
    // reset filters if you want on close:
    setFilters({
      id: "",
      projectName: "",
      status: "Opened",
      warehouse: "",
      organizerName: "",
      startDate: "",
      completionDate: "",
      orderBy: "id",
      orderDirection: "ASC",
    });
  };

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get("/api/charityProject", {
          params: {
            page: currentPage,
            pageSize: itemsPerPage,
            ...filters,           // ② include filters in your request
          },
        });
        setProjects(response.data.data || []);
        setTotalPages(response.data.totalPages);
      } catch (err) {
        setError("Error loading charity projects");
      }
      setLoading(false);
    };

    if (show) {
      fetchProjects();
    }
  }, [show, currentPage, filters]);   // ③ depend on filters

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const handleProjectSelection = (project) => {
    if (selectedCharityID === project.id) {
      handleSelectCharity(null);
    } else {
      handleSelectCharity(project);
    }
  };

  return (
    <Modal show={show} onHide={handleClosePopUp} 
      onExited={() => {
        setFilters({
          id: "",
          projectName: "",
          status: "Opened",
          warehouse: "",
          organizerName: "",
          startDate: "",
          completionDate: "",
          orderBy: "id",
          orderDirection: "ASC",
        });
      }}
      size="xl" 
      centered>
      <Modal.Header closeButton>
        <Modal.Title>Charity Project Catalog</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* ④ Pass down the setter so ProjectFilter can call it */}
        <ProjectFilter setFilters={setFilters} />

        {loading ? (
          <p>Loading data...</p>
        ) : error ? (
          <p className="text-danger">{error}</p>
        ) : projects.length === 0 ? (
          <p>No projects found.</p>
        ) : (
          <Container>
            {/* Desktop Table View */}
            <ProjectTableModal
              projects={projects}
              selectedProjectID={selectedCharityID}
              handleProjectSelection={handleProjectSelection}
            />

            {/* Mobile Card View */}
            {projects.map((project) => (
              <ProjectCardModal
                key={project.id}
                project={project}
                selectedProjectID={selectedCharityID}
                handleProjectSelection={handleProjectSelection}
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
    </Modal>
  );
}
