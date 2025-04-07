import React from 'react'
import { useState } from 'react';
import { Tab } from 'react-bootstrap';
import ClientProfile from '../../components/client/ClientProfile';

export default function OrganizerHomePage() {

    return (

    <Tab.Content className="custom-tab-content">
        <Tab.Pane eventKey="dashboard" className='p-4'>
            Dashboard
        </Tab.Pane>
        <Tab.Pane eventKey="warehouses" className='p-4'>
            <h5>Warehouses Content</h5>
        </Tab.Pane>
        <Tab.Pane eventKey="charityproject" className='p-4'>
            <h5>Charity Projects</h5>
        </Tab.Pane>
        <Tab.Pane eventKey="profile" className='p-4'>
            <ClientProfile userType='organizer' />
        </Tab.Pane>
    </Tab.Content>

  )
}
