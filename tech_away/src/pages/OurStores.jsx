import React, { useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import MapProvider from "../contexts/MapProvider";
import { IsMobileContext } from "../contexts/IsMobileContext";

export default function OurStores() {
	const isMobile = useContext(IsMobileContext);

	return (
		<Container className="mb-navbar">
			<Row className={isMobile ? "mt-3" : ""}>
				<Col xs={12} md={6}>
					<MapProvider />
				</Col>
			</Row>
		</Container>	
	);
}
