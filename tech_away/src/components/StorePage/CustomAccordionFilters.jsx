import React, { useState } from "react";
import { Button, Collapse, Stack } from "react-bootstrap";
import SearchableSelect from "./SearchableSelect";
import OrderBySelect from "./OrderBySelect";

export default function CustomAccordionFilters({
	filters,
	setFilters,
	types,
	models,
	brands,
}) {
	const [open, setOpen] = useState(false);

	const clearFilters = () => {
		setFilters({ orderBy: "", type: "", model: "", brand: "" });
	};

	return (
		<div
			className="p-3 rounded-pill"
			style={{
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
				fontFamily: "var(--body-font)",
			}}
		>
			<Button
				onClick={() => setOpen(!open)}
				aria-controls="custom-filters-body"
				aria-expanded={open}
				className="w-100 rounded-pill px-4 py-2"
				style={{
					backgroundColor: "var(--light-grey)",
					color: "var(--dark-grey)",
					border: "none",
				}}
			>
				<Stack direction="horizontal" className="justify-content-between">
					<span>Filters</span>
					<i className={`pi pi-chevron-${open ? "up" : "down"}`}></i>
				</Stack>
			</Button>

			<Collapse in={open}>
				<div id="custom-filters-body">
					<Stack gap={3} className="mt-3">
						<Stack
							gap={3}
							direction="horizontal"
							className="flex-wrap justify-content-start"
						>
							<OrderBySelect
								label="Order By"
								value={filters.orderBy}
								onChange={(val) => setFilters({ ...filters, orderBy: val })}
								options={[
									{ label: "Alphabetical", value: "ASC" },
									{ label: "Reverse Alphabetical", value: "DESC" },
									{ label: "Recent Date", value: "recent-date" },
									{ label: "Oldest Date", value: "oldest-date" },
								]}
							/>

							<SearchableSelect
								label="Type"
								options={types}
								selected={filters.type}
								onChange={(value) => setFilters({ ...filters, type: value })}
							/>

							<SearchableSelect
								label="Model"
								options={models}
								selected={filters.model}
								onChange={(value) => setFilters({ ...filters, model: value })}
							/>

							<SearchableSelect
								label="Brand"
								options={brands}
								selected={filters.brand}
								onChange={(value) => setFilters({ ...filters, brand: value })}
							/>
						</Stack>

						<Button
							className="rounded-pill w-100"
							style={{
								backgroundColor: "var(--variant-one)",
								color: "var(--white)",
								border: "none",
							}}
							variant="secondary"
							disabled={
								!filters.orderBy &&
								!filters.model &&
								!filters.type &&
								!filters.brand
							}
							onClick={clearFilters}
						>
							Clear
						</Button>
					</Stack>
				</div>
			</Collapse>
		</div>
	);
}
