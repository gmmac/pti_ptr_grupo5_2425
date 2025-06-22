import React, { useEffect, useState } from "react";
import { Table, Button, Stack } from "react-bootstrap";
import PaginationControl from "../pagination/PaginationControl";
import api from "../../utils/axios";
import { useAuthEmployee } from "../../contexts/AuthenticationProviders/EmployeeAuthProvider";

export default function ProductTableSales({ filters, onAddToCart, cart }) {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const itemsPerPage = 5;

  const { employee } = useAuthEmployee();

  useEffect(() => {
    if (!employee || !employee.storeNIPC) {
      return; // só faz o fetch quando employee e storeId existirem
    }

    const getId = (value) => {
      if (Array.isArray(value)) return value.map((v) => v.id);
      if (typeof value === "object" && value !== null) return value.id;
      return value;
    };

    const fetchProducts = async () => {
      try {
        const res = await api.get("/api/usedEquipment/backoffice-in-stock", {
          params: {
            page: currentPage,
            pageSize: itemsPerPage,
            orderBy: filters.orderBy || "recent-date",
            storeId: employee.storeNIPC || "",
            typeId: getId(filters.type) || "",
            modelId: getId(filters.model) || "",
            brandId: getId(filters.brand) || ""
          }
        });

        setProducts(res.data.data);
        setTotalPages(res.data.totalPages);
      } catch (error) {
        console.error("Error fetching used equipment in stock:", error.message);
      }
    };

    fetchProducts();
  }, [filters, currentPage]);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const isInCart = (id) => cart.some(item => item.id === id);

  return (
    <div>
      <Table responsive bordered hover className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Brand</th>
            <th>Model</th>
            <th>Status</th>
            <th>Price (€)</th>
            <th>Add</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((prod) => {
              const id = prod.id;
              const type = prod.EquipmentSheet?.EquipmentType?.name || "N/A";
              const brand = prod.EquipmentSheet?.EquipmentModel?.Brand?.name || "N/A";
              const model = prod.EquipmentSheet?.EquipmentModel?.name || "N/A";
              const status = prod.EquipmentStatus?.state || "N/A";
              const price = prod.price !== undefined ? prod.price.toFixed(2) : "0.00";

              return (
                <tr key={id}>
                  <td>{id}</td>
                  <td>{type}</td>
                  <td>{brand}</td>
                  <td>{model}</td>
                  <td>{status}</td>
                  <td>{price}</td>
                  <td>
                    <Button
                      size="sm"
                      className="rounded-pill"
                      style={{
                        backgroundColor: "var(--variant-one)",
                        border: "none"
                      }}
                      onClick={() => onAddToCart(prod)}
                      disabled={isInCart(id)}
                    >
                      {isInCart(id) ? "In Cart" : "Add"}
                    </Button>
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No products found</td>
            </tr>
          )}
        </tbody>
      </Table>

      {totalPages > 1 && (
        <Stack className="mt-2 justify-content-center" direction="horizontal">
          <PaginationControl
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        </Stack>
      )}
    </div>
  );
}
