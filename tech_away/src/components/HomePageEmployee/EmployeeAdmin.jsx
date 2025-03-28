import React, { useEffect, useState } from 'react'
import EmployeesTableView from '../employee/EmployeeTableView'
import EmployeeCardView from '../employee/EmployeeCardView'
import api from '../../utils/axios'
import { Container } from 'react-bootstrap'
import EmployeeFilter from '../employee/EmployeeFilter'
import PaginationControl from '../pagination/PaginationControl'

export default function EmployeeAdmin() {
    const [employees, setEmployees] = useState([])

    useEffect(() => {
        api.get(`/api/employee`).then((res) => {
            setEmployees(res.data.data)
        })
    }, [])

  return (
    <Container>

        {/* <EmployeeFilter /> */}
        <EmployeesTableView employees={employees} />
        <EmployeeCardView employees={employees} />
        {/* <PaginationControl /> */}

    </Container>
  )
}
