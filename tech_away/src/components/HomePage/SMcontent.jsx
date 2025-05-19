import React from "react";
import { Container, Stack } from "react-bootstrap";
import Swirl from "../svg/Swirl";
import DivTelem from "./DivTelem";
import DivJoin from "./DivJoin";
import DivOurServices from "./DivOurServices";
import SecondLifeSm from "../decoration/SecondLifeSm";

export default function SMcontent(isMobile) {
	return (
		<Container>
			<Stack gap={4}>
				<SecondLifeSm />
				<DivTelem />
				<DivJoin />
				<DivOurServices />
				<div style={{ height: "75px" }}></div>
			</Stack>
		</Container>
	);
}
