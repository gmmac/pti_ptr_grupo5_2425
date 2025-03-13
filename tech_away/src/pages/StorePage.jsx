import React, { useEffect, useState } from "react";
import FilterSearch from "../components/StorePage/FilterSearch";
import { useFilter } from "../contexts/FilterProvider";

import api from "../utils/axios";

export default function StorePage() {
	const [equipmentModelCatalog, setEquipmentModelCatalog] = useState([]);
	const [refresh, setRefresh] = useState(false);

	const { filters } = useFilter();

	useEffect(() => {
		api.get("/api/equipmentSheet/", {
            
        });
	});

	return (
		<>
			<FilterSearch></FilterSearch>
		</>
	);
}
