import React from "react";
import { useLocation } from "react-router-dom";
import { Container } from "react-bootstrap";
import EmployeeRoleManage from "../../components/HomePageEmployee/Manage/EmployeeRoleManage";
import EmployeeManage from "../../components/HomePageEmployee/Manage/EmployeeManage";
import EquipmentStatusManage from "../../components/HomePageEmployee/Manage/EquipmentStatusManage";
import RepairStatusManage from "../../components/HomePageEmployee/Manage/RepairStatusManage";
import StoreManage from "../../components/HomePageEmployee/Manage/StoreManage";


const componentMap = {
  employeeManage: <EmployeeManage />,
  employeeRoleManage: <EmployeeRoleManage />,
  equipmentStatusManage: <EquipmentStatusManage />,
  repairStatusManage: <RepairStatusManage />,
  storeManage: <StoreManage />
};

export default function ManagePage() {
  const location = useLocation();
  const { componentKey, title } = location.state || {};

  const ComponentToRender = componentMap[componentKey];

  return (
    <Container className="py-5">
      <h2 className="mb-4">{title || "Manage"}</h2>
      {ComponentToRender ? ComponentToRender : <p>Component Not Found.</p>}
    </Container>
  );
}
