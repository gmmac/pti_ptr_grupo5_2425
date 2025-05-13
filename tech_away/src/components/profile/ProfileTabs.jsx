import React from "react";
import { Stack, Button } from "react-bootstrap";
import RepairTab from "./RepairTab";
import PurchaseTab from "./PurchaseTab";
import SalesTab from "./SalesTab";

export default function ProfileTabs() {
	const [repairBtnActive, setRepairBtnActive] = React.useState(false);
	const [salesBtnActive, setSalesBtnActive] = React.useState(false);
	const [purchasesBtnActive, setPurchasesBtnActive] = React.useState(true);

	return (
		<Stack gap={3} direction="vertical">
			<Stack direction="horizontal" gap={3}>
				<Button
					className="rounded-pill py-2 px-3 w-100"
					style={{
						backgroundColor: repairBtnActive
							? "var(--variant-one)"
							: "var(--white)",
						fontFamily: "var(--title-font)",
						border: "none",
						color: repairBtnActive ? "var(--white)" : "var(--dark-grey)",
					}}
					onClick={() => {
						setRepairBtnActive(!repairBtnActive);
						setSalesBtnActive(false);
						setPurchasesBtnActive(false);
					}}
				>
					Repairs
				</Button>
				<Button
					className="rounded-pill py-2 px-3 w-100"
					style={{
						backgroundColor: salesBtnActive
							? "var(--variant-one)"
							: "var(--white)",
						fontFamily: "var(--title-font)",
						border: "none",
						color: salesBtnActive ? "var(--white)" : "var(--dark-grey)",
					}}
					onClick={() => {
						setSalesBtnActive(!salesBtnActive);
						setRepairBtnActive(false);
						setPurchasesBtnActive(false);
					}}
				>
					Sales
				</Button>
				<Button
					className="rounded-pill py-2 px-3 w-100"
					style={{
						backgroundColor: purchasesBtnActive
							? "var(--variant-one)"
							: "var(--white)",
						fontFamily: "var(--title-font)",
						border: "none",
						color: purchasesBtnActive ? "var(--white)" : "var(--dark-grey)",
					}}
					onClick={() => {
						setPurchasesBtnActive(!purchasesBtnActive);
						setRepairBtnActive(false);
						setSalesBtnActive(false);
					}}
				>
					Purchases
				</Button>
			</Stack>
			<Stack
				style={{
					fontFamily: "var(--body-font)",
					backgroundColor: "var(--white)",
					borderRadius: "var(--rounded-sm)",
				}}
				className="p-4"
				gap={3}
			>
				{repairBtnActive && <RepairTab />}
				{purchasesBtnActive && <PurchaseTab />}
				{salesBtnActive && <SalesTab />}
			</Stack>
		</Stack>
	);
}
