import React, { useEffect, useState } from 'react';
import { Container, Tab, Tabs } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientRepairsCatalog from './ClientRepairsCatalog';
import PaginationControl from '../pagination/PaginationControl';
import RepairInfo from './RepairInfo';

export default function ClientRepairs() {
  const [repairs, setRepairs] = useState([]); // repairs ativas ou terminadas, dependendo da aba
  const [activeTab, setActiveTab] = useState("active"); // 'active' ou 'inactive'
  const [selectedRepair, setSelectedRepair] = useState(null); // informação da repair selecionada
  const [showRepairInfo, setShowRepairInfo] = useState(false); // visibilidade do popup da reparação
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [error, setError] = useState("");

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const handleTabChange = (key) => {
    setActiveTab(key);
    setCurrentPage(1);
  };

  const handleShowRepairDetails = (repair) => {
    setSelectedRepair(repair);
    setShowRepairInfo(true);
  };

  const fetchRepairs = async () => {
    try {
        const activeRepairs = activeTab === "active";

        const response = await api.get('/api/repair', {
          params: {
            activeRepairs: activeRepairs,
            page: currentPage,
            // pageSize: itemsPerPage,
          },
        });
        setRepairs(response.data.data);
        setTotalPages(response.data.totalPages);
        setError('');
    } catch (error) {
        console.error('Error fetching repairs:', error);
        setError('Error fetching repairs. Please try again.');
    }
  };

  useEffect(() => {
    fetchRepairs();
  }, [currentPage, activeTab]);

  return (
    <div className="m-0 d-flex flex-column w-100">
      <div className="m-0 w-100">
          <Tabs
            id="employees-tabs"
            activeKey={activeTab}
            onSelect={handleTabChange}
            className="mb-3"
          >
            <Tab eventKey="active" title="Active Repairs">
              <ClientRepairsCatalog repairsList={repairs} isActive={activeTab === "active"} onShowDetails={handleShowRepairDetails}/>
            </Tab>
            <Tab eventKey="inactive" title="Repairs History">
              <ClientRepairsCatalog repairsList={repairs} isActive={activeTab === "active"} onShowDetails={handleShowRepairDetails}/>
            </Tab>
          </Tabs>
          <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages}/>
          <RepairInfo repairInfo={selectedRepair} show={showRepairInfo} onClose={() => setShowRepairInfo(false)}/>
      </div>
    </div>
  );
}