import React, { useEffect, useState } from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import api from '../../utils/axios';
import ClientRepairsCatalog from './ClientRepairsCatalog';
import PaginationControl from '../pagination/PaginationControl';
import RepairInfo from '../repair/RepairInfo';

export default function ClientRepairs({isSelected}) {
  const [activeTab, setActiveTab] = useState("active");

  const handleTabChange = (key) => {
    setActiveTab(key);
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
              <ClientRepairsCatalog activeRepairs={true}/>
            </Tab>
            <Tab eventKey="inactive" title="History Repairs">
              <ClientRepairsCatalog activeRepairs={false}/>
            </Tab>
          </Tabs>
      </div>
    </div>
  );
}