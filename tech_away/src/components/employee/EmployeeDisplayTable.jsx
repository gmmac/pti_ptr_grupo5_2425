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
import EmployeeEditModal from "./EmployeeEditModal";

export default function EmployeeDisplayTable({isActiveFilter, onDelete, refreshKey}) {
	const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);

    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
          internNum: { value: '', matchMode: 'contains' },
          employeeName: { value: '', matchMode: 'contains' },
          email: { value: '', matchMode: 'contains' },
          phone: { value: '', matchMode: 'contains' },
          gender: { value: '', matchMode: 'contains' },
          role: { value: '', matchMode: 'contains' },
          createdAt: { value: '', matchMode: 'equals' },
        },
      });

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const [selectedObj, setSelectedObj] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const menuRefs = useRef([]);
	const dateFields = ['createdAt', 'updatedAt'];

    useEffect(() => {
        loadLazyData();
    }, [lazyState, isActiveFilter, refreshKey]);

    const loadLazyData = () => {
        setLoading(true);
        const { page, rows, sortField, sortOrder, filters } = lazyState;
        const currentPage = (page ?? 0) + 1;
        const pageSize = rows ?? 5;
    
        const params = {
          page: currentPage,
          pageSize,
          sortField,
          sortOrder,
          isActive: isActiveFilter,
        };

        Object.entries(filters).forEach(([key, meta]) => {
            if (meta.value) params[key] = meta.value;
          });
    
        api.get('/api/employee/displayTable', { params })
          .then((res) => {
            const items = res.data.data || [];
            setData(items);
            setTotalRecords(res.data.totalItems || 0);
            if (items.length) {
              const keys = Object.keys(items[0]).filter(k => k !== "CreatedAt" && k !== "storeNIPC" && k !== "roleId");
              setColumns(keys);
            }
          })
          .catch((err) => console.error('Erro:', err))
          .finally(() => setLoading(false));
      };

    const onPage = (event) => {
        setLazyState(event);
    };

    const onSort = (event) => {
        setLazyState(event);
    };

    const onFilter = (event) => {
        event['first'] = 0;
        setLazyState(event);
    };

    const confirmDelete = (id) => {
        confirmDialog({
            message: (<> Are you sure you want to {isActiveFilter == "1" ? "delete" : "restore"} this Employee?</>),
            header: "Confirmation",
            icon: "pi pi-exclamation-triangle",
            accept: () => onDelete(id),
        });
    };

    const handleEdit = (item) => {
        setSelectedObj(item);
        setShowModal(true);
    };

    const handleSaveInfo = async (internNum, payload) => {
        try {
            await api.put(`/api/employee/${internNum}`, payload);
            setShowModal(false);
            loadLazyData();
        } catch (err) {
            console.error("Erro ao atualizar funcionário:", err);
        }
    };

    return (
        <>
            <EmployeeEditModal show={showModal} onHide={() => setShowModal(false)} employee={selectedObj} onSave={handleSaveInfo} />
            {/* <ConfirmDialog /> */}
            <div className="d-none d-lg-table">
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
                    column !== "isActive" && 
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
                                        if (selectedDate) selectedDate.setHours(12, 0, 0, 0);
                                        const isoDate = selectedDate ? selectedDate.toISOString().split('T')[0] : '';
                                        options.filterCallback(isoDate, options.index);
                                        const newFilters = { ...lazyState.filters };
                                        newFilters[column].value = isoDate;
                                        setLazyState({ ...lazyState, filters: newFilters });
                                    }}
                                    dateFormat="dd/mm/yy"
                                    placeholder="Date"
                                    showIcon
                                    panelStyle={{ borderRadius: "10px" }}
                                />
                            ) : undefined}
                            filterPlaceholder={dateFields.includes(column) ? undefined : "Search"}
                            body={(rowData) => {
                                const value = rowData[column];
                                if (typeof value === "object" && value !== null) return value.name || "N/A";
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
                        headerStyle={{ width: '10%' }}
                        bodyStyle={{padding: '0.7rem', paddingLeft: '0rem'}}
                        body={(rowData, options) => {
                            return (
                                <div style={{ display: "flex", gap: "0.3rem", justifyContent: "center" }}>
                                    {isActiveFilter=="1" ? 
                                        <>
                                          <Button
                                                icon="pi pi-pencil"
                                                rounded
                                                text
                                                severity="secondary"
                                                aria-label="Edit"
                                                className="custom-icon-button"
                                                onClick={() => handleEdit(rowData)}
                                            />
                                            
                                            <Button
                                                icon="pi pi-trash"
                                                text
                                                severity="danger"
                                                label="Delete"
                                                style={{color: "var(--danger)"}}
                                                className="custom-icon-button-withtext"
                                                onClick={() => confirmDelete(rowData.internNum)}

                                            /> 
                                        </> : 
                                    <Button
                                        icon="pi pi-history"
                                        text
                                        severity="success"
                                        label="Restore"
                                        style={{color: "var(--valid)"}}
                                        className="custom-icon-button-withtext"
                                        onClick={() => confirmDelete(rowData.internNum)}
                                    />
                                    }
                                </div>
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

                        .p-paginator .p-paginator-first:not(.p-disabled):not(.p-highlight):hover,
                        .p-paginator .p-paginator-prev:not(.p-disabled):not(.p-highlight):hover,
                        .p-paginator .p-paginator-next:not(.p-disabled):not(.p-highlight):hover,
                        .p-paginator .p-paginator-last:not(.p-disabled):not(.p-highlight):hover {
                            background: #f3f4f6;
                            border-color: transparent;
                            color: #374151;
                            border-radius: 50%;
                        }

                        .p-dropdown-items {
                            padding-bottom: 0rem !important;
                            padding-left: 0rem !important;
                        }

                        .p-paginator-current {
                            cursor: default;
                        }

                        .p-paginator-page.p-highlight {
                            background: var(--variant-green-highlight);
                        }

                        .p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus {
                            background: var(--variant-green-highlight) !important;
                        }

                        .p-dropdown-item.p-highlight {
                            background: var(--variant-green-highlight) !important;
                            color: #374151;
                        }

                        .p-dropdown:not(.p-disabled):hover {
                            border-color: var(--variant-green-highlight);
                        }

                        .p-dropdown:not(.p-disabled).p-focus {
                            box-shadow: 0 0 0 0.2rem var(--variant-green-highlight);
                            border-color: rgba(55, 65, 81, 0.35);
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
        </>
    );
}
