import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { Modal, Form } from "react-bootstrap";
import { Calendar } from 'primereact/calendar';
import { ConfirmDialog } from 'primereact/confirmdialog';
import api from "../../utils/axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

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
  const [organizerNic, setOrganizerNic] = useState(null);
  const menuRefs = useRef([]);
  const dateFields = ['createdAt', 'updatedAt', 'startDate', 'completionDate'];

  // Fetch user info once on mount
  useEffect(() => {
    const fetchUserInfo = async () => {
      try {
        const response = await api.get('/api/auth/user-info', {
          params: { userType: 'organizer' },
          withCredentials: true
        });
        const user = response.data?.userInfo;
        if (user?.nic) setOrganizerNic(user.nic);
      } catch (err) {
        console.error('Erro ao buscar usuário:', err);
      }
    };
    fetchUserInfo();
  }, []);

  // Reload data when filters, paging, sorting, or organizerNic change
  useEffect(() => {
    if (organizerNic !== null) {
      loadLazyData();
    }
  }, [lazyState, refreshKey, organizerNic]);

  const loadLazyData = async () => {
    setLoading(true);
    try {
      const { page, rows, sortField, sortOrder, filters } = lazyState;
      const currentPage = (page ?? 0) + 1;
      const pageSize = rows ?? 5;
      const params = { page: currentPage, pageSize, sortField, sortOrder };
      if (organizerNic && canDelete) params.organizerNic = organizerNic;
      Object.entries(filters).forEach(([key, meta]) => {
        if (meta.value) params[key] = meta.value;
      });

      const res = await api.get('/api/charityProject/displayTable', { params });
      const items = res.data.data || [];
      setData(items);
      setTotalRecords(res.data.totalItems || 0);
      if (items.length) {
        const keys = Object.keys(items[0]).filter(k => !['warehouseID', 'statusID'].includes(k));
        setColumns(keys);
      }
    } catch (err) {
      console.error('Erro ao carregar dados:', err);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (event) => setLazyState(event);
  const onSort = (event) => setLazyState(event);
  const onFilter = (event) => { event.first = 0; setLazyState(event); };

  // Change status modal logic
  const [showChangeStatus, setShowChangeStatus] = useState(false);
  const [statusOptions, setStatusOptions] = useState([]);
  const [projectStatusInfo, setProjectStatusInfo] = useState({ projectId: null, statusName: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const changeProjectStatus = async (project) => {
    setErrorMessage('');
    setProjectStatusInfo({ projectId: project.id, statusName: project.status });
    try {
      const res = await api.get('/api/projectStatus');
      setStatusOptions(res.data.data || []);
    } catch (err) {
      console.error('Failed to fetch statuses', err);
    }
    setShowChangeStatus(true);
  };

  const handleStatusChange = (e) => {
    setProjectStatusInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { projectId, statusName } = projectStatusInfo;
    if (!statusName) return;
    try {
      await api.put(`/api/charityProject/${projectId}`, { statusName });
      setShowChangeStatus(false);
      onEdit?.();
      loadLazyData();
    } catch (err) {
      setErrorMessage(err.response?.data?.error || 'Erro ao atualizar status.');
    }
  };

  return (
    <>
      {/* <ConfirmDialog /> */}
      <div className="d-none d-lg-block">
        <DataTable
          value={data}
          lazy filterDisplay="row" dataKey="id"
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
          stripedRows removableSort
          rowsPerPageOptions={[5,10,25,50]}
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          currentPageReportTemplate="{first} to {last} of {totalRecords}"
        >
          {columns.map((col, idx) => (
            <Column
              key={idx}
              field={col}
              header={col}
              sortable filter showFilterMenu={false}
              filterMatchMode={dateFields.includes(col) ? 'equals' : 'contains'}
              filterElement={dateFields.includes(col) ? (options) => (
                <Calendar
                  value={options.value ? new Date(options.value) : null}
                  onChange={e => {
                    const date = e.value;
                    if (date) date.setHours(12,0,0,0);
                    const iso = date ? date.toISOString().split('T')[0] : '';
                    options.filterCallback(iso, options.index);
                    setLazyState(prev => ({
                      ...prev,
                      filters: { ...prev.filters, [col]: { ...prev.filters[col], value: iso } }
                    }));
                  }}
                  dateFormat="dd/mm/yy" placeholder="Date" showIcon
                />
              ) : undefined}
              filterPlaceholder={dateFields.includes(col) ? undefined : 'Search'}
              body={row => {
                const val = row[col];
                if (dateFields.includes(col) && val) return new Date(val).toLocaleDateString('pt-PT');
                return typeof val === 'object' && val ? val.name || 'N/A' : val;
              }}
            />
          ))}

          <Column body={(rowData, options) => {
            const menuItems = [
              { label: 'See Details', icon: 'pi pi-info-circle', command: () => onOpenDetails(rowData.id) }
            ];
            if (canDelete) {
              menuItems.push({ label: 'Change Status', icon: 'pi pi-sync', command: () => changeProjectStatus(rowData) });
            }
            return (
              <>
                <Menu model={menuItems} popup ref={el => menuRefs.current[options.rowIndex] = el} />
                <Button icon="pi pi-ellipsis-v" text severity="secondary" onClick={e => menuRefs.current[options.rowIndex].toggle(e)} className="rounded-5" />
              </>
            );
          }} />
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
              <Form.Select name="statusName" value={projectStatusInfo.statusName} onChange={handleStatusChange} className="rounded">
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
