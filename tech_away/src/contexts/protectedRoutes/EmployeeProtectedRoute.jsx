import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../utils/auth";
import { Spinner, Stack } from "react-bootstrap";

export default function EmployeeProtectedRoute() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const user = getLoggedUser();
    
    if (!user) {
      navigate("/employee/login"); // Redireciona para login se não estiver logado
    } else {
      setIsAuthenticated(true);
    }
    
    setLoading(false);
  }, [navigate]);

  if (loading) {
    return (
      <Stack className="d-flex justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Stack>
    );
  }

  return isAuthenticated ? <Outlet /> : null;
}
