import React, { useEffect, useState, useContext } from "react";
import { Form, Stack, Button, Accordion } from "react-bootstrap";
import api from "../../utils/axios";
import { IsMobileContext } from "../../contexts/IsMobileContext";

export default function Filters({ filters, setFilters }) {
  const [types, SetTypes] = useState([]);
  const [models, setModels] = useState([]);
  const [brands, setBrands] = useState([]);
  const isMobile = useContext(IsMobileContext);

  useEffect(() => {
    api
      .get("api/type")
      .then((res) => {
        const typesObj = res.data;
        const typesArray = Object.keys(typesObj).map((key) => ({
          id: typesObj[key].id,
          name: typesObj[key].name,
        }));
        SetTypes(typesArray);
      })
      .catch((error) => {
        console.error("API error:", error.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("api/model")
      .then((res) => {
        const modelsObj = res.data.data;

        const modelsArray = Object.keys(modelsObj).map((key) => ({
          id: modelsObj[key].id,
          name: modelsObj[key].name,
        }));
        setModels(modelsArray);
      })
      .catch((error) => {
        console.error("API error:", error.message);
      });
  }, []);

  useEffect(() => {
    api
      .get("api/brand")
      .then((res) => {
        const brandsObj = res.data.data;
        const brandsArray = Object.keys(brandsObj).map((key) => ({
          id: brandsObj[key].id,
          name: brandsObj[key].name,
        }));
        setBrands(brandsArray);
      })
      .catch((error) => {
        console.error("API error:", error.message);
      });
  }, []);

  const clearFilters = () => {
    setFilters({ orderBy: "", type: "", model: "", brand: "" });
  };

  return (
    <Stack
      direction="horizontal"
      style={{
        backgroundColor: "var(--white)",
        fontFamily: "var(--body-font)",
        color: "var(--dark-grey)",
      }}
      gap={2}
      className="rounded-pill p-3 justify-content-between align-items-center"
    >
      <Stack
        direction="horizontal"
        gap={2}
        className="justify-content-center align-items-center"
      >
        <Form.Select
          value={filters.orderBy}
          className="rounded-pill"
          style={{
            backgroundColor: "var(--light-grey)",
            boxShadow: "var(--shadow-default)",
          }}
          onChange={(e) => setFilters({ ...filters, orderBy: e.target.value })}
        >
          <option value="">Order By</option>
          <option value="ASC">Alphabetical</option>
          <option value="DESC">Reverse Alphabetical</option>
          <option value="recent-date">Recent Date</option>
          <option value="oldest-date">Oldest Date</option>
        </Form.Select>

        <Form.Select
          value={filters.type}
          className="rounded-pill"
          style={{
            backgroundColor: "var(--light-grey)",
            boxShadow: "var(--shadow-default)",
          }}
          onChange={(e) => setFilters({ ...filters, type: e.target.value })}
        >
          <option value="">Type</option>
          {types.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>

        <Form.Select
          value={filters.store}
          className="rounded-pill"
          style={{
            backgroundColor: "var(--light-grey)",
            boxShadow: "var(--shadow-default)",
          }}
          onChange={(e) => setFilters({ ...filters, model: e.target.value })}
        >
          <option value="">Model</option>
          {models.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
        <Form.Select
          value={filters.brand}
          className="rounded-pill"
          style={{
            backgroundColor: "var(--light-grey)",
            boxShadow: "var(--shadow-default)",
          }}
          onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
        >
          <option value="">Brand</option>
          {brands.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </Form.Select>
      </Stack>

      <Stack
        direction="horizontal"
        gap={2}
        className="justify-content-center align-items-center"
      >
        <Button
          className="rounded-pill px-4"
          style={{
            // backgroundColor: "var(--variant-one)",
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
    </Stack>
  );
}
