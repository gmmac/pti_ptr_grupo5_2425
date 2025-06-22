import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import api from "../../utils/axios";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import { Calendar } from 'primereact/calendar';
import StorePurchaseForms from "./StorePurchaseForms";

export default function DisplayTablePurchases({ refreshTable, onlyMyPurchases, storePurchasesOnly }) {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [show, setShow] = useState(false);
  const [purchaseID, setPurchaseID] = useState(null);
  const [data, setData] = useState([]);

  // Lista fixa de colunas (mantém sempre mesmo com 0 resultados)
  const columns = [
    "id",
    "storeName",
    "purchasePrice",
    // "usedEquipmentID",
    "employeeName",
    "clientName",
    // "clientNIC",
    "modelName",
    // "createdAt"
  ];

  const dateFields = ["createdAt", "updatedAt"];

  const [lazyState, setLazyState] = useState({
    first: 0, rows: 5, page: 0,
    sortField: null, sortOrder: null,
    filters: {
      id: { value: "", matchMode: "contains" },
      storeName: { value: "", matchMode: "contains" },
      purchasePrice: { value: "", matchMode: "contains" },
      employeeName: { value: "", matchMode: "contains" },
      clientName: { value: "", matchMode: "contains" },
      modelName: { value: "", matchMode: "contains" },
      createdAt: { value: "", matchMode: "equals" },
    },
    onlyMyPurchases, storePurchasesOnly
  });

  useEffect(() => {
    setLazyState(prev => ({ ...prev, first: 0, onlyMyPurchases, storePurchasesOnly }));
  }, [onlyMyPurchases, storePurchasesOnly]);

  useEffect(() => {
    loadLazyData();
    // eslint-disable-next-line
  }, [lazyState, refreshTable]);

  function loadLazyData() {
    setLoading(true);
    const { page, rows, sortField, sortOrder, filters, onlyMyPurchases, storePurchasesOnly } = lazyState;
    const params = {
      page: isNaN(page) ? 1 : page + 1,
      pageSize: isNaN(rows) ? 5 : rows,
      sortField, sortOrder, onlyMyPurchases, storePurchasesOnly
    };
    Object.entries(filters).forEach(([k, m]) => m.value && (params[k] = m.value));

    api.get("/api/storePurchase", { params, allPrice: "1" })
      .then(res => {
        setData(res.data.data);
        setTotalRecords(res.data.totalItems);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }

  const onPage   = e => setLazyState(prev => ({ ...prev, ...e }));
  const onSort   = e => setLazyState(prev => ({ ...prev, ...e }));
  const onFilter = e => setLazyState(prev => ({ ...prev, ...e, first: 0 }));

  return (
    <>
      <DataTable
        value={data}
        lazy filterDisplay="row" dataKey="id"
        paginator first={lazyState.first} rows={lazyState.rows}
        totalRecords={totalRecords}
        onPage={onPage} onSort={onSort}
        sortField={lazyState.sortField} sortOrder={lazyState.sortOrder}
        onFilter={onFilter} filters={lazyState.filters}
        stripedRows removableSort rowsPerPageOptions={[5,10,25,50]}
        paginatorTemplate=" FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        loading={loading}
      >
        {columns.map(field => (
          <Column
            key={field}
            field={field}
            header={field}
            sortable
            filter
            showFilterMenu={false}
            filterMatchMode={dateFields.includes(field) ? "equals" : "contains"}
            filterElement={
              dateFields.includes(field) &&
              ((opts) => (
                <Calendar
                  value={opts.value ? new Date(opts.value) : null}
                  onChange={e => {
                    const d = e.value; if (d) d.setHours(12,0,0,0);
                    const iso = d ? d.toISOString().split("T")[0] : "";
                    opts.filterCallback(iso, opts.index);
                    const fs = { ...lazyState.filters };
                    fs[field].value = iso;
                    setLazyState({ ...lazyState, filters: fs });
                  }}
                  dateFormat="dd/mm/yy" placeholder="Date" showIcon panelStyle={{ borderRadius: 10 }}
                />
              ))
            }
            filterPlaceholder={dateFields.includes(field) ? undefined : "Search"}
            body={row => {
              const v = row[field];
              if (dateFields.includes(field) && v) {
                const d = new Date(v);
                return `${d.toLocaleDateString("pt-PT")} ${d.toLocaleTimeString("pt-PT",{hour:'2-digit',minute:'2-digit',hour12:false})}`;
              }
              return (v===null||v===undefined) ? "" : v;
            }}
          />
        ))}
        <Column
          header="Edit"
          body={r => (
            <Button icon="pi pi-pencil" className="p-button-rounded p-button-text p-button-info"
              onClick={() => { setPurchaseID(r.id); setShow(true); }}
            />
          )}
          style={{ width: 80, textAlign: "center" }}
        />
      </DataTable>

      <StorePurchaseForms
        show={show}
        handleClose={() => setShow(false)}
        setRefreshPurchases={loadLazyData}
        purchaseID={purchaseID}
      />
    </>
  );
}
