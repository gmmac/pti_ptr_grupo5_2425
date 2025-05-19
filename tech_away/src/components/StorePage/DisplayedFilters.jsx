import React from "react";
import { Stack } from "react-bootstrap";

export default function DisplayedFilters({ filters, setFilters }) {
	const removeFilter = (keyToRemove, valueToRemove = null) => {
		setFilters((prevFilters) => {
			const currentValue = prevFilters[keyToRemove];

			if (Array.isArray(currentValue)) {
				const newArray = currentValue.filter((v) => v.id !== valueToRemove.id);
				return {
					...prevFilters,
					[keyToRemove]: newArray.length > 0 ? newArray : "",
				};
			}

			return {
				...prevFilters,
				[keyToRemove]: "",
			};
		});
	};

	// Verifica se existe algum filtro com valor válido
	if (!Object.values(filters).some((value) => value && value.length !== 0))
		return null;

	return (
		<Stack
			direction="horizontal"
			gap={2}
			style={{ color: "var(--dark-grey)", fontFamily: "var(--body-font)" }}
		>
			{Object.entries(filters).flatMap(([key, value]) => {
				if (Array.isArray(value)) {
					// Array de objetos (e.g., type, brand)
					return value.map((val) => (
						<Stack
							key={`${key}-${val.id}`}
							direction="horizontal"
							className="justify-content-between align-items-center filter-chip py-2 px-3 rounded-pill"
							gap={3}
							style={{
								backgroundColor: "var(--white)",
								boxShadow: "var(--shadow-default)",
							}}
						>
							<p className="m-0">{val.name}</p>
							<i
								className="pi pi-times"
								style={{ cursor: "pointer" }}
								onClick={() => removeFilter(key, val)}
							></i>
						</Stack>
					));
				} else if (value && typeof value === "object") {
					// Objeto único
					return (
						<Stack
							key={`${key}-${value.id}`}
							direction="horizontal"
							className="justify-content-between align-items-center filter-chip py-2 px-3 rounded-pill"
							gap={3}
							style={{
								backgroundColor: "var(--white)",
								boxShadow: "var(--shadow-default)",
							}}
						>
							<p className="m-0">{value.name}</p>
							<i
								className="pi pi-times"
								style={{ cursor: "pointer" }}
								onClick={() => removeFilter(key)}
							></i>
						</Stack>
					);
				} else if (value) {
					// Valor direto, como string (ex: orderBy)
					return (
						<Stack
							key={`${key}-${value}`}
							direction="horizontal"
							className="justify-content-between align-items-center filter-chip py-2 px-3 rounded-pill"
							gap={3}
							style={{
								backgroundColor: "var(--white)",
								boxShadow: "var(--shadow-default)",
							}}
						>
							<p className="m-0">
								{key}: {value}
							</p>
							<i
								className="pi pi-times"
								style={{ cursor: "pointer" }}
								onClick={() => removeFilter(key)}
							></i>
						</Stack>
					);
				}
				return [];
			})}
		</Stack>
	);
}
