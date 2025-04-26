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
import RepairInfo from "./RepairInfo";

export default function ClientRepairsCatalog() {
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
			'id': { value: '', matchMode: 'contains' },
            'employeeName': { value: '', matchMode: 'contains' },
            'description': { value: '', matchMode: 'contains' },
            'state': { value: '', matchMode: 'contains' },
            'modelName': { value: '', matchMode: 'contains' },
            'createdAt': { value: '', matchMode: 'equals' },
		}
    });

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedObj, setSelectedObj] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const menuRefs = useRef([]);
	const dateFields = ['createdAt', 'updatedAt']; // adiciona os campos relevantes

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
        api.get('/api/repair/displayTable', { params }).then((res) => {
            const responseData = res.data;
            if (responseData.data.length > 0) {
                const allColumns = Object.keys(responseData.data[0]);
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
        event['first'] = 0; // Resetar a página quando o filtro mudar
        setLazyState(event);
    };

    const confirmDelete = (id) => {
        confirmDialog({
            message: (<> Are you sure you want to delete this repair?<br />This action will erase other items associated with this repair.</>),
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => handleDelete(id),
        });
    };

    const openRepairInfo = (repairID) => {
        setShowRepairInfo(true);
        setRepairID(repairID);
    };

    const handleEdit = (item) => {
        setSelectedObj(item);
        setShowModal(true);
    };

    const handleDelete = (id) => {
        api.delete(`api/${model}/${id}`).then(() => loadLazyData());
    };

    return (
        <>
            <ConfirmDialog />
            <div className="">
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
                                    label: "See Details",
                                    icon: "pi pi-info-circle",
                                    command: () => openRepairInfo(rowData.id),
                                },
                                {
                                    label: "Edit",
                                    icon: "pi pi-pencil",
                                    command: () => handleEdit(rowData),
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
				<style>
					{`
						.p-paginator .p-paginator-pages .p-paginator-page {
							border: 0 none;
							color: #374151;
							min-width: 3rem;
							height: 3rem;
							margin: 0.143rem;
							transition: box-shadow 0.2s;
							border-radius: 50%;
						}

						.p-paginator .p-paginator-first:not(.p-disabled):not(.p-highlight):hover, .p-paginator .p-paginator-prev:not(.p-disabled):not(.p-highlight):hover, .p-paginator .p-paginator-next:not(.p-disabled):not(.p-highlight):hover, .p-paginator .p-paginator-last:not(.p-disabled):not(.p-highlight):hover{
							background: #f3f4f6;
							border-color: transparent;
							color: #374151;
							border-radius: 50%;
						}
						.p-dropdown-items{
							padding-bottom: 0rem !important;
							padding-left: 0rem !important;
						}
						.p-paginator-current{
							cursor: default;
						}
						.p-paginator-page.p-highlight{
							background: var(--variant-green-highlight)
						}
						.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus{
							background: var(--variant-green-highlight) !important;
						}
						.p-dropdown-item.p-highlight{
							background: var(--variant-green-highlight) !important;
							color: #374151;
						}
						.p-dropdown:not(.p-disabled):hover{
							border-color: var(--variant-green-highlight);
						}
						.p-dropdown:not(.p-disabled).p-focus{
							box-shadow: 0 0 0 0.2rem var(--variant-green-highlight);
							border-color:rgba(55, 65, 81, 0.35);
						}

						.p-datepicker-trigger {
							border: var(--variant-one);
							border-top-right-radius: 6px !important;
							border-bottom-right-radius: 6px !important;
							padding-right: 0.05rem;
							background-color: var(--variant-one);
						}
						`}
				</style>
            </div>
            <RepairInfo repairID={repairID} show={showRepairInfo} onClose={() => setShowRepairInfo(false)}/>
        </>
    );
}