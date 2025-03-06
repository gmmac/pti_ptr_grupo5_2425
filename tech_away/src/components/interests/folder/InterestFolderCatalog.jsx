import React from 'react';
import InterestFolderCard from './InterestFolderCard';
import { Button, Col, Container, Row } from 'react-bootstrap';
import { PaginationProvider } from '../../../contexts/PaginationContext';
import FolderInterestFilter from './FolderInterestFilter';
import { useModal } from '../../../contexts/ModalContext';
import CreateInterestModal from './CreateInterestModal';

export default function InterestFolderCatalog({ folders, handleRefresh }) {
  const { show, handleShow, handleClose } = useModal();

  return (
    <Container className="py-4">
      <FolderInterestFilter folders={folders} />
      
      <div className="d-flex justify-content-center my-3">
        <Button variant="primary" size="lg" className="shadow-sm" onClick={handleShow}>
          + Create New Folder
        </Button>
      </div>
      
      <CreateInterestModal show={show} handleClose={handleClose} handleRefresh={handleRefresh} />

      <Row className='d-flex flex-wrap justify-content-center'>
        {folders.map((f, index) => (
          <Col key={index} xs={12} sm={6} md={4} lg={3} className="d-flex mb-3">
            <PaginationProvider>
              <InterestFolderCard index={index} iFolder={f} />
            </PaginationProvider>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

