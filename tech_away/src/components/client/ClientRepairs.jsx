import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientRepairsCatalog from './ClientRepairsCatalog';
import PaginationControl from '../pagination/PaginationControl';
import RepairInfo from './RepairInfo';

export default function ClientRepairs({isSelected}) {
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
              <ClientRepairsCatalog/>
            </Tab>
            {/* <Tab eventKey="inactive" title="Repairs History">
              <ClientRepairsCatalog repairsList={repairs} isActive={activeTab === "active"} onShowDetails={handleShowRepairDetails}/>
            </Tab> */}
          </Tabs>
      </div>
    </div>
  );
}