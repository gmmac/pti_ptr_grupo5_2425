import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Card, Col, Row } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';

export default function CharityProjectDonationDetails({ projectId }) {
  const [donations, setDonations]   = useState([]);
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);


  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/api/storePurchase/getDonations', {
          params: {
            charityProjectId: projectId,
            page: currentPage,
          }
        });
        setDonations(res.data.data || []);
        setTotalPages(res.data.totalPages);
      } catch {
        setError('Error loading donation details');
      } finally {
        setLoading(false);
      }
    };

    if (projectId) {
      fetchDonations();
    } else {
      setDonations([]);
      setLoading(false);
    }
  }, [projectId, currentPage]);

  return (
    <Container className="my-4">
      <Card className="shadow-sm">
        <Card.Body>
          <h5 className="fw-bold mb-3">Donations</h5>

          {loading && (
            <div className="text-center">
              <Spinner animation="border" />
            </div>
          )}

          {error && <Alert variant="danger">{error}</Alert>}

          {!loading && !error && donations.length === 0 && (
            <Alert variant="info">No donations found for this project.</Alert>
          )}

          {!loading && !error && (
            <div className="overflow-auto mb-3" style={{ maxHeight: '500px' }}>
              <Row className="g-3">
                {donations.map(item => (
                  <Col xs={12} lg={6} key={item.Purchase.id}>
                    <Card className="h-100 border-0 shadow-sm" style={{ backgroundColor: '#f8f9fa', borderRadius: '0.75rem' }}>
                      <Card.Body className="d-flex flex-column justify-between">
                        <div className="d-flex flex-column flex-lg-row justify-content-lg-between">
                          <div className="d-flex flex-column">
                            <h6 className="mb-1">{item.Equipment.brandModel}</h6>
                            <small className="text-muted">Barcode: {item.Equipment.barcode}</small>
                          </div>
                          <div className="d-flex justify-content-start justify-lg-content-center align-items-end">
                            <small className="d-block"><b>Date:</b> {new Date(item.Purchase.purchase_date).toLocaleDateString()}</small>
                          </div>
                        </div>

                        <hr />

                        <div className="d-flex flex-column flex-lg-row justify-content-lg-between">
                          <div className="mb-2 mb-lg-0">
                            <small className="d-block"><b>Employee:</b> {item.Purchase.Employee.name}</small>
                            <small className="d-block"><b>Store:</b> {item.Purchase.Store.name}</small>
                          </div>
                          <div>
                            <small className="d-block"><b>Client:</b> {item.Purchase.Client.name}</small>
                          </div>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
            </div>
          )}

          {!loading && !error  && (
            <PaginationControl
              currentPage={currentPage}
              totalPages={totalPages}
              handlePageChange={setCurrentPage}
            />
          )}
        </Card.Body>
      </Card>
    </Container>
  );
}
