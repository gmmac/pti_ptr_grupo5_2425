import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Dialog } from "primereact/dialog";
import api from "../../utils/axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Calendar } from "primereact/calendar";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";

export default function ClientSales(refreshAllTables = null) {
    const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const { user } = useAuth();
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);
    const dateFields = ['createdAt', 'updatedAt'];

    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
            'id': { value: '', matchMode: 'contains' },
            'storeName': { value: '', matchMode: 'contains' },
            'purchasePrice': { value: '', matchMode: 'contains' },
            'employeeName': { value: '', matchMode: 'contains' },
            'BrandName': { value: '', matchMode: 'contains' },
            'modelName': { value: '', matchMode: 'contains' },
            'Status': { value: '', matchMode: 'contains' },
            'createdAt': { value: '', matchMode: 'equals' },
        }
    });

    // Modal states
    const [selectedPurchase, setSelectedPurchase] = useState(null);
    const [showPurchaseDialog, setShowPurchaseDialog] = useState(false);

    useEffect(() => {
        loadLazyData();
    }, [lazyState]);

    const loadLazyData = () => {
        setLoading(true);
        const { page, rows, sortField, sortOrder, filters } = lazyState;
        const currentPage = isNaN(page) ? 1 : page + 1;
        const pageSize = isNaN(rows) ? 6 : rows;

        const params = {
            page: currentPage,
            pageSize: pageSize,
            nic: user?.nic,
            sortField,
            sortOrder,
        };

        for (const key in filters) {
            const filterMeta = filters[key];
            if (filterMeta?.value) {
                params[key] = filterMeta.value;
            }
        }

        api.get("/api/storePurchase", { params }).then((res) => {
            const responseData = res.data;
            if (responseData.data.length > 0) {
                const filteredColumns = desiredColumns.filter(col => col in responseData.data[0]);
                setColumns(filteredColumns);
                setData(responseData.data);
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

    const onPage = (event) => setLazyState(event);
    const onSort = (event) => setLazyState(event);
    const onFilter = (event) => {
        event['first'] = 0;
        setLazyState(event);
    };

    // Abre o modal com os dados
    const openRepairInfo = (purchase) => {
        setSelectedPurchase(purchase);
        setShowPurchaseDialog(true);
    };

    const desiredColumns = ["modelName", "purchasePrice", "storeName"];
    const columnHeaderMap = {
        modelName: "Model",
        purchasePrice: "Sale Price",
        storeName: "Store",
    };

    return (
        <>
            <ConfirmDialog />

            {/* Modal de detalhes */}
            <Dialog
                header="Purchase Details"
                visible={showPurchaseDialog}
                style={{ width: '400px' }}
                modal
                className="p-fluid"
                onHide={() => setShowPurchaseDialog(false)}
            >
                {selectedPurchase && (
                    <div className="space-y-2">
                        <p><strong>ID:</strong> {selectedPurchase.id}</p>
                        <p><strong>Employee:</strong> {selectedPurchase.employeeName}</p>
                        <p><strong>Date:</strong> {
                            new Date(selectedPurchase.createdAt).toLocaleDateString("pt-PT", {
                                day: "2-digit",
                                month: "2-digit",
                                year: "numeric"
                            }) + " " +
                            new Date(selectedPurchase.createdAt).toLocaleTimeString("pt-PT", {
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: false
                            })
                        }</p>
                        <p><strong>Model:</strong> {selectedPurchase.modelName}</p>
                        <p><strong>Sale Price:</strong> {selectedPurchase.purchasePrice}</p>
                        <p><strong>Store:</strong> {selectedPurchase.storeName}</p>
                    </div>
                )}
            </Dialog>

            <div>
                <DataTable
                    value={data}
                    lazy
                    loading={loading}
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
                            header={columnHeaderMap[column] || column}
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
                                    panelStyle={{ borderRadius: "10px" }}
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

                    {/* Coluna com ícone de info para abrir modal */}
                    <Column
                        header="Details"
                        style={{ width: '4rem', textAlign: 'center' }}
                        body={(rowData) => (
                            <Button
                                icon="pi pi-info-circle"
                                className="p-button-rounded p-button-text p-button-info"
                                onClick={() => openRepairInfo(rowData)}
                                aria-label="See Details"
                            />
                        )}
                    />
                </DataTable>
            </div>
        </>
    );
}
