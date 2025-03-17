import React from "react";
import EquipmentSheetCard from "./EquipmentSheetCard";
import { Stack } from "react-bootstrap";

export default function EquipmentSheetCatalogue({ equipmentSheets }) {
	return (
		<Stack direction="horizontal" className="flex-wrap" gap={4}>
			{equipmentSheets &&
				equipmentSheets.map((item, index) => {
					return <EquipmentSheetCard key={index} eSheet={item} />;
				})}
		</Stack>
	);
}
