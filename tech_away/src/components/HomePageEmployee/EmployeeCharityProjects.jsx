import React, { useEffect, useState } from 'react';
import RegisterCharityProject from '../charityProject/ModalRegisterCharityProject';
import { Alert, Button, Col, Container, Row, Spinner } from 'react-bootstrap';
import CharityProjectCatalog from '../charityProject/CharityProjectCatalog';
import api from '../../utils/axios';
import ModalCharityProjectDetails from '../charityProject/ModalCharityProjectDetails';
import DonationForms from '../donations/DonationForms';

export default function OrganizerCharityProjects() {
  const [showModal, setShowModal] = useState(false);
  const [refresh, setRefresh] = useState(false);

  const [charityProjects, setCharityProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [filters, setFilters] = useState({
    startDate: '',
    completionDate: '',
    status: '',
    warehouseID: '',
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
      const response = await api.get('/api/charityProject/displayTable', {
        params: {
          ...filters,
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
    fetchCharityProjects();
  }, [currentPage, filters, refresh]);
  
    const handleOpenModal = () => setShowModal(true);
    const handleCloseModal = () => setShowModal(false);

    const [selectedProject, setSelectedProject] = useState(null);
    const [showDetailsModal, setShowDetailsModal] = useState(false);

    const handleOpenDetailsModal = (project) => {
    setSelectedProject(project);
    setShowDetailsModal(true);
    };

    const handleCloseDetailsModal = () => {
    setSelectedProject(null);
    setShowDetailsModal(false);
    };

  return (
    // <div>
    <Container className="mt-4">
      <Row className="mb-3">
        <Col className="text-end">
          <Button style={{ backgroundColor: "var(--variant-one)", border: "none" }} onClick={handleOpenModal}>Register Donation</Button>
        </Col>
      </Row>

        {showModal && 
          <DonationForms show={showModal} handleClose={handleCloseModal} />  
        }

        {error && <Alert variant="danger">{error}</Alert>}
        {loading ? (
            <div className="text-center my-5">
            <Spinner animation="border" />
            </div>
        ) : ( 
            <>  
              <div>

                <CharityProjectCatalog 
                  charityProjects={charityProjects} 
                  handlePageChange={handlePageChange} 
                  currentPage={currentPage} 
                  totalPages={totalPages}
                  onOpenDetails={handleOpenDetailsModal}
                  onRefresh={toggleRefresh}
                  canDelete={false}
                  />
              

              </div>

              <ModalCharityProjectDetails
                show={showDetailsModal}
                handleClose={handleCloseDetailsModal}
                project={selectedProject}
                onRefresh={toggleRefresh}
                setSelectedProject={setSelectedProject}
              />
              
            </>

            )}

    </Container>
  );
}
