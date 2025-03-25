import React, { useState, useEffect } from "react";
import api from "../../utils/axios";
import { Table, Button, Stack, Modal } from "react-bootstrap";
import ModalEdit from "./ModalEdit"; // Importando o modal de edição

export default function DisplayTable({ model, params = "" }) {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedId, setSelectedId] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	// Buscar dados da API
	const fetchData = () => {
		api
			.get(`api/${model}`, { params })
			.then((res) => {
				if (res.data.length > 0) {
					// Filtrar colunas removendo 'createdAt' e 'updatedAt'
					const allColumns = Object.keys(res.data[0]).filter(
						(column) => column !== "createdAt" && column !== "updatedAt"
					);
					setData(res.data);
					setColumns(allColumns);
				}
			})
			.catch((error) => console.error("Erro ao buscar dados:", error));
	};

	useEffect(() => {
		fetchData();
	}, [model, params]);

	// Função para abrir modal de edição
	const handleEdit = (id) => {
		setSelectedId(id);
		setShowModal(true);
	};

	// Função para abrir modal de confirmação antes de deletar
	const handleDeleteConfirmation = (id) => {
		setDeleteId(id);
		setShowDeleteModal(true);
	};

	// Função para deletar e atualizar a tabela
	const handleDelete = () => {
		api
			.delete(`api/${model}/${deleteId}`)
			.then(() => {
				setShowDeleteModal(false);
				fetchData(); // Recarregar os dados da tabela
			})
			.catch((error) => console.error("Erro ao excluir:", error));
	};

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th key={index}>{column}</th>
						))}
						<th>Ações</th>
					</tr>
				</thead>
				<tbody>
					{data.map((item, rowIndex) => (
						<tr key={rowIndex}>
							{columns.map((column, colIndex) => (
								<td key={colIndex}>
									{typeof item[column] === "object" && item[column] !== null
										? item[column].name || JSON.stringify(item[column]) // Exibe 'name' se existir, senão converte para string
										: item[column]}
								</td>
							))}
							<td>
								<Stack
									direction="horizontal"
									gap={2}
									className="justify-content-center align-items-center"
								>
									<Button
										className="rounded-pill px-3"
										size="sm"
										style={{
											backgroundColor: "var(--variant-one)",
											border: "none",
										}}
										onClick={() => handleEdit(item.barcode)} // Abre modal ao clicar
									>
										Editar
									</Button>
									<Button
										className="rounded-pill px-3"
										onClick={() => handleDeleteConfirmation(item.barcode)} // Abre modal de confirmação
										size="sm"
										style={{ backgroundColor: "var(--danger)", border: "none" }}
									>
										Excluir
									</Button>
								</Stack>
							</td>
						</tr>
					))}
				</tbody>
			</Table>

			{/* Modal de edição */}
			<ModalEdit
				show={showModal}
				handleClose={() => setShowModal(false)}
				modelToEdit={model}
				id={selectedId}
				attributesToEdit={columns} // Passa apenas os atributos filtrados
				onSave={() => {
					setShowModal(false);
					fetchData(); // Atualiza os dados após salvar
				}}
			/>

			{/* Modal de Confirmação de Exclusão */}
			<Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Confirmar Exclusão</Modal.Title>
				</Modal.Header>
				<Modal.Body>Tem certeza que deseja excluir este item?</Modal.Body>
				<Modal.Footer>
					<Button
						variant="secondary"
						className="rounded-pill px-3"
						onClick={() => setShowDeleteModal(false)}
					>
						Cancelar
					</Button>
					<Button
						className="rounded-pill px-3"
						style={{ backgroundColor: "var(--danger)", border: "none" }}
						onClick={handleDelete}
					>
						Excluir
					</Button>
				</Modal.Footer>
			</Modal>
		</>
	);
}
