import React from 'react';
import { Button, Modal, Row, Col } from 'react-bootstrap';
import InterestCard from './InterestCard';
import PaginationControl from '../pagination/PaginationControl';
import { usePagination } from '../../contexts/PaginationContext';

export default function InterestModal({ showModal, closeModal, interestsData }) {
    const { currentPage, setCurrentPage, totalPages } = usePagination();

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Modal 
            show={showModal} 
            onHide={closeModal} 
            backdrop="static" 
            keyboard={false} 
            size="xl" 
        >
            <Modal.Header closeButton>
                <Modal.Title>Interests</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                {interestsData && interestsData.length > 0 ? (
                    <Row className="g-3 justify-content-center">
                        {interestsData.map((i) => (
                            <Col key={i.id} xs={12} sm={6} md={6} lg={6} className="d-flex justify-content-center">
                                <InterestCard interest={i} />
                            </Col>
                        ))}
                    </Row>
                ) : (
                    <p className="text-center">No interests found.</p>
                )}
            </Modal.Body>

            {interestsData && interestsData.length > 0 && (
                <Modal.Footer className="justify-content-center">
                    <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
                </Modal.Footer>
            )}
        </Modal>
    );
}
