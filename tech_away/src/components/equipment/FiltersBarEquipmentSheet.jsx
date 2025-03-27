import React, { useState } from "react";
import { Button, Form, Stack } from "react-bootstrap";

export default function FiltersBarEquipmentSheet({ paramsTofilter }) {
	const [filterField, setFilterField] = useState(""); // Campo selecionado para busca
	const [searchValue, setSearchValue] = useState(""); // Valor digitado pelo usuário

	const params = [{ name: "barcode" }, { name: "model" }, { name: "type" }];

	// Atualiza o campo de busca
	const handleFieldChange = (e) => {
		setFilterField(e.target.value);
	};

	// Atualiza o valor digitado na busca
	const handleSearchChange = (e) => {
		setSearchValue(e.target.value);
	};

	// Executa a pesquisa ao clicar no botão
	const handleSearch = () => {
		if (filterField) {
			paramsTofilter((prev) => ({
				...prev,
				[filterField]: searchValue, // Pesquisa pelo campo selecionado
			}));
		}
	};

	return (
		<Stack
			direction="horizontal"
			style={{
				backgroundColor: "var(--white)",
				boxShadow: "var(--shadow-default)",
			}}
			gap={3}
			className="p-2 justify-content-center align-items-center rounded-pill"
		>
			{/* Dropdown para escolher o campo de pesquisa */}
			<Form.Select
				value={filterField}
				onChange={handleFieldChange}
				className="rounded-pill w-25"
				style={{
					backgroundColor: "var(--variant-one)",
					color: "var(--dark-grey)",
				}}
			>
				<option value="">Filtrar por:</option>
				{params.map((param) => (
					<option key={param.name} value={param.name}>
						{param.name}
					</option>
				))}
			</Form.Select>
			{/* Input de busca */}
			<Form.Control
				type="text"
				placeholder="Search..."
				value={searchValue}
				onChange={handleSearchChange}
				className="rounded-pill w-50"
				style={{ backgroundColor: "var(--white)" }}
			/>
			<Button className="rounded-pill w-25" variant="secondary">
				Clear
			</Button>
			{/* Botão de pesquisa */}
			<Button
				className="rounded-pill w-25"
				style={{ backgroundColor: "var(--variant-two)", border: "none" }}
				onClick={handleSearch}
				disabled={!filterField} // Bloqueia se nenhum campo for escolhido
			>
				Search
			</Button>
		</Stack>
	);
}
