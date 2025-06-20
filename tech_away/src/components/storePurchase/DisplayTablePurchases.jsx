import React, { useState, useEffect } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { ConfirmDialog } from "primereact/confirmdialog";
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
  const [columns, setColumns] = useState([]);
  const dateFields = ["createdAt", "updatedAt"];

  // Estado que guarda pagina, filtros, ordenação
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: null,
    sortOrder: null,
    filters: {
      id: { value: "", matchMode: "contains" },
      storeName: { value: "", matchMode: "contains" },
      purchasePrice: { value: "", matchMode: "contains" },
      employeeName: { value: "", matchMode: "contains" },
      clientName: { value: "", matchMode: "contains" },
      modelName: { value: "", matchMode: "contains" },
      createdAt: { value: "", matchMode: "equals" },
    },
    // vamos guardar os filtros externos aqui também para usar na consulta
    onlyMyPurchases: onlyMyPurchases,
    storePurchasesOnly: storePurchasesOnly,
  });

  // Quando props de filtro mudam, atualiza o estado lazyState para disparar nova busca
  useEffect(() => {
    setLazyState((prev) => ({
      ...prev,
      first: 0, // reset página para 0 ao mudar filtro
      onlyMyPurchases,
      storePurchasesOnly,
    }));
  }, [onlyMyPurchases, storePurchasesOnly]);

  // Dispara o fetch ao mudar lazyState ou refreshTable
  useEffect(() => {
    loadLazyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lazyState, refreshTable]);

  const loadLazyData = () => {
    setLoading(true);

    const { page, rows, sortField, sortOrder, filters, onlyMyPurchases, storePurchasesOnly } = lazyState;

    const currentPage = isNaN(page) ? 1 : page + 1; // backend pages start at 1
    const pageSize = isNaN(rows) ? 5 : rows;

    const params = {
      page: currentPage,
      pageSize,
      sortField,
      sortOrder,
      onlyMyPurchases,
      storePurchasesOnly,
    };

    // Adiciona filtros textuais/datas
    for (const key in filters) {
      const filterMeta = filters[key];
      if (filterMeta?.value) {
        params[key] = filterMeta.value;
      }
    }

    api
      .get("/api/storePurchase", { params, allPrice:"1" })
      .then((res) => {
        const responseData = res.data;
        if (responseData.data.length > 0) {
          const allColumns = Object.keys(responseData.data[0]).filter(
            (col) =>
              col !== "createdAt" &&
              col !== "updatedAt" &&
              col !== "storeID" &&
              col !== "usedEquipmentID"
          );
          setData(responseData.data);
          setColumns(allColumns);
        } else {
          setData([]);
          setColumns([]);
        }
        setTotalRecords(responseData.totalItems);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Erro ao carregar dados:", err);
        setLoading(false);
      });
  };

  const onPage = (event) => {
    setLazyState((prev) => ({ ...prev, ...event }));
  };

  const onSort = (event) => {
    setLazyState((prev) => ({ ...prev, ...event }));
  };

  const onFilter = (event) => {
    // reset primeira página ao filtrar
    setLazyState((prev) => ({ ...prev, ...event, first: 0 }));
  };

  const onEditClick = (rowData) => {
    setPurchaseID(rowData.id);
    setShow(true);
  };

  return (
    <>
      {/* <ConfirmDialog /> */}
      <div>
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
          loading={loading}
        >
          {columns.map((column, index) => (
            <Column
              key={index}
              field={column}
              header={column}
              sortable
              filter
              showFilterMenu={false}
              filterMatchMode={dateFields.includes(column) ? "equals" : "contains"}
              filterElement={
                dateFields.includes(column)
                  ? (options) => (
                      <Calendar
                        value={options.value ? new Date(options.value) : null}
                        onChange={(e) => {
                          const selectedDate = e.value;
                          if (selectedDate) {
                            selectedDate.setHours(12, 0, 0, 0);
                          }
                          const isoDate = selectedDate
                            ? selectedDate.toISOString().split("T")[0]
                            : "";
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
                    )
                  : undefined
              }
              filterPlaceholder={dateFields.includes(column) ? undefined : "Search"}
              body={(rowData) => {
                const value = rowData[column];
                if (typeof value === "object" && value !== null) {
                  const firstTextField = Object.values(value).find(
                    (val) => typeof val === "string" || typeof val === "number"
                  );
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

          {/* Coluna Editar com botão */}
          <Column
            header="Edit"
            body={(rowData) => (
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-text p-button-info"
                onClick={() => onEditClick(rowData)}
                aria-label="Edit"
              />
            )}
            style={{ width: "80px", textAlign: "center" }}
          />
        </DataTable>
      </div>

      <StorePurchaseForms
        show={show}
        handleClose={() => setShow(false)}
        setRefreshPurchases={() => loadLazyData()}
        purchaseID={purchaseID}
      />
    </>
  );
}
