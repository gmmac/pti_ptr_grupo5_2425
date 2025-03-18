import React, { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import api from '../../utils/axios';
import { getLoggedUser } from '../../utils/auth';
import "../../styles/pageElements.css";

export default function EmployeeRepairs() {
  const user = getLoggedUser();
  const [employeeStore, setEmployeeStore] = useState({});
  const [repairs, setRepairs] = useState([]);



  useEffect(() => {
    if (user?.storeNIPC) {
        api.get(`/api/store/${user.storeNIPC}`)
            .then(res => setEmployeeStore(res.data))
            .catch(error => console.error(error.message));
    }
}, [user?.storeNIPC]);

useEffect(() => {
  api
    .get('/api/repair/')
    .then((res) => {
      setRepairs(res.data);
      console.log(repairs);
    })
    .catch((error) => {
      console.error('API error:', error.message);
    });
}, []);

  return (
    <Container>
        <h2 className="my-4 text-left">Repairs in: {employeeStore.name}</h2>
    </Container>
  )
}
