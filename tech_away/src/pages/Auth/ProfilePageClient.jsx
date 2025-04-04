import React, { useState } from 'react';
import { Nav, Tab, Container } from "react-bootstrap";
import "../../styles/variables.css";
import ClientProfile from '../../components/client/ClientProfile';
import "../../styles/ClientProfilePage.css"
import ClientRepairs from "../../components/client/ClientRepairs";

export default function ProfilePageClient() {
    const [activeTab, setActiveTab] = useState("profile");
	return (
		<Container>
			<Tab.Container defaultActiveKey="profile" activeKey={activeTab} onSelect={(selectedKey) => setActiveTab(selectedKey)}>
                <Nav variant="tabs" className="mb-3 nav-fill">
					<Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="profile">Profile</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="repairs">Repairs</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="sales">Sales</Nav.Link>
                    </Nav.Item>
                    <Nav.Item className='custom-tabs'>
                        <Nav.Link eventKey="purchases">Purchases</Nav.Link>
                    </Nav.Item>
                </Nav>

                <Tab.Content className='custom-tab-content'>
                    <Tab.Pane eventKey="sales">
                        <p>Tab content for Sales</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="purchases">
                        <p>Tab content for Purchases</p>
                    </Tab.Pane>
                    <Tab.Pane eventKey="repairs">
                        <ClientRepairs isSelected={activeTab === "repairs"}/>
                    </Tab.Pane>
					<Tab.Pane eventKey="profile">
						<ClientProfile/>
                    </Tab.Pane>
                </Tab.Content>
            </Tab.Container>
		</Container>
	);
}
