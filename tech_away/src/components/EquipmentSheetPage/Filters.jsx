import React, { useEffect, useState, useContext } from "react";
import api from "../../utils/axios";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import { Button, Stack } from "react-bootstrap";
import OrderBySelect from "../StorePage/OrderBySelect";
import SearchableSelect from "../StorePage/SearchableSelect";

export default function Filters({ filters, setFilters }) {
	const isMobile = useContext(IsMobileContext);

	const [states, setTates] = useState([]);

	useEffect(() => {
		api
			.get("/api/equipmentStatus")
			.then((res) => {
				const statesObj = res.data;

				const statesArray = Object.keys(statesObj).map((key) => ({
					id: statesObj[key].id,
					name: statesObj[key].state,
				}));
				setTates(statesArray);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	const clearFilters = () => {
		setFilters({ orderBy: "", state: "" });
	};

	return (
		<Stack
			direction="horizontal"
			gap={2}
			style={{
				backgroundColor: "var(--white)",
				fontFamily: "var(--body-font)",
				color: "var(--dark-grey)",
			}}
			className="rounded-pill p-3 justify-content-between align-items-center"
		>
			<Stack
				direction="horizontal"
				gap={2}
				className="justify-content-center align-items-center"
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
					label="State"
					options={states}
					selected={filters.state}
					onChange={(val) => setFilters({ ...filters, state: val })}
				/>
			</Stack>
			<Button
				className="rounded-pill px-4"
				style={{
					color: "var(--white)",
					border: "none",
				}}
				disabled={filters.state == "" && filters.orderBy == ""}
				variant="secondary"
				onClick={clearFilters}
			>
				Clear
			</Button>
		</Stack>
	);
}
