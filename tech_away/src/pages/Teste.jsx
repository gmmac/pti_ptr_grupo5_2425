import React, { useEffect, useState } from "react";
import api from "../utils/axios";

export default function Teste() {
  const [equipmentStatus, setEquipmentStatus] = useState([]); 

  useEffect(() => {
    api.get("/api/equipmentStatus")
      .then(res => setEquipmentStatus(res.data))
      .catch(error => console.error(error.message));
  }, []);


  useEffect(() => {
    console.log(equipmentStatus)
  }, [equipmentStatus])

  return (
    <div>
      {equipmentStatus &&
        equipmentStatus.map((es, index) => (
          <div key={index}>{es.state}</div>
        ))}
    </div>
  );
}
