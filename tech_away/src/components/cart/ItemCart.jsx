import React from "react";
import { Button, Col, Container, Image, Row, Stack } from "react-bootstrap";
import { Tag } from "primereact/tag";

export default function ItemCart({ equipment }) {
	return (
		<Container
			className="background-white rounded-sm p-4"
			style={{ boxShadow: "var(--shadow-default)" }}
		>
			<Row>
				<Col className="d-flex justify-content-center align-items-center">
					<Image
						src={`../../../public/assets/pc.jpg`}
						width={100}
						style={{
							mixBlendMode: "darken",
						}}
					/>
				</Col>
				<Col>
					<Row>
						<Stack direction="verrical" className="align-items-start">
							<h5>Bamboo Watch</h5>
							<p>65 EUR</p>
							<Tag value="Usado"></Tag>
						</Stack>
					</Row>
					<Row>
						<Stack
							direction="horizontal"
							className="justify-content-end"
							gap={2}
						>
							<Button
								className="rounded-circle"
								style={{
									backgroundColor: "var(--variant-two)",
									border: "none",
								}}
							>
								<i className="pi pi-heart"></i>
							</Button>
							<Button
								className="rounded-circle"
								style={{ backgroundColor: "var(--danger)", border: "none" }}
							>
								<i className="pi pi-trash"></i>
							</Button>
						</Stack>
					</Row>
				</Col>
			</Row>
		</Container>
	);
}
