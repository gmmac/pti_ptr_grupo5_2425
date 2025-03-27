import React, { useState, useEffect, use } from "react";
import api from "../../utils/axios";
import { Table, Button, Stack, Modal, Pagination } from "react-bootstrap";
import ModalEdit from "./ModalEdit";

export default function DisplayTable({ model, params = "" }) {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [showModal, setShowModal] = useState(false);
	const [selectedObj, setSelectedObj] = useState(null);
	const [showDeleteModal, setShowDeleteModal] = useState(false);
	const [deleteId, setDeleteId] = useState(null);

	// Estado da paginação
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [totalItems, setTotalItems] = useState(0);
	const [pageSize] = useState(6); // Número fixo, pode ser alterado depois

	// Estado da ordenação
	const [orderBy, setOrderBy] = useState("createdAt");
	const [orderDirection, setOrderDirection] = useState("DESC");

	// Buscar dados da API com paginação e ordenação
	const fetchData = () => {
		api
			.get(`api/${model}`, {
				params: {
					...params,
					page: currentPage,
					pageSize,
					orderBy,
					orderDirection,
				},
			})
			.then((res) => {
				if (res.data.data.length > 0) {
					const allColumns = Object.keys(res.data.data[0]).filter(
						(col) => col !== "createdAt" && col !== "updatedAt"
					);
					setData(res.data.data);
					setColumns(allColumns);
					setTotalPages(res.data.totalPages);
					setTotalItems(res.data.totalItems);
				}
			})
			.catch((error) => console.error("Erro ao buscar dados:", error));
	};

	useEffect(() => {
		fetchData();
	}, [model, params, currentPage, orderBy, orderDirection]);

	useEffect(() => {
		console.log(data);
	}, [data]);
	// Função para abrir modal de edição
	const handleEdit = (item) => {
		setSelectedObj(item);
		setShowModal(true);
	};

	// Função para abrir modal de confirmação antes de deletar
	const handleDeleteConfirmation = (item) => {
		setDeleteId(item[columns[0]]); // Selecionar a primeira coluna para funcionar com o id e com o barcode
		setShowDeleteModal(true);
	};

	// Função para deletar e atualizar a tabela
	const handleDelete = () => {
		api
			.delete(`api/${model}/${deleteId}`)
			.then(() => {
				setShowDeleteModal(false);
				fetchData();
			})
			.catch((error) => console.error("Erro ao excluir:", error));
	};

	// Alternar direção da ordenação ao clicar no cabeçalho
	const handleSort = (column) => {
		if (orderBy === column) {
			setOrderDirection(orderDirection === "ASC" ? "DESC" : "ASC");
		} else {
			setOrderBy(column);
			setOrderDirection("ASC");
		}
	};

	useEffect(() => {
		console.log(selectedObj);
	}, [selectedObj]);

	return (
		<>
			<Table striped bordered hover>
				<thead>
					<tr>
						{columns.map((column, index) => (
							<th
								key={index}
								onClick={() => handleSort(column)}
								style={{ cursor: "pointer" }}
							>
								{column}{" "}
								{orderBy === column
									? orderDirection === "ASC"
										? "🔼"
										: "🔽"
									: ""}
							</th>
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
										? item[column].name || JSON.stringify(item[column])
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
										onClick={() => handleEdit(item)}
									>
										Editar
									</Button>
									<Button
										className="rounded-pill px-3"
										onClick={() => handleDeleteConfirmation(item)}
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

			{/* Paginação */}
			{totalPages > 1 && (
				<Pagination className="justify-content-center">
					<Pagination.Prev
						disabled={currentPage === 1}
						onClick={() => setCurrentPage(currentPage - 1)}
					/>
					{Array.from({ length: totalPages }, (_, i) => (
						<Pagination.Item
							key={i}
							active={i + 1 === currentPage}
							onClick={() => setCurrentPage(i + 1)}
						>
							{i + 1}
						</Pagination.Item>
					))}
					<Pagination.Next
						disabled={currentPage === totalPages}
						onClick={() => setCurrentPage(currentPage + 1)}
					/>
				</Pagination>
			)}

			{/* Modal de edição */}
			<ModalEdit
				show={showModal}
				handleClose={() => setShowModal(false)}
				modelToEdit={model}
				objectToChange={selectedObj || {}} // Garante que não será null
				attributesToEdit={columns}
				onSave={() => {
					setShowModal(false);
					fetchData();
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
