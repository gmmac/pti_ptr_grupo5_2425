import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Spinner, Stack } from "react-bootstrap";
import { useAuthEmployee } from "../AuthenticationProviders/EmployeeAuthProvider";

export default function EmployeeProtectedRoute() {
  const navigate = useNavigate();
  const { employee, isAdmin } = useAuthEmployee();

  useEffect(() => {


    // const checkAuth = () => {
    //   if (!isAdmin()) {
    //     navigate("/employee/login", { replace: true });
    //   }
    //   setLoading(false);
    // };

    // checkAuth();
  }, [employee, navigate]);


  return <Outlet />;
}
