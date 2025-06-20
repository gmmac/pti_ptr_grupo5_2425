import React, { useEffect, useState, useContext } from "react";
import { Stack, Button } from "react-bootstrap";
import api from "../../utils/axios";
import { IsMobileContext } from "../../contexts/IsMobileContext";
import SearchableSelect from "./SearchableSelect";
import OrderBySelect from "./OrderBySelect";
import CustomAccordionFilters from "./CustomAccordionFilters";

export default function Filters({ filters, setFilters }) {
	const [types, SetTypes] = useState([]);
	const [models, setModels] = useState([]);
	const [brands, setBrands] = useState([]);
	const isMobile = useContext(IsMobileContext);

	useEffect(() => {
		api
			.get("api/type")
			.then((res) => {
				const typesObj = res.data.data;
				const typesArray = Object.keys(typesObj).map((key) => ({
					id: typesObj[key].id,
					name: typesObj[key].name,
				}));
				SetTypes(typesArray);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	useEffect(() => {
		api
			.get("api/model")
			.then((res) => {
				const modelsObj = res.data.data;

				const modelsArray = Object.keys(modelsObj).map((key) => ({
					id: modelsObj[key].id,
					name: modelsObj[key].name,
				}));
				setModels(modelsArray);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	useEffect(() => {
		api
			.get("api/brand")
			.then((res) => {
				const brandsObj = res.data.data;
				const brandsArray = Object.keys(brandsObj).map((key) => ({
					id: brandsObj[key].id,
					name: brandsObj[key].name,
				}));
				setBrands(brandsArray);
			})
			.catch((error) => {
				console.error("API error:", error.message);
			});
	}, []);

	const clearFilters = () => {
		setFilters({ orderBy: "", type: "", model: "", brand: "", store: "" });
	};

	return isMobile ? (
		<CustomAccordionFilters
			filters={filters}
			setFilters={setFilters}
			types={types}
			models={models}
			brands={brands}
		/>
	) : (
		<Stack
			direction="horizontal"
			style={{
				backgroundColor: "var(--white)",
				fontFamily: "var(--body-font)",
				color: "var(--dark-grey)",
			}}
			gap={2}
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

			<Stack
				direction="horizontal"
				gap={2}
				className="justify-content-center align-items-center"
			>
				<Button
					className="rounded-pill px-4"
					style={{
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
		</Stack>
	);
}
