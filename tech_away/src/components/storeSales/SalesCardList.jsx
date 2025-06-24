import React from "react";
import { Card } from "primereact/card";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Paginator } from "primereact/paginator";

export default function SalesCardList({
  data, stateOptions, filters, onFilterChange,
  onEdit, onDelete, onChangeStatus,
  totalRecords, lazyState, onPageChange
}) {
  return (
    <>
      <div className="mb-3">
        <div className="sales-card-filters">
            <input
                type="text"
                placeholder="Search ID"
                value={filters.id?.value || ""}
                onChange={(e) => onFilterChange("id", e.target.value)}
                className="p-inputtext p-component"
            />
            <Dropdown
                value={filters.state?.value || null}
                options={stateOptions}
                onChange={(e) => onFilterChange("state", e.value)}
                placeholder="Select Status"
                className="p-column-filter"
                showClear
            />
            <input
                type="text"
                placeholder="Search Employee NIC"
                value={filters.employeeNIC?.value || ""}
                onChange={(e) => onFilterChange("employeeNIC", e.target.value)}
                className="p-inputtext p-component"
            />
            <input
                type="text"
                placeholder="Search Client NIC"
                value={filters.clientNIC?.value || ""}
                onChange={(e) => onFilterChange("clientNIC", e.target.value)}
                className="p-inputtext p-component"
            />
            <input
                type="number"
                placeholder="Search Total Price"
                value={filters.total?.value || ""}
                onChange={(e) => onFilterChange("total", e.target.value)}
                className="p-inputtext p-component"
            />        
            <Calendar
                value={filters.CreatedAt?.value ? new Date(filters.CreatedAt.value) : null}
                onChange={(e) => {
                const isoDate = e.value ? e.value.toISOString().split("T")[0] : "";
                onFilterChange("CreatedAt", isoDate);
                }}
                dateFormat="dd/mm/yy"
                placeholder="Date"
                showIcon
                panelStyle={{ borderRadius: "10px" }}
            />
        </div>

      </div>

      <div className="sales-card-list">
        {data.map(sale => (
          <Card key={sale.id} className="mb-3">
            <div className="p-card-content">
              <div><strong>ID:</strong> {sale.id}</div>
              <div><strong>Status:</strong> {sale.state}</div>
              <div><strong>Employee NIC:</strong> {sale.employeeNIC}</div>
              <div><strong>Client NIC:</strong> {sale.clientNIC}</div>
              <div><strong>Total:</strong> {sale.total} €</div>
              <div><strong>Date:</strong> {new Date(sale.CreatedAt).toLocaleString("pt-PT")}</div>
            </div>
            <div className="sales-card-actions">
              <Button
                icon="pi pi-info-circle"
                rounded
                text
                severity="secondary"
                aria-label="Edit"
                className="custom-icon-button"
                onClick={() => onEdit(sale)}
              />
              <Button
                icon="pi pi-sync"
                rounded
                text
                severity="secondary"
                aria-label="Change Status"
                className="custom-icon-button"
                onClick={() => onChangeStatus(sale)}
              />
              <Button
                icon="pi pi-trash"
                text
                severity="danger"
                aria-label="Delete Sale"
                className="custom-icon-button"
                onClick={() => onDelete(sale.id)}
              />
            </div>
          </Card>
        ))}
      </div>

      <Paginator
        first={lazyState.first}
        rows={lazyState.rows}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        template="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
        currentPageReportTemplate="{first} to {last} of {totalRecords}"
        rowsPerPageOptions={[5, 10, 25, 50]}
      />
      <style>
        {`
       /* --- 🌟 CARDS --- */
            .sales-card-list .p-card {
            border-radius: 10px;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.04); /* sombra discreta como antes */
            background: #f5f6f7; /* fundo mais destacado do fundo da página */
            padding: 0rem 1rem; /* menos espaço no topo, mantém laterais */
            transition: box-shadow 0.2s;
            }


.sales-card-list .p-card .p-card-body {
  padding: 0;
}

.sales-card-list .p-card-content {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem 3rem;
  align-items: center;
  text-align: left;
  padding: 0.5rem 0rem;
}

@media (max-width: 992px) {
  .sales-card-list .p-card-content {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.4rem;
  }
}

.sales-card-actions {
  display: flex;
  gap: 0.3rem;
  margin-top: 0rem;
  align-self: flex-end;
}

@media (min-width: 993px) {
  .sales-card-actions {
    margin-top: 0;
  }
}

/* --- 🌟 BOTÕES DE AÇÃO --- */
.custom-icon-button {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50% !important;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0;
}

.custom-icon-button .pi {
  font-size: 1.1rem;
}

/* --- 🌟 FILTROS RESPONSIVOS + COMPACTOS + ALINHADOS --- */
.sales-card-filters {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.5rem;
  margin-bottom: 1rem;
}

.sales-card-filters .p-inputtext,
.sales-card-filters .p-dropdown,
.sales-card-filters .p-calendar {
  font-size: 0.85rem;
  height: 2.2rem;
  box-sizing: border-box;
}

.sales-card-filters input,
.sales-card-filters .p-inputtext {
  padding: 0 0.5rem;
  border-radius: 6px;
}

.sales-card-filters .p-calendar {
  display: flex;
  align-items: center;
  padding: 0;
}

.sales-card-filters .p-calendar .p-inputtext {
  height: 2.2rem;
  padding: 0 0.5rem;
  border-top-left-radius: 6px !important;
  border-bottom-left-radius: 6px !important;
  border-top-right-radius: 0 !important;
  border-bottom-right-radius: 0 !important;
}

.sales-card-filters .p-calendar .p-datepicker-trigger {
  height: 2.2rem;
  margin: 0;
  padding: 0 0.5rem;
  background-color: var(--variant-one);
  border: none;
  border-top-right-radius: 6px !important;
  border-bottom-right-radius: 6px !important;
  border-top-left-radius: 0 !important;
  border-bottom-left-radius: 0 !important;
}

.sales-card-filters .p-dropdown {
  padding: 0 0.5rem;
  border-radius: 6px;
}

.sales-card-filters .p-dropdown .p-dropdown-label {
  padding: 0;
  line-height: 2.2rem;
}

.sales-card-filters .p-dropdown .p-dropdown-trigger {
  height: 2.2rem;
}

.sales-card-filters input:hover,
.sales-card-filters input:focus,
.sales-card-filters .p-inputtext:hover,
.sales-card-filters .p-inputtext:focus,
.sales-card-filters .p-dropdown:hover,
.sales-card-filters .p-calendar:hover {
  border-color: var(--variant-one) !important;
  box-shadow: none;
}

/* --- 🌟 PAGINAÇÃO CONSISTENTE --- */
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

.p-paginator-page.p-highlight {
  background: var(--variant-green-highlight);
}

/* --- 🌟 DROPDOWN / CALENDAR CONSISTÊNCIA --- */
.p-dropdown:not(.p-disabled).p-focus {
  box-shadow: none;
  border-color: var(--variant-one);
}

.p-dropdown-item.p-highlight,
.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus {
  background: var(--variant-green-highlight) !important;
  color: #374151;
}

/* --- 🌟 CONFIRM DIALOG BOTÕES --- */
.custom-confirm-yes {
  border-radius: 6px !important;
  margin-left: 1rem;
}

.custom-confirm-no {
  color: #6b7280 !important;
  border: none !important;
  background: #e5e7eb !important;
  border-radius: 6px !important;
}

.custom-confirm-no:hover {
  background: #d1d5db !important;
}

`}
      </style>
    </>
  );
}
