import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { FilterMatchMode } from "primereact/api";
import api from "../../utils/axios";
import ModalEdit from "./ModalEdit";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

export default function DisplayTable({ model }) {
	const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);

    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 6,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
			'id': { value: '', matchMode: 'contains' },
			'name': { value: '', matchMode: 'contains' },
			'price': { value: '', matchMode: 'contains' },
			'releaseYear': { value: '', matchMode: 'contains' },
			'Brand': { value: '', matchMode: 'contains' }
		}
    });

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedObj, setSelectedObj] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const menuRefs = useRef([]);
    const [globalFilterValue, setGlobalFilterValue] = useState("");

    let networkTimeout = null;

    useEffect(() => {
        loadLazyData();
    }, [model, lazyState]);

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
        api.get(`api/${model}`, { params }).then((res) => {
            const responseData = res.data;
            if (responseData.data.length > 0) {
                const allColumns = Object.keys(responseData.data[0]).filter(
                    (col) => col !== "CreatedAt" && col !== "UpdatedAt"
                );
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
                >
                    {columns.map((column, index) => (
                        <Column
                            key={index}
                            field={column}
                            header={column}
                            sortable
                            filter
                            filterPlaceholder="Search"
                            body={(rowData) => {
                                const value = rowData[column];
                                return typeof value === "object" && value !== null
                                    ? value.name || "N/A"
                                    : value;
                            }}
                        />
                    ))}
                    <Column
                        header=""
                        body={(rowData, options) => {
                            const menuItems = [
                                {
                                    label: "Editar",
                                    icon: "pi pi-pencil",
                                    command: () => handleEdit(rowData.id),
                                },
                                {
                                    label: "Excluir",
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
            </div>
            <ModalEdit
                show={showModal}
                handleClose={() => setShowModal(false)}
                modelToEdit={model}
                objectToChange={selectedObj || {}}
                attributesToEdit={columns}
                onSave={() => {
                    setShowModal(false);
                    loadLazyData();
                }}
            />
        </>
    );
}