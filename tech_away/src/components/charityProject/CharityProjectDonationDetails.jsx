import React, { useEffect, useState } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import api from '../../utils/axios';

export default function CharityProjectDonationDetails({ projectId }) {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDonations = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await api.get('/api/storePurchase/getDonations', {
          params: { charityProjectId: projectId }
        });
        setDonations(response.data.data || []);
      } catch (err) {
        setError('Error loading donation details');
      }
      setLoading(false);
    };

    if (projectId) {
      fetchDonations();
    } else {
      setDonations([]);
      setLoading(false);
    }
  }, [projectId]);

  return (
    <Container className="my-4">
      <h4>Donations</h4>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {!loading && !error && donations.length === 0 && (
        <Alert variant="info">No donations found for this project.</Alert>
      )}

      {!loading && !error && donations.length > 0 && (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Purchase ID</th>
              <th>Client</th>
              <th>Employee</th>
              <th>Model</th>
              <th>Store</th>
              <th>Donation Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => {
              const purchase = donation.UsedEquipment?.StorePurchases?.[0] || {};
              const client = purchase.Client;
              const clientName = client
                ? `${client.firstName} ${client.lastName}`
                : purchase.clientNIC;
              const employeeName = purchase.employeeID || '—';
              const modelName = donation.UsedEquipment?.EquipmentSheet?.EquipmentModel?.name || '—';
              const storeName = purchase.storeID || '—';
              const key = `${donation.charityProjectId}-${donation.usedEquipmentId}-${purchase.id}`;

              return (
                <tr key={key}>
                  <td>{purchase.id}</td>
                  <td>{clientName}</td>
                  <td>{employeeName}</td>
                  <td>{modelName}</td>
                  <td>{storeName}</td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      )}
    </Container>
  );
}
