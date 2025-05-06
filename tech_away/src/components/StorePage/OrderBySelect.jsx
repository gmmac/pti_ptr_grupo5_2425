import React, { useState, useRef, useEffect } from "react";
import { Button, Form, Stack } from "react-bootstrap";

export default function OrderBySelect({
	label = "Select",
	options = [],
	value = "",
	onChange,
}) {
	const [isOpen, setIsOpen] = useState(false);
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

	return (
		<div className="position-relative" ref={ref}>
			<Button
				type="button"
				style={{
					backgroundColor: value ? "var(--variant-one)" : "var(--light-grey)",
					color: "var(--dark-grey)",
					border: "none",
					boxShadow: "var(--shadow-default)",
				}}
				className="rounded-pill px-4"
				onClick={toggleDropdown}
			>
				<Stack
					direction="horizontal"
					className="justify-content-between align-items-center"
					gap={2}
				>
					<span>{label}</span>
					<i className="pi pi-chevron-down" style={{ fontSize: "0.8rem" }}></i>
				</Stack>
			</Button>

			{isOpen && (
				<div
					className="border rounded shadow bg-white position-absolute mt-2 p-3"
					style={{
						zIndex: 1000,
						width: "150%",
						maxHeight: "250px",
						overflowY: "auto",
					}}
				>
					{options.map((opt) => (
						<Form.Check
							type="radio"
							key={opt.value}
							id={`order-${opt.value}`}
							name="single-select"
							label={opt.label}
							checked={value === opt.value}
							onChange={() => {
								onChange(opt.value);
								setIsOpen(false); // fecha ao selecionar
							}}
						/>
					))}
				</div>
			)}
		</div>
	);
}
