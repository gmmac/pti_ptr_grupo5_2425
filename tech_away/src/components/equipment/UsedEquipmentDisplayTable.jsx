import React, { useState, useEffect, useRef } from "react";
import { Button } from "primereact/button";
import { DataTable } from "primereact/datatable";
import { Column } from "primereact/column";
import { Menu } from "primereact/menu";
import { ConfirmDialog } from "primereact/confirmdialog";
import { Calendar } from "primereact/calendar";
import { Modal, Form } from "react-bootstrap";
import api from "../../utils/axios";
import { Dialog } from "primereact/dialog";
import { InputNumber } from "primereact/inputnumber";

export default function UsedEquipmentDisplayTable({ isActiveFilter, actionFilter, onOpenDetails, putOnSale,handleDonate, refreshKey }) {
  const [loading, setLoading] = useState(false);
  const [totalRecords, setTotalRecords] = useState(0);
  const [lazyState, setLazyState] = useState({
    first: 0,
    rows: 5,
    page: 0,
    sortField: "id",
    sortOrder: "DESC",
    filters: {
      id: { value: "", matchMode: "contains" },
      "EquipmentSheet.brandModel": { value: "", matchMode: "contains" },
      "EquipmentSheet.EquipmentType.name": { value: "", matchMode: "contains" },
      "EquipmentSheet.barcode": { value: "", matchMode: "contains" },
      "Store.name": { value: "", matchMode: "contains" },
      "EquipmentStatus.state": { value: "", matchMode: "contains" },
      putOnSaleDate: { value: "", matchMode: "equals" },
      purchaseDate: { value: "", matchMode: "equals" },
      "Purchase.purchasePrice": { value: "", matchMode: "contains" },
      "Purchase.purchaseDate": { value: "", matchMode: "equals" },
      price: { value: "", matchMode: "contains" },
      action: { value: "", matchMode: "contains" },
    },
  });

  const [data, setData] = useState([]);
  const menuRefs = useRef([]);
  const [showPriceModal, setShowPriceModal] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    loadLazyData();
  }, [lazyState, refreshKey]);


  const loadLazyData = async () => {
    setLoading(true);
    const { page, rows, sortField, sortOrder, filters } = lazyState;
    const currentPage = (page ?? 0) + 1;
    const pageSize = rows;

    const params = {
      page: currentPage,
      pageSize,
      sortField,
      sortOrder,
    };

    if (isActiveFilter !== undefined) params.allTag = isActiveFilter;
    if (actionFilter) params.action = actionFilter;

    Object.entries(filters).forEach(([key, meta]) => {
      if (meta.value) {
        params[key] = meta.value;
      }
    });

    try {
      const res = await api.get("/api/usedEquipment/displayTable", { params });
      console.log(res.data.data)
      setData(res.data.data || []);
      setTotalRecords(res.data.totalItems || 0);
    } catch (err) {
      console.error("Erro ao buscar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  const onPage = (e) => setLazyState(e);
  const onSort = (e) => setLazyState(e);
  const onFilter = (e) => {
    e.first = 0;
    setLazyState(e);
  };

useEffect(() => {
  const ids = data.map(item => item.id);
  const duplicates = ids.filter((id, i) => ids.indexOf(id) !== i);
  if (duplicates.length > 0) {
    console.warn("🔁 Duplicated IDs in data:", duplicates);
  }
}, [data]);

  const DateFilterElement = (field) => (options) => (
    <Calendar
      value={options.value ? new Date(options.value) : null}
      onChange={(e) => {
        const date = e.value;
        if (date) date.setHours(12, 0, 0, 0);
        const iso = date ? date.toISOString().split("T")[0] : "";
        options.filterCallback(iso, options.index);
        const newFilters = { ...lazyState.filters };
        newFilters[field].value = iso;
        setLazyState({ ...lazyState, filters: newFilters });
      }}
      dateFormat="dd/mm/yy"
      placeholder="Date"
      showIcon
      panelStyle={{ borderRadius: "10px" }}
    />
  );

  const handleOpenPriceModal = (equipment) => {
    setSelectedEquipment(equipment);
    setPrice("");
    setShowPriceModal(true);
  };

  const handleConfirmPutOnSale = () => {
    if (selectedEquipment && price && price > 0) {
      putOnSale(selectedEquipment, price);
      setShowPriceModal(false);
    }
  };

  return (
    <>
      <ConfirmDialog />
      <DataTable
        value={data}
        lazy
        filterDisplay="row"
        dataKey="id"
        paginator
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={totalRecords}
        loading={loading}
        onPage={onPage}
        onSort={onSort}
        onFilter={onFilter}
        sortField={lazyState.sortField}
        sortOrder={lazyState.sortOrder}
        filters={lazyState.filters}
        stripedRows
        removableSort
        rowsPerPageOptions={[5, 10, 25, 50]}
        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
      >
        <Column field="id" header="ID" dataType="numeric" filter sortable filterPlaceholder="ID" />
        <Column field="EquipmentSheet.brandModel" header="Model" filter sortable filterPlaceholder="Model" />
        <Column field="EquipmentSheet.EquipmentType.name" header="Type" filter sortable filterPlaceholder="Type" />
        <Column field="EquipmentStatus.state" header="Status" filter sortable filterPlaceholder="Status" />
        <Column field="Store.name" header="Store" filter sortable filterPlaceholder="Store" />
        
        {
          isActiveFilter === "0" &&
          <Column field="price" header="Store Price (€)" filter sortable filterPlaceholder="Price" />
        }

        {/* {
          isActiveFilter === "new" &&
          <Column field="Purchase.purchasePrice" header="Purchase Price (€)" filter sortable filterPlaceholder="Price" />
        } */}

        {isActiveFilter !== "new" && isActiveFilter !== "1" && actionFilter !== "D" && actionFilter !== "S" &&
          <Column
            field="putOnSaleDate"
            header="Put on Sale Date"
            sortable
            filter
            filterElement={DateFilterElement("putOnSaleDate")}
            body={(rowData) =>
              rowData.putOnSaleDate ? new Date(rowData.putOnSaleDate).toLocaleDateString("pt-PT") : "———"
            }
          />
        }

        {actionFilter === "D" && (
          <Column
            field="Purchase.purchaseDate"
            header="Donate Date"
            sortable
            filter
            filterElement={DateFilterElement("Purchase.purchaseDate")}
            body={(rowData) =>
              rowData.Purchase?.purchaseDate
                ? new Date(rowData.Purchase.purchaseDate).toLocaleDateString("pt-PT")
                : "———"
            }
          />
        )}

        {isActiveFilter === "new" && (
          <Column
            field="Purchase.purchasePrice"
            header="Purchase Price (€)"
            sortable
            filter
            filterPlaceholder="Price"
            body={(rowData) =>
              rowData.Purchase?.purchasePrice != null
                ? `${rowData.Purchase.purchasePrice.toFixed(2)} €`
                : "———"
            }
          />
        )}


        {/* Pôr o preço da venda */}
        {actionFilter === "S" && (
            <Column field="price" header="Sold Price (€)" filter sortable filterPlaceholder="Price" />
        )}

        {actionFilter === "S" && (

          <Column
            field="purchaseDate"
            header="Sale Date"
            sortable
            filter
            filterElement={DateFilterElement("purchaseDate")}
            body={(rowData) =>
              rowData.Purchase?.purchaseDate
                ? new Date(rowData.Purchase.purchaseDate).toLocaleDateString("pt-PT")
                : "———"
            }
          />

        )}


        <Column
          header=""
          body={(rowData, options) => {
            const menuItems = [];
            console.log(rowData)
            if (isActiveFilter === "new" && rowData.Purchase.purchasePrice != 0) {
              menuItems.push({
                label: "Put on Sale",
                icon: "pi pi-cart-plus",
                command: () => handleOpenPriceModal(rowData),
              });
            }
            if (isActiveFilter === "new" && rowData.Purchase.purchasePrice == 0) {
              menuItems.push({
                label: "Donate",
                icon: "pi pi-gift",
                command: () => handleDonate(rowData),
              });
            }
            return (
              <>
                {menuItems.length > 0 && (
                  <>
                    <Menu
                      model={menuItems}
                      popup
                      ref={(el) => (menuRefs.current[options.rowIndex] = el)}
                    />
                    <Button
                      icon="pi pi-ellipsis-v"
                      text
                      severity="secondary"
                      onClick={(e) =>
                        menuRefs.current[options.rowIndex]?.toggle(e)
                      }
                      className="rounded-5"
                    />
                  </>
                )}
              </>
            );
          }}
        />
      </DataTable>

    <Dialog
      header="Set Sale Price"
      visible={showPriceModal}
      style={{ width: '400px' }}
      onHide={() => setShowPriceModal(false)}
      modal
      footer={
        <div className="d-flex justify-content-end gap-2">
          <Button
            label="Cancel"
            severity="secondary"
            className="p-button-text"
            onClick={() => setShowPriceModal(false)}
          />
          <Button
            label="Put on Sale"
            icon="pi pi-check"
            onClick={handleConfirmPutOnSale}
            disabled={!price || price <= 0}
          />
        </div>
      }
    >
      <div className="p-fluid">
        <div className="field">
          <label htmlFor="price">Price (€)</label>
          <InputNumber
            id="price"
            inputId="currency-eur"
            mode="currency"
            currency="EUR"
            locale="en-US"
            value={price}
            onValueChange={(e) => setPrice(e.value)}
            placeholder="Enter sale price"
            min={0}
          />
        </div>
      </div>
    </Dialog>

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
            padding-bottom: 0 !important;
            padding-left: 0 !important;
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
            color: #374151 !important;
          }
        `}
      </style>
    </>
  );
}
