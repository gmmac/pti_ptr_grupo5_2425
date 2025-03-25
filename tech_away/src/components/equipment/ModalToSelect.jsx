import React, { useState, useEffect } from "react";
import { Modal, Table, Button, Form } from "react-bootstrap";
import api from "../../utils/axios";

export default function ModalToSelect({
	showModal,
	closeModal,
	title,
	onSelect,
}) {
	const [list, setList] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectedRow, setSelectedRow] = useState(null);
	const [search, setSearch] = useState("");

	useEffect(() => {
		if (!showModal) return; // Evita chamadas desnecessárias

		api
			.get(`api/${title}`, {
				params: { search },
			})
			.then((res) => {
				if (res.data.length > 0) {
					setList(res.data);
					const allColumns = Object.keys(res.data[0]);
					const filteredColumns = allColumns.filter(
						(col) => col !== "createdAt" && col !== "updatedAt"
					);
					setColumns(filteredColumns);
				} else {
					setList([]);
					setColumns([]);
				}
			})
			.catch((error) => {
				console.error("API error:", error.message);
				setList([]);
				setColumns([]);
			});
	}, [showModal, title, search]);

	const handleRowClick = (item) => {
		setSelectedRow(item);
	};

	const handleConfirm = () => {
		if (selectedRow) {
			onSelect({ id: selectedRow.id, name: selectedRow.name });
			closeModal();
		}
	};

	return (
		<Modal show={showModal} onHide={closeModal} size="lg">
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control
					type="text"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="mb-3 rounded-pill"
				/>
				{list.length > 0 ? (
					<Table bordered hover responsive="sm">
						<thead>
							<tr>
								{columns.map((col, index) => (
									<th key={index}>{col}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{list.map((item, rowIndex) => (
								<tr key={rowIndex} onClick={() => handleRowClick(item)}>
									{columns.map((col, colIndex) => (
										<td
											key={colIndex}
											style={{
												cursor: "pointer",
												backgroundColor:
													selectedRow?.id === item.id
														? "var(--variant-one)"
														: "transparent", // Cor de fundo para a linha selecionada
												color: selectedRow?.id === item.id ? "#fff" : "inherit", // Cor do texto na linha selecionada
											}}
										>
											{item[col]}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</Table>
				) : (
					<p className="text-center">Nenhum dado encontrado.</p>
				)}
			</Modal.Body>
			<Modal.Footer>
				<Button
					variant="secondary"
					className="rounded-pill px-4"
					onClick={closeModal}
				>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={handleConfirm}
					disabled={!selectedRow}
					className="rounded-pill px-4"
					style={{
						backgroundColor: "var(--variant-one)",
						border: "none",
					}}
				>
					Select
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
