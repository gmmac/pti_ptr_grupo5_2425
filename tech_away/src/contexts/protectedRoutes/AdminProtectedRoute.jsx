import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { checkIfAdmin, getLoggedUser } from "../../utils/auth";
import { Card, Button, Spinner, Stack } from "react-bootstrap";

export default function AdminProtectedRoute() {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAccess = async () => {
      const user = await getLoggedUser();
      
      if (!user) {
        navigate("/employee/login"); // Se não estiver logado, vai para login
        return;
      }

      console.log(user)
      const adminStatus = await checkIfAdmin();
      setIsAuthorized(adminStatus);
      setLoading(false);
    };

    verifyAccess();
  }, [navigate]);


  if (loading) {
    return (
      <Stack className="justify-content-center align-items-center">
        <Spinner animation="border" variant="primary" />
      </Stack>
    );
  }

  if (!isAuthorized) {
    return (
      <Stack className="justify-content-center align-items-center">
        <Card className="text-center p-4 shadow">
          <Card.Body>
            <Card.Title>Restricted Access</Card.Title>
            <Card.Text>You must have Admin access to continue.</Card.Text>
            <Button variant="primary" onClick={() => navigate("/employee")}>
              Home
            </Button>
          </Card.Body>
        </Card>
      </Stack>
    );
  }

  return <Outlet />;
}
