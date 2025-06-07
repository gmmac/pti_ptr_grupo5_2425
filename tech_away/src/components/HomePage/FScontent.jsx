import React from "react";
import { Container, Stack, Row, Col } from "react-bootstrap";
import Swirl from "../svg/Swirl";
import DivTelem from "./DivTelem";
import DivJoin from "./DivJoin";
import DivOurServices from "./DivOurServices";
import SecondLife from "../decoration/SecondLife";

export default function FScontent() {
	return (
		<Container className="mt-4">
			<Row>
				<SecondLife />
			</Row>
			<Row style={{ fontFamily: "var(--body-font)" }} className="mt-3">
				<Col lg={5}>
					<DivTelem />
				</Col>
				<Col lg={7}>
					<Stack direction="vertical" gap={3} className="h-100">
						<DivJoin />
						<DivOurServices />
					</Stack>
				</Col>
			</Row>
		</Container>
	);
}
