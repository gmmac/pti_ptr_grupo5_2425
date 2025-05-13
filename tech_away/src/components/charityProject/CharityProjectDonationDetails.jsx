import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert, Card, ListGroup } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';

export default function CharityProjectDonationDetails({ projectId }) {
  const [groups, setGroups]   = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError]     = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages]   = useState(1);

  const PAGE_SIZE = 4;

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await api.get('/api/storePurchase/getDonations', {
          params: {
            charityProjectId: projectId,
            page:             currentPage,
            pageSize:         PAGE_SIZE
          }
        });
        setGroups(res.data.data || []);
        setTotalPages(res.data.totalPages);
      } catch {
        setError('Error loading donation details');
      }
      setLoading(false);
    };

    if (projectId) fetch();
    else {
      setGroups([]);
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

          {!loading && !error && groups.length === 0 && (
            <Alert variant="info">No donations found for this project.</Alert>
          )}

          {!loading && !error && (
            <div className="overflow-auto mb-3" style={{ maxHeight: '500px' }}>
              {groups.map(grp => (
                <Card
                  key={grp.Equipment.usedEquipmentId}
                  className="mb-3 border-0 shadow-sm"
                  style={{ backgroundColor: '#f8f9fa', borderRadius: '0.75rem' }}
                >
                  <Card.Body>
                    <div className="d-flex justify-content-between align-items-center mb-2">
                      <h6 className="mb-1">
                        {grp.Equipment.brandModel}
                      </h6>

                      <div className='d-flex  flex-column'>
                        <small className="text-muted">
                          <b>Barcode:</b> {grp.Equipment.barcode}
                        </small>
                        <small className="text-muted">
                          <b>Total Donations:</b> {grp.Purchases.length} {grp.Purchases.length === 1 ? 'donation' : 'donations'}
                        </small>
                      </div>

                    </div>

                    <ListGroup variant="flush" className="p-2">
                      {grp.Purchases.map(p => (
                        <ListGroup.Item key={p.id} className="p-2">
                          <div className="d-flex justify-content-between">
                            <div>
                              <strong>#{p.id}</strong> — {p.Client.firstName} {p.Client.lastName}
                            </div>
                            <small className="text-muted">
                              {new Date(p.createdAt).toLocaleDateString()}
                            </small>
                          </div>
                          <div className="ms-3">
                            <small>
                              Employee: {p.Employee.firstName} {p.Employee.lastName} | Store: {p.Store.name}
                            </small>
                          </div>
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </Card.Body>
                </Card>
              ))}
            </div>
          )}

          {!loading && !error && (
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
