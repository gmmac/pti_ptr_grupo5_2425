import React, { useState, useRef, useEffect } from "react";
import { Button, Stack } from "react-bootstrap";
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
	const dropdownRef = useRef(null);

	const clearFilters = () => {
		setFilters({ orderBy: "", type: "", model: "", brand: "" });
	};

	// Fecha ao clicar fora
	useEffect(() => {
		const handleClickOutside = (event) => {
			if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
				setOpen(false);
			}
		};
		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	return (
		<div
			className="position-relative"
			ref={dropdownRef}
			style={{ zIndex: 1000 }}
		>
			<Button
				onClick={() => setOpen((prev) => !prev)}
				className="w-100 rounded-pill px-4 py-3"
				style={{
					backgroundColor: "var(--white)",
					color: "var(--dark-grey)",
					border: "none",
					boxShadow: "var(--shadow-default)",
				}}
			>
				<Stack direction="horizontal" className="justify-content-between">
					<Stack direction="horizontal" gap={2}>
						<i
							className="pi pi-filter"
							style={{ color: "var(--dark-grey)" }}
						></i>
						<span style={{ fontFamily: "var(--body-font)" }}>Filters</span>
					</Stack>
					<i
						className={`pi pi-chevron-${open ? "up" : "down"}`}
						style={{ color: "var(--dark-grey)" }}
					></i>
				</Stack>
			</Button>

			{open && (
				<div
					className="position-absolute mt-2 w-100 shadow bg-white p-4 rounded-sm"
					style={{
						top: "100%",
						left: 0,
						backgroundColor: "var(--white)",

						boxShadow: "var(--shadow-default)",
						zIndex: 2000,
					}}
				>
					<Stack gap={3}>
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
			)}
		</div>
	);
}
