import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { getLoggedUser } from "../../utils/auth";
import api from "../../utils/axios";
import { Card, Button, Spinner, Stack } from "react-bootstrap";

export default function EmployeeProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  // const navigate = useNavigate();

  useEffect(() => {
    const user = getLoggedUser();
    
    if (!user) {
      navigate("employee/login")
      return;
    }

    if (user.role) {
      api.get(`api/employeeRole/${user.role}`)
        .then(res => {
          setIsAuthorized(res.data === "Admin");
        })
        .finally(() => setLoading(false)); // Indica que a verificação foi concluída
    } else {
      setLoading(false);
    }
  }, [navigate]);

  const handleChangeLocation = () => {
    navigate("/employee")
  };

  if (loading) {
    return (
      <Stack className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="primary" />
      </Stack>
    );
  }

  if (!isAuthorized) {
    return (
      <Stack className="d-flex justify-content-center align-items-center vh-100">
        <Card className="text-center p-4 shadow">
          <Card.Body>
            <Card.Title>Restricted Access</Card.Title>
            <Card.Text>You must have Admin access to continue.</Card.Text>
            <Button variant="primary" onClick={handleChangeLocation}>
              Home
            </Button>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  return <Outlet />;
}
