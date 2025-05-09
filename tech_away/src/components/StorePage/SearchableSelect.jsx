import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Stack } from "react-bootstrap";

export default function SearchableCheckboxList({
	label = "Filter",
	options = [],
	selected = [],
	onChange,
	optionLabel = "name",
	optionValue = "id",
}) {
	const [isOpen, setIsOpen] = useState(false);
	const [search, setSearch] = useState("");
	const ref = useRef(null);

	const toggleDropdown = () => setIsOpen((prev) => !prev);

	// Fecha ao clicar fora
	useEffect(() => {
		function handleClickOutside(event) {
			if (ref.current && !ref.current.contains(event.target)) {
				setIsOpen(false);
			}
		}

		document.addEventListener("mousedown", handleClickOutside);
		return () => document.removeEventListener("mousedown", handleClickOutside);
	}, []);

	const filteredOptions = options.filter((item) =>
		item[optionLabel]?.toLowerCase().includes(search.toLowerCase())
	);

	const handleToggle = (value) => {
		const isSelected = selected.includes(value);
		const newSelected = isSelected
			? selected.filter((v) => v !== value)
			: [...selected, value];
		onChange(newSelected);
	};

	return (
		<div
			className="position-relative w-100"
			ref={ref}
			style={{ fontFamily: "var(--body-font)" }}
		>
			<Button
				type="button"
				style={{
					backgroundColor:
						selected.length > 0 ? "var(--variant-one)" : "var(--light-grey)",
					color: "var(--dark-grey)",
					border: "none",
					boxShadow: "var(--shadow-default)",
				}}
				className="rounded-pill px-4 w-100"
				onClick={toggleDropdown}
			>
				<Stack
					direction="horizontal"
					gap={5}
					className="align-items-center justify-content-between"
				>
					<span>
						{label}
						{selected.length > 0 && `(${selected.length})`}
					</span>

					<i
						className="pi pi-chevron-down"
						style={{ color: "var(--dark-grey)", fontSize: "0.8rem" }}
					></i>
				</Stack>
			</Button>

			{isOpen && (
				<div
					className="border rounded shadow bg-white position-absolute mt-2 p-3"
					style={{
						zIndex: 1000,
						width: "125%",
						maxHeight: "250px",
						overflowY: "auto",
					}}
				>
					<Form.Control
						type="text"
						className="mb-2 rounded-pill"
						placeholder={`Search ${label.toLowerCase()}`}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>

					{filteredOptions.length > 0 ? (
						filteredOptions.map((item) => (
							<Form.Check
								key={item[optionValue]}
								id={`${label}-${item[optionValue]}`}
								type="checkbox"
								label={item[optionLabel]}
								checked={selected.includes(item[optionValue])}
								onChange={() => handleToggle(item[optionValue])}
							/>
						))
					) : (
						<div className="text-muted small">No results</div>
					)}
				</div>
			)}
		</div>
	);
}
