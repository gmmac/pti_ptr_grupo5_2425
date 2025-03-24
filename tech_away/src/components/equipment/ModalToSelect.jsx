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
			onSelect(selectedRow.id);
			closeModal();
		}
	};

	return (
		<Modal show={showModal} onHide={closeModal}>
			<Modal.Header closeButton>
				<Modal.Title>{title}</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				<Form.Control
					type="text"
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
					className="mb-3"
				/>
				{list.length > 0 ? (
					<Table striped bordered hover>
						<thead>
							<tr>
								{columns.map((col, index) => (
									<th key={index}>{col}</th>
								))}
							</tr>
						</thead>
						<tbody>
							{list.map((item, rowIndex) => (
								<tr
									key={rowIndex}
									onClick={() => handleRowClick(item)}
									style={{
										cursor: "pointer",
										backgroundColor:
											selectedRow?.id === item.id ? "#d3d3d3" : "transparent",
									}}
								>
									{columns.map((col, colIndex) => (
										<td key={colIndex}>{item[col]}</td>
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
				<Button variant="secondary" onClick={closeModal}>
					Cancel
				</Button>
				<Button
					variant="primary"
					onClick={handleConfirm}
					disabled={!selectedRow}
				>
					Select
				</Button>
			</Modal.Footer>
		</Modal>
	);
}
