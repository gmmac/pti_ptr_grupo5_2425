import React, { createContext, useState, useContext } from "react";

const FilterContext = createContext();

export const FilterProvider = ({ children, defaultFilters = {} }) => {
	const [filters, setFilters] = useState({
		...defaultFilters,
		orderBy: "createdAt",
		orderDirection: "DESC",
	});

	return (
		<FilterContext.Provider value={{ filters, setFilters }}>
			{children}
		</FilterContext.Provider>
	);
};

export const useFilter = () => useContext(FilterContext);
