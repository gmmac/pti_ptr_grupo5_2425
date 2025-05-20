import React, { useState, useEffect, useRef, forwardRef, useImperativeHandle } from "react";
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
import StorePurchaseForms from "./StorePurchaseForms";

export default function DisplayTablePurchases({ refreshTable }) {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);

  const [refreshPurchases, setRefreshPurchases] = useState(true);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

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
  });

  const [purchaseData, setPurchaseData] = useState({})

  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const dateFields = ["createdAt", "updatedAt"];

  useEffect(() => {
    loadLazyData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [refreshPurchases, refreshTable, lazyState]);

  const loadLazyData = () => {
    setLoading(true);

    const { page, rows, sortField, sortOrder, filters } = lazyState;

    const currentPage = isNaN(page) ? 1 : page + 1; // backend pages start at 1
    const pageSize = isNaN(rows) ? 6 : rows;

    const params = {
      page: currentPage,
      pageSize: pageSize,
      sortField,
      sortOrder,
    };

    for (const key in filters) {
      const filterMeta = filters[key];
      if (filterMeta?.value) {
        params[key] = filterMeta.value;
      }
    }

    api
      .get("/api/storePurchase", { params: params })
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
    setLazyState(event);
  };

  const onSort = (event) => {
    setLazyState(event);
  };

  const onFilter = (event) => {
    event["first"] = 0; // reset to first page on filter change
    setLazyState(event);
  };

  // Função chamada ao clicar no botão de editar
  const onEditClick = (rowData) => {
    console.log(rowData)
    setShow(true);
    setPurchaseData(rowData);
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
            header="Editar"
            body={(rowData) => (
              <Button
                icon="pi pi-pencil"
                className="p-button-rounded p-button-text p-button-info"
                onClick={() => onEditClick(rowData)}
                aria-label="Editar"
              />
            )}
            style={{ width: "80px", textAlign: "center" }}
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
          `}
        </style>
      </div>

      <StorePurchaseForms
        show={show}
        handleClose={() => setShow(false)}
        setRefreshPurchases={setRefreshPurchases}
        purchaseData={purchaseData}
      />
    </>
  );
}