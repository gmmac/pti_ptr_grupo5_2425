import React, { useState, useRef } from "react";
import { Button, Collapse, Stack } from "react-bootstrap";
import SearchableSelect from "./SearchableSelect";
import OrderBySelect from "./OrderBySelect";

export default function CustomAccordionFilters({
  filters,
  setFilters,
  types,
  models,
  brands,
}) {
  const [open, setOpen] = useState(false);

  const clearFilters = () => {
    setFilters({ orderBy: "", type: "", model: "", brand: "" });
  };

  return (
    <div>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="custom-filters-body"
        aria-expanded={open}
        className={open ? "w-100 px-4 py-3" : "w-100 rounded-pill px-4 py-3"}
        style={{
          backgroundColor: "var(--white)",
          color: "var(--dark-grey)",
          border: "none",
          borderRadius: open ? "50rem 50rem  0 0 " : "",
          boxShadow: open
            ? "var(--shadow-default) var(--shadow-default) 0 var(--shadow-default)"
            : "var(--shadow-default)",
        }}
      >
        <Stack direction="horizontal" className="justify-content-between">
          <Stack direction="horizontal" gap={2}>
            <i
              className="pi pi-filter"
              style={{ color: "var(--dark-grey)" }}
            ></i>
            <span style={{ fontFamily: "var(--body-font)" }}>Filters</span>
          </Stack>
          <i
            className={`pi pi-chevron-${open ? "up" : "down"}`}
            style={{ color: "var(--dark-grey)" }}
          ></i>
        </Stack>
      </Button>
      <Collapse
        in={open}
        style={{
          backgroundColor: "var(--white)",
          borderRadius: " 0 0 var(--rounded-sm) var(--rounded-sm)",
          boxShadow: "var(--shadow-default)",

          transition: "height 0.15s ease-in-out", // Suaviza
        }}
        className="px-4 pt-1 pb-4"
      >
        <div id="custom-filters-body">
          <Stack gap={3} className="mt-3">
            <Stack
              gap={3}
              direction="vertical"
              className="justify-content-center align-items-center"
            >
              <OrderBySelect
                label="Order By"
                value={filters.orderBy}
                onChange={(val) => setFilters({ ...filters, orderBy: val })}
                options={[
                  { label: "Alphabetical", value: "ASC" },
                  { label: "Reverse Alphabetical", value: "DESC" },
                  { label: "Recent Date", value: "recent-date" },
                  { label: "Oldest Date", value: "oldest-date" },
                ]}
              />

              <SearchableSelect
                label="Type"
                options={types}
                selected={filters.type}
                onChange={(value) => setFilters({ ...filters, type: value })}
              />

              <SearchableSelect
                label="Model"
                options={models}
                selected={filters.model}
                onChange={(value) => setFilters({ ...filters, model: value })}
              />

              <SearchableSelect
                label="Brand"
                options={brands}
                selected={filters.brand}
                onChange={(value) => setFilters({ ...filters, brand: value })}
              />
            </Stack>

            <Button
              className="rounded-pill w-100"
              style={{
                backgroundColor: "var(--variant-one)",
                color: "var(--white)",
                border: "none",
              }}
              variant="secondary"
              disabled={
                !filters.orderBy &&
                !filters.model &&
                !filters.type &&
                !filters.brand
              }
              onClick={clearFilters}
            >
              Clear
            </Button>
          </Stack>
        </div>
      </Collapse>
    </div>
  );
}
