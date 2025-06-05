import React, { useEffect } from 'react'
import { useState } from 'react';
import { Tab } from 'react-bootstrap';
import ClientProfile from '../../components/client/ClientProfile';
import { useOrganizerAuth } from '../../contexts/AuthenticationProviders/OrganizerAuthProvider';
import OrganizerCharityProjects from '../../components/HomePageOrganizer/OrganizerCharityProjects';
import WarehouseCatalog from '../../components/warehouse/WarehouseCatalog';

export default function OrganizerHomePage() {
    const { user } = useOrganizerAuth();

    return (
    <Tab.Content className="custom-tab-content">
        <Tab.Pane eventKey="warehouses" className='p-4'>
            <WarehouseCatalog />
        </Tab.Pane>
        <Tab.Pane eventKey="charityproject" className='p-4'>
            <OrganizerCharityProjects />
        </Tab.Pane>
        <Tab.Pane eventKey="profile" className='p-4'>
            {user && <ClientProfile userType='organizer' />}
        </Tab.Pane>
    </Tab.Content>

  )
}
