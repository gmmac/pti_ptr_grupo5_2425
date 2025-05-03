import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import api from "../../utils/axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Calendar } from 'primereact/calendar';
import RepairInfo from "../client/RepairInfo";
import { Dialog } from "primereact/dialog";

export default function SelectClientModal({ showModal, closeModal, onSelect }) {
	const [loading, setLoading] = useState(false);
	const [totalRecords, setTotalRecords] = useState(0);
	const [showRepairInfo, setShowRepairInfo] = useState(false);
	const [repairID, setRepairID] = useState(null);

    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
			'nic': { value: '', matchMode: 'contains' },
            'nif': { value: '', matchMode: 'contains' },
            'name': { value: '', matchMode: 'contains' },
			'email': { value: '', matchMode: 'contains' },
            'phone': { value: '', matchMode: 'contains' },
		}
    });

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const menuRefs = useRef([]);
	const dateFields = ['createdAt', 'updatedAt'];

    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        setLoading(true);

        const { page, rows, sortField, sortOrder, filters } = lazyState;

        // Garantir que `page` e `rows` são números válidos
        const currentPage = isNaN(page) ? 1 : page + 1; // Página começa do 1 no backend
        const pageSize = isNaN(rows) ? 6 : rows; // Se `rows` for inválido, use 6 como padrão

        const params = {
            page: currentPage,
            pageSize: pageSize,
            sortField,
            sortOrder
        };

        // Adiciona os filtros aos params
        for (const key in filters) {
            const filterMeta = filters[key];
            if (filterMeta?.value) {
                params[key] = filterMeta.value;
            }
        }

        // Faz a requisição ao backend
        api.get("/api/client", { params: params }).then((res) => {
            const responseData = res.data;
            if (responseData.data.length > 0) {
                const allColumns = Object.keys(responseData.data[0]).filter(
                    (col) => col !== "createdAt" && col !== "updatedAt" && col !== "birthDate"
                    && col !== "gender"
                );
                console.log(allColumns)
                setData(responseData.data);
                setColumns(allColumns);
            } else {
                setData([]);
            }
            setTotalRecords(responseData.totalItems);
            setLoading(false);
        }).catch(err => {
            console.error("Erro ao carregar dados:", err);
            setLoading(false);
        });
    };

    const onPage = (event) => {
        setLazyState(event);
    };

    const onSort = (event) => {
        setLazyState(event);
    };

    const onFilter = (event) => {
        console.log("estou a filtrar bb")
        event['first'] = 0; // Resetar a página quando o filtro mudar
        setLazyState(event);
    };

    const openRepairInfo = (repairID) => {
        setShowRepairInfo(true);
        setRepairID(repairID);
    };

    return (
		<>
			<ConfirmDialog />

			{showModal && (
				<div className="p-fluid" style={{ padding: '2rem' }}>
					<h2>Selecionar Cliente</h2>
					<DataTable
						value={data}
						lazy
						filterDisplay="row"
						dataKey="id"
						paginator
						first={lazyState.first}
						rows={lazyState.rows}
						totalRecords={totalRecords}
						onPage={onPage}
						onSort={onSort}
						sortField={lazyState.sortField}
						sortOrder={lazyState.sortOrder}
						onFilter={onFilter}
						filters={lazyState.filters}
						stripedRows
						removableSort
						rowsPerPageOptions={[5, 10, 25, 50]}
						paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
						currentPageReportTemplate="{first} to {last} of {totalRecords}"
					>
						{columns.map((column, index) => (
							<Column
								key={index}
								field={column}
								header={column}
								sortable
								filter
								showFilterMenu={false}
								filterMatchMode={dateFields.includes(column) ? 'equals' : 'contains'}
								filterElement={dateFields.includes(column) ? (options) => (
									<Calendar
										value={options.value ? new Date(options.value) : null}
										onChange={(e) => {
											const selectedDate = e.value;
											if (selectedDate) {
												selectedDate.setHours(12, 0, 0, 0);
											}
											const isoDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
											options.filterCallback(isoDate, options.index);

											const newFilters = { ...lazyState.filters };
											newFilters[column].value = isoDate;
											setLazyState({
												...lazyState,
												filters: newFilters,
											});
										}}
										dateFormat="dd/mm/yy"
										placeholder="Date"
										showIcon
										panelStyle={{
											borderRadius: "10px",
										}}
									/>
								) : undefined}
								filterPlaceholder={dateFields.includes(column) ? undefined : "Search"}
								body={(rowData) => {
									const value = rowData[column];
									if (typeof value === "object" && value !== null) {
										const firstTextField = Object.values(value).find(val => typeof val === "string" || typeof val === "number");
										return firstTextField ?? "N/A";
									}
									if (dateFields.includes(column) && value) {
										const date = new Date(value);
										const formattedDate = date.toLocaleDateString("pt-PT");
										const formattedTime = date.toLocaleTimeString("pt-PT", {
											hour: "2-digit",
											minute: "2-digit",
											hour12: false,
										});
										return `${formattedDate} ${formattedTime}`;
									}			
									return value;
								}}
							/>
						))}
						<Column
							header=""
							body={(rowData, options) => {
								const menuItems = [
									{
										label: "Selecionar",
										icon: "pi pi-check",
										command: () => {
											onSelect({ id: rowData.clientId || rowData.id, name: rowData.clientName || rowData.name });
											closeModal();
										}
									},
									{
										label: "Ver detalhes",
										icon: "pi pi-info-circle",
										command: () => openRepairInfo(rowData.id),
									}
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
											onClick={(e) =>
												menuRefs.current[options.rowIndex].toggle(e)
											}
											className="rounded-5"
										/>
									</>
								);
							}}
						/>
					</DataTable>

					<RepairInfo repairID={repairID} show={showRepairInfo} onClose={() => setShowRepairInfo(false)} />
				</div>
			)}
		</>
	);
}