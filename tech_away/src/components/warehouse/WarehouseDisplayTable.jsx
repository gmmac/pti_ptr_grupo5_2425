import React, { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Button } from 'primereact/button';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import api from '../../utils/axios';

export default function WarehouseDisplayTable({ onDelete, onEdit, refreshKey, isActiveFilter }) {
  const [data, setData] = useState([]);
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
      name: { value: '', matchMode: 'contains' }
    }
  });

  useEffect(() => {
    loadData();
  }, [lazyState, refreshKey, isActiveFilter]);

  const loadData = () => {
    setLoading(true);
    const { page, rows, sortField, sortOrder, filters } = lazyState;
    const params = {
      page: (page || 0) + 1,
      pageSize: rows || 5,
      sortField,
      sortOrder,
      isActive: isActiveFilter
    };
    if (filters.id.value) params.id = filters.id.value;
    if (filters.name.value) params.name = filters.name.value;

    api.get('/api/warehouse/displayTable', { params })
      .then(res => {
        setData(res.data.data);
        setTotalRecords(res.data.totalItems);
      })
      .catch(err => console.error('Error loading warehouses:', err))
      .finally(() => setLoading(false));
  };

  const confirmToggle = (rowData) => {
    confirmDialog({
      message: `Are you sure you want to ${isActiveFilter === '1' ? 'delete' : 'restore'} this warehouse?`,
      header: 'Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => onDelete(rowData)
    });
  };

  const renderActions = (rowData) => (
    <div className="d-flex justify-content-center align-items-center">
      {isActiveFilter === '1' && (
        <Button
          icon="pi pi-pencil"
          className="p-button-text p-button-rounded me-3"
          onClick={() => onEdit(rowData)}
          severity="secondary"
        />
      )}
      {isActiveFilter === '1' ? (
        <Button
          icon="pi pi-trash"
          className="p-button-text p-button-rounded"
          onClick={() => confirmToggle(rowData)}
          severity="danger"
        />
      ) : (
        <Button
          icon="pi pi-history"
          className="p-button-text p-button-rounded"
          onClick={() => confirmToggle(rowData)}
          severity="success"
        />
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
        onPage={(e) => setLazyState(e)}
        onSort={(e) => setLazyState(e)}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        onFilter={(e) => { e.first = 0; setLazyState(e); }}
        filters={lazyState.filters}
        loading={loading}
        stripedRows
        removableSort
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column field="id" header="ID" sortable filter filterPlaceholder="Search" />
        <Column field="name" header="Name" sortable filter filterPlaceholder="Search" />
        <Column field="totalSlots" header="Total Slots" sortable />
        <Column field="availableSlots" header="Available Slots" sortable />
        <Column
          header="Actions"
          body={renderActions}
          headerStyle={{ width: '8rem', textAlign: 'center' }}
          bodyStyle={{ textAlign: 'center' }}
        />
      </DataTable>
    </div>
  );
}
