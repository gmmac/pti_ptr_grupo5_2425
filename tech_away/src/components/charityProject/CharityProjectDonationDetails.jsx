import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Card, Col, Row } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';

export default function CharityProjectDonationDetails({ projectId }) {
  const [donations, setDonations]       = useState([]);
  const [loading, setLoading]           = useState(true);
  const [error, setError]               = useState(null);
  const [currentPage, setCurrentPage]   = useState(1);
  const [totalPages, setTotalPages]     = useState(1);

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

  // agrupa em linhas de no máximo 2 itens
  const rows = [];
  for (let i = 0; i < donations.length; i += 2) {
    rows.push(donations.slice(i, i + 2));
  }

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

          {!loading && !error && donations.length > 0 && (
            <div className="overflow-auto mb-3" style={{ maxHeight: '500px' }}>
              {rows.map((rowItems, rowIndex) => (
                <Row className="g-3 mb-3" key={rowIndex}>
                  {rowItems.map(item => (
                    <Col
                      xs={12}
                      lg={rowItems.length === 1 ? 12 : 6}
                      key={item.Purchase.id}
                    >
                      <Card
                        className="h-100 border-0 shadow-sm"
                        style={{
                          backgroundColor: '#f8f9fa',
                          borderRadius: '0.75rem'
                        }}
                      >
                        <Card.Body className="d-flex flex-column justify-between">
                          <div className="d-flex flex-column flex-lg-row justify-content-lg-between">
                            <div className="d-flex flex-column">
                              <h6 className="mb-1">{item.Equipment.brandModel}</h6>
                              <small className="text-muted">
                                Barcode: {item.Equipment.barcode}
                              </small>
                            </div>
                            <div className="d-flex flex-column">
                              <h6 className="mb-1">{item.Equipment.type}</h6>
                              <small className="text-muted">
                                <b>Date:</b>{' '}
                                {new Date(item.Purchase.purchase_date)
                                  .toLocaleDateString()}
                              </small>
                            </div>
                          </div>

                          <hr />

                          <div className="d-flex flex-column flex-lg-row justify-content-lg-between">
                            <div className="mb-2 mb-lg-0">
                              <small className="d-block">
                                <b>Employee:</b> {item.Purchase.Employee.name}
                              </small>
                              <small className="d-block">
                                <b>Store:</b> {item.Purchase.Store.name}
                              </small>
                            </div>
                            <div>
                              <small className="d-block">
                                <b>Client:</b> {item.Purchase.Client.name}
                              </small>
                            </div>
                          </div>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              ))}
            </div>
          )}

          {!loading && !error && donations.length > 0 && (
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
