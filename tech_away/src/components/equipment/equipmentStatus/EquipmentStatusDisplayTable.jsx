import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import api from '../../../utils/axios';

export default function EquipmentStatusDisplayTable({ onDelete, onEdit, refreshKey, isActiveFilter }) {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [data, setData] = useState([]);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 10,
    page: 0,
    sortField: null,
    sortOrder: null,
    filters: {
      id: { value: '', matchMode: 'contains' },
      state: { value: '', matchMode: 'contains' }
    }
  });

  useEffect(() => { loadLazyData(); }, [lazyState, refreshKey, isActiveFilter]);

  const loadLazyData = () => {
    setLoading(true);
    const { page, rows, sortField, sortOrder, filters } = lazyState;
    const params = {
      page: (page ?? 0) + 1,
      pageSize: rows ?? 10,
      sortField,
      sortOrder,
      isActive: isActiveFilter
    };
    Object.entries(filters).forEach(([key, meta]) => { if (meta.value) params[key] = meta.value; });

    api.get('/api/equipmentStatus/displayTable', { params })
      .then(res => { setData(res.data.data); setTotalRecords(res.data.totalItems); })
      .catch(err => console.error('Error loading statuses:', err))
      .finally(() => setLoading(false));
  };

  const onPage = event => setLazyState(event);
  const onSort = event => setLazyState(event);
  const onFilter = event => { event.first = 0; setLazyState(event); };

  const confirmToggle = rowData => {
    confirmDialog({
      message: `Are you sure you want to ${isActiveFilter === '1' ? 'delete' : 'restore'} this status?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => onDelete(rowData)
    });
  };

  const renderActions = rowData => (
    <div className="d-flex justify-content-center align-items-center">
      {isActiveFilter === '1' && (
        <Button icon="pi pi-pencil" className="p-button-text p-button-rounded me-3" aria-label="Edit" severity="secondary" onClick={() => onEdit(rowData)} />
      )}
      {isActiveFilter === '1' ? (
        <Button icon="pi pi-trash" className="p-button-text p-button-rounded" aria-label="Delete" severity="danger" onClick={() => confirmToggle(rowData)} />
      ) : (
        <Button icon="pi pi-history" className="p-button-text p-button-rounded" aria-label="Restore" severity="success" onClick={() => confirmToggle(rowData)} />
      )}
    </div>
  );

  return (
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
        loading={loading}
        stripedRows
        removableSort
        rowsPerPageOptions={[5,10,25,50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column field="id" header="Id" sortable filter filterPlaceholder="Search" />
        <Column field="state" header="Status" sortable filter filterPlaceholder="Search" />
        <Column header="Actions" headerStyle={{ width: '8rem', textAlign: 'center' }} bodyStyle={{ textAlign: 'center' }} body={renderActions} />
      </DataTable>
    </div>
  );
}