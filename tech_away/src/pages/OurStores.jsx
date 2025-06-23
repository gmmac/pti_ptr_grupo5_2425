import { useContext, useState, useEffect } from "react";
import { Container, Row, Col, Stack } from "react-bootstrap";
import MapProvider from "../contexts/MapProvider";
import { IsMobileContext } from "../contexts/IsMobileContext";
import SecondLife from "../components/decoration/SecondLife";
import SecondLifeSm from "../components/decoration/SecondLifeSm";
import api from "../utils/axios";

export default function OurStores() {
	const isMobile = useContext(IsMobileContext);
	const [selectedStore, setSelectedStore] = useState({});
	const [storeInfo, setStoreInfo] = useState(null);

	useEffect(() => {
		if (selectedStore && selectedStore.nipc) {
			api
				.get(`/api/store/${selectedStore.nipc}`)
				.then((res) => {
					setStoreInfo(res.data);
				})
				.catch((error) => {
					console.error("Error fetching store info:", error);
				});
		}
	}, [selectedStore]);

	useEffect(() => {
		if (Object.keys(selectedStore).length === 0) {
			setStoreInfo(null);
		}
	}, [selectedStore]);

	return (
		<Container className="mb-navbar">
			<Stack gap={4} direction="vertical" className="mb-5">
				{isMobile ? <SecondLifeSm /> : <SecondLife />}

				<Row>
					<Col xs={12} md={storeInfo ? 6 : 12}>
						<MapProvider onSelectStore={(store) => setSelectedStore(store)} />
					</Col>

					{storeInfo && (
						<Col xs={12} md={6}>
							<Stack
								gap={3}
								direction="vertical"
								style={{
									backgroundColor: "var(--white)",
									boxShadow: "var(--shadow-default)",
									borderRadius: "var(--rounded-sm)",
									height: "100%",
								}}
								className="p-4"
							>
								<h4 style={{ fontFamily: "var(--title-font)" }}>
									{storeInfo.name}
								</h4>

								<p className="mb-1">
									<i className="pi pi-map-marker me-2"></i>
									{storeInfo.address}
								</p>

								<p className="mb-1">
									<i className="pi pi-envelope me-2"></i>
									{storeInfo.email}
								</p>

								<p className="mb-1">
									<i className="pi pi-phone me-2"></i>
									{storeInfo.phone}
								</p>

								<p className="mb-0">
									<i className="pi pi-clock me-2"></i>
									{storeInfo.openTime} – {storeInfo.closeTime}
								</p>
							</Stack>
						</Col>
					)}
				</Row>
			</Stack>
		</Container>
	);
}
