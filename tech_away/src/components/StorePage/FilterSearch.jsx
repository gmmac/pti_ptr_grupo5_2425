import React from "react";
import { useFilter } from "../../contexts/FilterProvider";
import SearchBar from "../searchBar/SearchBar";

export default function FilterSearch() {
	const { filters, setFilters } = useFilter();
	const [localFilters, setLocalFilters] = useState(filters);
	const [orderField, setOrderField] = useState("");
	const [orderDirection, setOrderDirection] = useState("");

	const handleChange = (e) => {
		const { name, value } = e.target;
		setLocalFilters((prev) => ({ ...prev, [name]: value }));
	};

	const handleOrderSelection = (field, direction) => {
		if (orderField === field && orderDirection === direction) {
			setOrderField("");
			setOrderDirection("");
		} else {
			setOrderField(field);
			setOrderDirection(direction);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		setFilters((prevFilters) => ({
			...prevFilters,
			...localFilters,
			orderBy: orderField,
			orderDirection: orderDirection,
		}));
	};

	const handleClear = () => {
		const clearedFilters = {
			name: "",
			recentlyAdded: "",
			clientNIC: "",
			orderBy: "createdAt",
			orderDirection: "DESC",
		};

		setLocalFilters(clearedFilters);
		setFilters(clearedFilters);
		setOrderField("createdAt");
		setOrderDirection("DESC");
	};

	return (
		<>
			<SearchBar
				value={localFilters.name}
				onChange={handleChange}
				name="name"
				placeholder="Search by Name"
			></SearchBar>
		</>
	);
}
