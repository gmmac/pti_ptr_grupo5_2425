import React, { useState, useContext } from "react";
import { Nav, Tab, Container, Stack, Row, Col } from "react-bootstrap";
import "../../styles/variables.css";
import ClientProfile from "../../components/client/ClientProfile";
import "../../styles/ClientProfilePage.css";
import ClientRepairs from "../../components/client/ClientRepairs";
import LgDecoration from "../../components/profile/LgDecoration";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import SmDecoration from "../../components/profile/SmDecoration";
import ClientInfo from "../../components/profile/ClientInfo";
import ProfileTabs from "../../components/profile/ProfileTabs";

export default function ProfilePageClient() {
	const isMobile = useContext(IsMobileContext);

	const [activeTab, setActiveTab] = useState(
		sessionStorage.getItem("clientSelctedTab") || "profile"
	);

	const selectTab = (selectedTab) => {
		setActiveTab(selectedTab);
		sessionStorage.setItem("clientSelctedTab", selectedTab);
	};
	return (
		<Container style={{ fontFamily: "var(--body-font)" }}>
			<Stack direction="vertical" gap={3} className="mb-4">
				{/* decoração */}
				{isMobile ? <SmDecoration /> : <LgDecoration />}
				<Row>
					<Col xs={12} sm={12} md={12} lg={5} className="mb-3">
						<ClientInfo />
					</Col>
					<Col xs={12} sm={12} md={12} lg={7} className="mb-3">
						<ProfileTabs />
					</Col>
				</Row>

				<Tab.Container
					defaultActiveKey="profile"
					activeKey={activeTab}
					onSelect={(selectedKey) => selectTab(selectedKey)}
				>
					<Nav variant="tabs" className="mb-3 nav-fill">
						<Nav.Item className="custom-tabs">
							<Nav.Link eventKey="profile">Profile</Nav.Link>
						</Nav.Item>
						<Nav.Item className="custom-tabs">
							<Nav.Link eventKey="repairs">Repairs</Nav.Link>
						</Nav.Item>
						<Nav.Item className="custom-tabs">
							<Nav.Link eventKey="sales">Sales</Nav.Link>
						</Nav.Item>
						<Nav.Item className="custom-tabs">
							<Nav.Link eventKey="purchases">Purchases</Nav.Link>
						</Nav.Item>
					</Nav>

					<Tab.Content className="custom-tab-content">
						<Tab.Pane eventKey="sales">
							<p>Tab content for Sales</p>
						</Tab.Pane>
						<Tab.Pane eventKey="purchases">
							<p>Tab content for Purchases</p>
						</Tab.Pane>
						<Tab.Pane eventKey="repairs">
							<ClientRepairs isSelected={activeTab === "repairs"} />
						</Tab.Pane>
						<Tab.Pane eventKey="profile">
							<ClientProfile />
						</Tab.Pane>
					</Tab.Content>
				</Tab.Container>
			</Stack>
		</Container>
	);
}
