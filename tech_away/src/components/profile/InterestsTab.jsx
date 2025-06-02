import React from "react";
import { Button, Container, Stack } from "react-bootstrap";

export default function InterestsTab() {
	return (
		<Stack
			direction="vertical"
			className="p-4"
			gap={3}
			style={{
				fontFamily: "var(--body-font)",
				backgroundColor: "var(--white)",
				borderRadius: "var(--rounded-sm)",
			}}
		>
			<Stack direction="horizontal" className="justify-content-between">
				<h5 className="m-0" style={{ fontFamily: "var(--title-font)" }}>
					Interests
				</h5>
				<Button
					className="rounded-pill py-2 px-3 d-flex gap-2 justify-content-center align-items-center gap-2"
					style={{
						backgroundColor: "var(--variant-one)",
						color: "var(--white)",
						border: "none",
					}}
				>
					<i className="pi pi-heart"></i>
					<span>Add New Interest</span>
				</Button>
			</Stack>
		</Stack>
	);
}
