import React from "react";
import { useLocation } from "react-router-dom";

export default function UsedEquipmentPage() {
  const location = useLocation();
  const equipmentName = location.state?.equipmentName;

  return <div>{equipmentName}</div>;
}
