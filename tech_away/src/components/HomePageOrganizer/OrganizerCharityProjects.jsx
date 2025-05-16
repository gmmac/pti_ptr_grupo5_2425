import React, { useEffect, useState } from 'react';
import RegisterCharityProject from '../charityProject/ModalRegisterCharityProject';
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import CharityProjectCatalog from '../charityProject/CharityProjectCatalog';
import api from '../../utils/axios';
import ModalCharityProjectDetails from '../charityProject/ModalCharityProjectDetails';
import { useOrganizerAuth  } from '../../contexts/AuthenticationProviders/OrganizerAuthProvider';
import { useNavigate } from 'react-router-dom';

export default function OrganizerCharityProjects() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const { user, getOrganizerID, isOrganizer } = useOrganizerAuth ();

  const [charityProjects, setCharityProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const [filters, setFilters] = useState({
    startDate: '',
    completionDate: '',
    status: '',
    warehouseID: '',
    // orderDirection: 'ASC'
  });

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const toggleRefresh = () => {
    setRefresh(!refresh);
  }


  const fetchCharityProjects = async () => {
    try {
      setLoading(true);
      const response = await api.get('/api/charityProject/', {
        params: {
          ...filters,
          organizerNic: getOrganizerID(),
          page: currentPage
        },
      });

      setCharityProjects(response.data.data);
      setTotalPages(response.data.totalPages);
    } catch (err) {
      setError('Error fetching charity projects.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isOrganizer() || !getOrganizerID()) return;
    fetchCharityProjects();
  }, [currentPage, filters, refresh, getOrganizerID()]);
  
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleOpenDetailsModal = (project) => {
    navigate(`/organizer/projects/${project}`)
    // setSelectedProject(project);
    // setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
    setSelectedProject(null);
    setShowDetailsModal(false);
    };

    const handleDelete = async (projectId) => {
      try {
        await api.delete(`/api/charityProject/${projectId}`);
        toggleRefresh();
      } catch (err) {
        console.error("Error deleting project:", err);
        setError("Could not delete project.");
      }
  };

  return (
    <Container>

        <h1> My Charity Projects </h1>

        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
            <div className="text-center my-5">
            <Spinner animation="border" />
            </div>
        ) : ( 
            <>
              {isOrganizer() && 
                <Row className="mb-3">
                  <Col className="text-end">
                    <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleOpenModal}>New Charity Project</Button>
                  </Col>
                </Row>
              }
                
              {!loading && (
                charityProjects.length === 0 ? (
                  <div className="text-center my-5">
                    <p>There are no projects created by {user?.firstName} {user?.lastName}.</p>
                  </div>
                ) : (
                  <CharityProjectCatalog 
                    charityProjects={charityProjects} 
                    handlePageChange={handlePageChange} 
                    currentPage={currentPage} 
                    totalPages={totalPages}
                    onOpenDetails={handleOpenDetailsModal}
                    onRefresh={toggleRefresh}
                    onDelete={handleDelete}
                    canDelete={true}
                  />
                )
              )}

            </>

            )}

        {isOrganizer() && 
          <RegisterCharityProject 
            showModal={showModal} 
            closeModal={handleCloseModal} 
            setRefresh={toggleRefresh} />
        }
        </Container>
  );
}
