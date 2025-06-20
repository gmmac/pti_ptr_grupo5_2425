import React, { useState, useEffect, useRef } from "react";
import { Button } from 'primereact/button';
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { confirmDialog } from "primereact/confirmdialog";
import api from "../../utils/axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Calendar } from 'primereact/calendar';
import { Dropdown } from 'primereact/dropdown';
import { useAuthEmployee } from "../../contexts/AuthenticationProviders/EmployeeAuthProvider";
import SalesDetailsModal from "./SalesDetailsModal";
import { Dialog } from "primereact/dialog";


export default function SalesDisplayTable({ filterType, active = "1", refreshAllTables=null}) {
	  const [loading, setLoading] = useState(false);
    const [totalRecords, setTotalRecords] = useState(0);
    const [statusWarning, setStatusWarning] = useState(null);


    const { employee } = useAuthEmployee();

    const [lazyState, setLazyState] = useState({
        first: 0,
        rows: 5,
        page: 0,
        sortField: null,
        sortOrder: null,
        filters: {
          'id': { value: '', matchMode: 'contains' },
          'total': { value: '', matchMode: 'contains' },
          'clientNIC': { value: '', matchMode: 'contains' },
          'employeeNIC': { value: '', matchMode: 'contains' },
          'state': { value: '', matchMode: 'equals' },
          'CreatedAt': { value: '', matchMode: 'equals' },
          'UpdatedAt': { value: '', matchMode: 'equals' }
        }		
    });

    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    const [showDetails, setShowDetails] = useState(false);
    const [detailsSaleId, setDetailsSaleId] = useState(null);

	  const dateFields = ['CreatedAt', 'UpdatedAt']; // adiciona os campos relevantes
    const [stateOptions, setStateOptions] = useState([]);


    useEffect(() => {
        if (employee) {  // Só carrega quando o employee existe
            loadLazyData();
            loadStateOptions();
        }
    }, [filterType, lazyState]);

    const loadLazyData = () => {
        setLoading(true);

        const { page, rows, sortField, sortOrder, filters } = lazyState;

        // Garantir que `page` e `rows` são números válidos
        const currentPage = isNaN(page) ? 1 : page + 1; // Página começa do 1 no backend
        const pageSize = isNaN(rows) ? 6 : rows; // Se `rows` for inválido, use 6 como padrão

        const params = {
            active: active,
            page: currentPage,
            pageSize: pageSize,
            sortField,
            sortOrder,
            filterType,
            employee
        };

        // Adiciona os filtros aos params
        for (const key in filters) {
            const filterMeta = filters[key];
            if (filterMeta?.value !== null && filterMeta?.value !== undefined && filterMeta.value !== '') {
                params[key] = filterMeta.value;
            }
        }

        // Faz a requisição ao backend
        api.get(`api/clientPurchase/display-table`, { params }).then((res) => {
            const responseData = res.data;
            if (responseData.data.length > 0) {
                const allColumns = Object.keys(responseData.data[0]).filter(
                    (col) => col !== "UpdatedAt" && col !== "employeeName" && col !== "clientName"
                );
                setData(responseData.data);
                setColumns(allColumns);
            } else {
                setData([]);
            }
            setTotalRecords(responseData.totalItems);
            setLoading(false);
        }).catch(err => {
            console.error("Error fetching data:", err);
            setLoading(false);
        });
    };

    const loadStateOptions = () => {
      api.get('api/orderStatus/').then((res) => {
          const options = res.data.map((status) => ({
              label: status.state,
              value: status.id
          }));
          setStateOptions(options);
      }).catch((err) => {
          console.error("Error loading status options:", err);
    })};

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
        message: ( <> Are you sure you want to delete this sale? <br />This action is permanent and irreversible.</>),
        header: "Confirmation",
        icon: "pi pi-exclamation-triangle",
        acceptClassName: "p-button-rounded p-button-danger custom-confirm-yes",
        rejectClassName: "p-button-rounded custom-confirm-no",
        accept: () => handleDelete(id)
      });
    };

    const handleEdit = (item) => {
        setDetailsSaleId(item.id);
        setShowDetails(true);
    };

    const handleDelete = (id) => {
        api.delete(`/api/clientPurchase/${id}`).then(() => {
            loadLazyData(); 
            refreshAllTables();
        });
    };

    const capitalizeFirstLetter = (value) => {
        if(String(value) == "id") return "ID";
        if(String(value) == "total") return "Total Price";
        if(String(value) == "state") return "Status";
        if(String(value) == "employeeNIC") return "Employee NIC";
        if(String(value) == "clientNIC") return "Client NIC";
        if(String(value) == "CreatedAt") return "Date";
        return String(value).charAt(0).toUpperCase() + String(value).slice(1);
    }

    const [showStatusModal, setShowStatusModal] = useState(false);
    const [selectedSale, setSelectedSale] = useState(null);
    const [newStatusId, setNewStatusId] = useState(null);

    const openChangeStatusModal = (sale) => {
      setSelectedSale(sale);
      setNewStatusId(sale.orderStatusID); // estado inicial
      setShowStatusModal(true);
    };

    const handleStatusSave = () => {
      api.patch(`api/clientPurchase/${selectedSale.id}/change-status`, { statusId: newStatusId })
        .then(() => {
          setShowStatusModal(false);
          refreshAllTables();
        })
        .catch(err => {
          console.error("Error updating status", err);
        });
    };

    return (
        <>
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
                            header={capitalizeFirstLetter(column)}
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
                          ) : column === 'state' ? (options) => (
                                  <Dropdown
                                    value={options.value}
                                    options={stateOptions}
                                    onChange={(e) => {
                                      options.filterCallback(e.value, options.index);
                                      const newFilters = { ...lazyState.filters };
                                      newFilters[column].value = e.value;
                                      setLazyState({
                                        ...lazyState,
                                        filters: newFilters
                                      });
                                    }}
                                    placeholder="Select"
                                    className="p-column-filter"
                                    showClear
                                  />
                                ) : undefined }

                            filterPlaceholder={dateFields.includes(column) || column === 'state' ? undefined : "Search"}
                            body={(rowData) => {
                              const value = rowData[column];
                              if (typeof value === "object" && value !== null) {
                                return value.name || "N/A";
                              }
                                              if (value && column == "total"){
                                                  return `${value} €`;
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
                        headerStyle={{ width: '10%' }}
                        bodyStyle={{padding: '0.7rem', paddingLeft: '0rem'}}
                        body={(rowData, options) => {
                            return (
                                <div style={{ display: "flex", gap: "0.3rem", justifyContent: "center" }}>
                                  <Button
                                      icon="pi pi-info-circle"
                                      rounded
                                      text
                                      severity="secondary"
                                      aria-label="Edit"
                                      className="custom-icon-button"
                                      onClick={() => handleEdit(rowData)}
                                    />
                                    <Button
                                      icon="pi pi-sync"
                                      rounded
                                      text
                                      severity="secondary"
                                      aria-label="Change Status"
                                      className="custom-icon-button"
                                      onClick={() => openChangeStatusModal(rowData)}
                                    />
                                    <Button
                                        icon="pi pi-trash"
                                        text
                                        severity="danger"
                                        aria-label="Delete Sale"
                                        style={{color: "var(--danger)"}}
                                        className="custom-icon-button"
                                        onClick={() => confirmDelete(rowData.id)}
                                    /> 
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
                .custom-icon-button {
                    width: 2.5rem;
                    height: 2.5rem;
                    border-radius: 50% !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0;
                }
                .custom-icon-button-withtext {
                    height: 2.5rem;
                    border-radius: 20% !important;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 0.2rem;
                }
                .custom-icon-button .pi {
                    font-size: 1.1rem;
                }

                .custom-confirm-yes {
                  border-radius: 6px !important;
                  margin-left: 1rem
                }

                .custom-confirm-no {
                  color: #6b7280 !important; /* Tailwind gray-500 */
                  border: none !important;
                  background: #e5e7eb !important; /* cinza claro no fundo */
                  border-radius: 6px !important;
                }

                .custom-confirm-no:hover {
                  background: #d1d5db !important; /* ligeiro highlight no hover */
                }

                `}
            </style>
            </div>

            <SalesDetailsModal 
              saleId={detailsSaleId} 
              visible={showDetails} 
              onHide={() => setShowDetails(false)} 
            />

            <Dialog
              header={`Change status for Sale #${selectedSale?.id}`}
              visible={showStatusModal}
              style={{ width: '400px' }}
              onHide={() => setShowStatusModal(false)}
              draggable={false}
            >
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Dropdown
                  value={newStatusId}
                  options={stateOptions}
                  onChange={(e) => {
                    const selectedId = e.value;
                    setNewStatusId(selectedId);

                    const selectedStatusName = stateOptions.find(opt => opt.value === selectedId)?.label;

                    if (selectedStatusName === selectedSale?.state) {
                      setStatusWarning("Selected status is already the current one.");
                    } else {
                      setStatusWarning(null);
                    }
                  }}
                  placeholder="Select new status"
                  style={{ width: '100%' }}
                  showClear
                />


              {statusWarning && (
                <div style={{ color: 'red', fontSize: '0.85rem' }}>
                  {statusWarning}
                </div>
              )}

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.5rem', marginTop: '1rem' }}>
                <Button
                  label="Cancel"
                  icon="pi pi-times"
                  onClick={() => setShowStatusModal(false)}
                  style={{
                    borderRadius: '6px',
                    backgroundColor: '#e5e7eb',
                    color: '#374151',
                    border: 'none',
                    padding: '0.4rem 1rem',
                    width: 'auto'
                  }}
                />
                <Button
                  label="Save"
                  icon="pi pi-check"
                  onClick={handleStatusSave}
                  disabled={
                    !newStatusId ||
                    stateOptions.find(opt => opt.value === newStatusId)?.label === selectedSale?.state
                  }
                  style={{
                    borderRadius: '6px',
                    backgroundColor: 'var(--variant-one)',
                    border: 'none',
                    padding: '0.4rem 1rem',
                    width: 'auto'
                  }}
                />

              </div>
            </div>
           </Dialog>
        </>
    );
}