import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";
import { Modal, Form } from "react-bootstrap";
import api from "../../utils/axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Calendar } from 'primereact/calendar';

export default function CharityProjectDisplayTable({ onEdit, onOpenDetails, refreshKey, canDelete = false }) {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
    filters: {
      id: { value: '', matchMode: 'contains' },
      name: { value: '', matchMode: 'contains' },
      startDate: { value: '', matchMode: 'equals' },
      completionDate: { value: '', matchMode: 'equals' },
      status: { value: '', matchMode: 'contains' },
      warehouse: { value: '', matchMode: 'contains' },
      organizerName: { value: '', matchMode: 'contains' },
      createdAt: { value: '', matchMode: 'equals' },
    },
  });
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]);
  const [projectStatusInfo, setProjectStatusInfo] = useState({ projectId: null, statusName: '' });
  const [errorMessage, setErrorMessage] = useState('');
  const menuRefs = useRef([]);

  const dateFields = ['createdAt', 'updatedAt', 'startDate', 'completionDate'];

  useEffect(() => {
    console.log(projectStatusInfo)
  },[projectStatusInfo])

  useEffect(() => {
    loadLazyData();
  }, [lazyState, refreshKey]);

  const loadLazyData = () => {
    setLoading(true);
    const { page, rows, sortField, sortOrder, filters } = lazyState;
    const currentPage = (page ?? 0) + 1;
    const pageSize = rows ?? 5;
    const params = { page: currentPage, pageSize, sortField, sortOrder };
    Object.entries(filters).forEach(([key, meta]) => {
      if (meta.value) params[key] = meta.value;
    });

    console.log(params)

    api.get('/api/charityProject/displayTable', { params })
      .then(res => {
        const items = res.data.data || [];
        setData(items);
        setTotalRecords(res.data.totalItems || 0);
        if (items.length) {
          const keys = Object.keys(items[0]).filter(k => !['warehouseID','statusName', "statusID"].includes(k));
          setColumns(keys);
        }
      })
      .catch(err => console.error('Erro:', err))
      .finally(() => setLoading(false));
  };

  const onPage = (event) => setLazyState(event);
  const onSort = (event) => setLazyState(event);
  const onFilter = (event) => { event.first = 0; setLazyState(event); };

  // Open "Change Status" modal, fetch statuses
  const changeProjectStatus = (project) => {
    setErrorMessage('');
    setProjectStatusInfo({ projectId: project.id, statusName: project.status });
    api.get('/api/projectStatus')
      
      .then(res => setStatusOptions(res.data.data || []))
      .catch(err => console.error('Failed to fetch statuses', err));
    setShowChangeStatus(true);
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setProjectStatusInfo(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { projectId, statusName } = projectStatusInfo;
    if (!statusName) return;
    try {
      await api.put(`/api/charityProject/${projectId}`, { statusName });
      setShowChangeStatus(false);
      // trigger parent refresh
      onEdit && onEdit();
      // reload table
      loadLazyData();
    } catch (err) {
      const msg = err.response?.data?.error || 'Erro ao atualizar status.';
      setErrorMessage(msg);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <div className="d-none d-lg-block">
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
          rowsPerPageOptions={[5,10,25,50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          {columns.map((column, idx) => (
            <Column
              key={idx}
              field={column}
              header={column}
              sortable
              filter
              showFilterMenu={false}
              filterMatchMode={dateFields.includes(column)? 'equals':'contains'}
              filterElement={dateFields.includes(column)? options => (
                <Calendar
                  value={options.value? new Date(options.value): null}
                  onChange={e => {
                    const date = e.value;
                    if (date) date.setHours(12,0,0,0);
                    const iso = date? date.toISOString().split('T')[0]: '';
                    options.filterCallback(iso, options.index);
                    const newFilters = { ...lazyState.filters };
                    newFilters[column].value = iso;
                    setLazyState({ ...lazyState, filters: newFilters });
                  }}
                  dateFormat="dd/mm/yy"
                  placeholder="Date"
                  showIcon
                  panelStyle={{ borderRadius: '10px' }}
                />
              ): undefined}
              filterPlaceholder={dateFields.includes(column)? undefined:'Search'}
              body={rowData => {
                const val = rowData[column];
                if (typeof val === 'object' && val !== null) return val.name || 'N/A';
                if (dateFields.includes(column) && val) {
                  return new Date(val).toLocaleDateString('pt-PT');
                }
                return val;
              }}
            />
          ))}

                    <Column
                    header=""
                    body={(rowData, options) => {
                        // podes afinar aqui: rowData.canDelete, status do projeto, etc.

                        const menuItems = [
                          {
                            label: 'See Details',
                            icon: 'pi pi-info-circle',
                            command: () => onOpenDetails(rowData.id),
                          }
                        ];

                        // só adiciona quando permitido
                        if (canDelete) {
                          menuItems.push({
                            label: "Change Status",
                            icon: "pi pi-sync",
                            command: () => changeProjectStatus(rowData),
                          });
                        }


                        return (
                        <>
                            <Menu
                            model={menuItems}
                            popup
                            ref={el => (menuRefs.current[options.rowIndex] = el)}
                            />
                            <Button
                            icon="pi pi-ellipsis-v"
                            text
                            severity="secondary"
                            onClick={e => menuRefs.current[options.rowIndex].toggle(e)}
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
                                .p-menu {
                                    margin: 0 !important;
                                    padding: 0 !important;
                                }
                                .p-menu ul {
                                    margin: 0 !important;
                                    padding: 0 !important;
                                    list-style: none;
                                }
                                .p-menu .p-menuitem-link {
                                    text-decoration: none !important;
                                    color: #374151 !important; /* Ajuste conforme seu tema */
                                }
                    `}
                </style>
            </div>

        <Modal show={showChangeStatus} onHide={() => setShowChangeStatus(false)} dialogClassName="modal-xl">
          <Modal.Header closeButton>
            <Modal.Title>Change Project Status</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Status</Form.Label>
                <Form.Select name="statusName" value={projectStatusInfo.statusName} onChange={handleChanges} className="rounded">
                  <option value="">Select a status...</option>
                  {statusOptions.map(s => <option key={s.id} value={s.state}>{s.state}</option>)}
                </Form.Select>
              </Form.Group>
              {errorMessage && <div className="text-danger mb-3">{errorMessage}</div>}
              <Button type="submit" className="w-100 rounded-pill" style={{ backgroundColor: 'var(--variant-two)', border: 'none' }}>
                Update Status
              </Button>
            </Form>
          </Modal.Body>
        </Modal>
    </>
  );
}
