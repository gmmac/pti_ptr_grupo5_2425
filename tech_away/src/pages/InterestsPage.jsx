import React, { useEffect, useState } from 'react';
import InterestFolderCatalog from '../components/interests/folder/InterestFolderCatalog';
import api from '../utils/axios';
import PaginationControl from '../components/pagination/PaginationControl';
import { Col, Container, Nav, Row, Tab } from 'react-bootstrap';
import { ModalProvider } from '../contexts/ModalContext';
import { useFilter } from '../contexts/InterestsFilterProvider';

export default function InterestsPage() {
  const [interestsFolder, setInterestsFolder] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 4;

  const { filters } = useFilter();

  useEffect(() => {}, [filters]);

  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };


  // useEffect(() => {
  //   api
  //     .get('/api/interestsFolder/', {
  //       params: {
  //         name: filters.name,
  //         clientNIC: filters.clientNIC,
  //         orderBy: filters.orderBy,
  //         orderDirection: filters.orderDirection,
  //         page: currentPage,
  //         pageSize: itemsPerPage,
  //       },
  //     })
  //     .then((res) => {
  //       setInterestsFolder(res.data.data);
  //       setTotalPages(res.data.totalPages);
  //     })
  //     .catch((error) => {
  //       console.error('API error:', error.message);
  //     });
  // }, [filters, currentPage, refresh]);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <ModalProvider>
      <Container>
        <Tab.Container id="left-tabs-example" defaultActiveKey="first">
          <Row>
            <Col sm={3}>
              <Nav variant="pills" className="flex-column">
                <Nav.Item>
                  <Nav.Link eventKey="first">Interests Catalog</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="second">Hello World</Nav.Link>
                </Nav.Item>
              </Nav>
            </Col>
            <Col sm={9}>
              <Tab.Content>
                <Tab.Pane eventKey="first">
                  <InterestFolderCatalog folders={interestsFolder} handleRefresh={handleRefresh} />
                  <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
                </Tab.Pane>
                <Tab.Pane eventKey="second">
                  <h1>Hello World</h1>
                </Tab.Pane>
              </Tab.Content>
            </Col>
          </Row>
        </Tab.Container>
      </Container>
    </ModalProvider>
  );
}
