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
import InterestsTab from "../../components/profile/InterestsTab";

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
		<Container style={{ fontFamily: "var(--body-font)" }} className="mb-navbar">
			<Stack direction="vertical" gap={4} className="mb-4">
				{/* decoração */}
				{isMobile ? <SmDecoration /> : <LgDecoration />}
				<Row>
					<Col
						xs={12}
						sm={12}
						md={12}
						lg={5}
						className={isMobile ? "mb-4" : ""}
					>
						<ClientInfo />
					</Col>
					<Col
						xs={12}
						sm={12}
						md={12}
						lg={7}
						className={isMobile ? "mb-4" : ""}
					>
						<ProfileTabs />
					</Col>
				</Row>
				<Row>
					<InterestsTab />
				</Row>
			</Stack>
		</Container>
	);
}
