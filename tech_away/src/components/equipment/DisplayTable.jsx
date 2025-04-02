import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FilterMatchMode } from "primereact/api";
import api from "../../utils/axios";
import ModalEdit from "./ModalEdit";
import FormsEquipmentSheet from "./FormsEquipmentSheet";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function DisplayTable({ model }) {
	const [data, setData] = useState([]);
	const [columns, setColumns] = useState([]);
	const [selectedObj, setSelectedObj] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const menuRefs = useRef([]);
	const [globalFilterValue, setGlobalFilterValue] = useState("");
	const [queryParams, setQueryParams] = useState({
		filters: {},
		sortField: null,
		sortOrder: null,
		page: 1,
		pageSize: 6,
	});

	const [filters, setFilters] = useState({
		global: { value: null, matchMode: FilterMatchMode.CONTAINS },
	});

	const [showEquipmentModal, setShowEquipmentModal] = useState(false);

	const handleOpenEquipmentModal = () => setShowEquipmentModal(true);
	const handleCloseEquipmentModal = () => setShowEquipmentModal(false);

	const fetchData = () => {
		api.get(`api/${model}`, { params: queryParams }).then((res) => {
			if (res.data.data.length > 0) {
				const allColumns = Object.keys(res.data.data[0]).filter(
					(col) => col !== "CreatedAt" && col !== "UpdatedAt"
				);
				setData(res.data.data);
				setColumns(allColumns);
			}
		});
	};

	useEffect(() => {
		fetchData();
	}, [model, queryParams]);

	const onGlobalFilterChange = (e) => {
		const value = e.target.value;
		setFilters({
			...filters,
			global: { value, matchMode: FilterMatchMode.CONTAINS },
		});
		setGlobalFilterValue(value);
	};

	const confirmDelete = (id) => {
		confirmDialog({
			message: "Are you sure you want to delete this item?",
			header: "Confirmation",
			icon: "pi pi-exclamation-triangle",
			accept: () => handleDelete(id),
		});
	};

	const handleEdit = (item) => {
		setSelectedObj(item);
		setShowModal(true);
	};

	const handleDelete = (id) => {
		api.delete(`api/${model}/${id}`).then(() => fetchData());
	};

	return (
		<>
			<ConfirmDialog />
			<DataTable
				value={data}
				paginator
				rows={6}
				
				globalFilterFields={columns}
				removableSort
				style={{ width: "800px" }}
			>
				{columns.map((column, index) => (
					<Column
						key={index}
						field={column}
						header={column}
						sortable
						body={(rowData) => {
							const value = rowData[column];
							return typeof value === "object" && value !== null
								? value.name || "N/A"
								: value;
						}}
					/>
				))}
				<Column
					header={
						<Button
							icon="pi pi-plus"
							label="Add"
							onClick={handleOpenEquipmentModal}
							className="p-button-sm p-button-outlined"
						/>
					}
					body={(rowData, options) => {
						const menuItems = [
							{
								label: "Edit",
								icon: "pi pi-pencil",
								command: () => handleEdit(rowData.id),
							},
							{
								label: "Delete",
								icon: "pi pi-trash",
								command: () => confirmDelete(rowData.id),
							},
						];
						return (
							<>
								<Menu
									model={menuItems}
									popup
									ref={(el) => (menuRefs.current[options.rowIndex] = el)}
								/>
								<Button
									icon="pi pi-ellipsis-v"
									text
									severity="secondary"
									onClick={(e) => menuRefs.current[options.rowIndex].toggle(e)}
									className="rounded-5"
								/>
							</>
						);
					}}
				/>
			</DataTable>

			<ModalEdit
				show={showModal}
				handleClose={() => setShowModal(false)}
				modelToEdit={model}
				objectToChange={selectedObj || {}}
				attributesToEdit={columns}
				onSave={() => {
					setShowModal(false);
					fetchData();
				}}
			/>

			<FormsEquipmentSheet
				showModal={showEquipmentModal}
				closeModal={handleCloseEquipmentModal}
			/>
		</>
	);
}
