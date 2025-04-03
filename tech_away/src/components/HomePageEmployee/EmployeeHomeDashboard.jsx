import React, { useEffect, useState } from 'react';
import { Card, Row, Col, Container } from 'react-bootstrap';
import DashboardTopCard from './Dashboard/DashboardTopGrid';
import DashboardGrid from './Dashboard/DashboardGrid';
import DashboardVerticalSection from './Dashboard/DashboardVerticalSection';
import EmployeeManage from './Manage/EmployeeManage';
import EmployeeRoleManage from './Manage/EmployeeRoleManage';
import { useAuthEmployee } from '../../contexts/AuthenticationProviders/EmployeeAuthProvider';
import BrandsManage from './Manage/BrandsManage';

export default function EmployeeHomeDashboard() {

    const sections = [
        { title: 'Equipment Models', key: 'modelsManage' },
        { title: 'Brands', key: 'brandsManage' },
        { title: 'Equipment Types', key: 'equipmentType' },
        { title: 'Equiment Sheet', key: 'equipmentSheet' },
        { title: 'Parts', key: 'parts' },
        { title: 'Clients', key: 'clients' },
    ];
    
    const {checkIsAdmin } = useAuthEmployee();
    const [isAdmin, setIsAdmin] = useState(false);
    

    const sections2 = [
        { title: 'Employees', key: 'employeeManage' },
        { title: 'Employee Roles', key: 'employeeRoleManage' },
        { title: 'Equipment Status', key: 'equipmentStatusManage' },
        { title: 'Repair Status', key: 'repairStatusManage' },
        { title: 'Stores', key: 'storeManage' },
      ];


      useEffect(() => {
        const verifyAdmin = async () => {
            const isADM = await checkIsAdmin();
            setIsAdmin(isADM)
        };

        verifyAdmin();
      }, [])
      
    


    return (
        <Container fluid className="py-4">
            <DashboardTopCard />

            {isAdmin && <Row className='mb-5'>
                <Col xl={12} lg={12} md={12}>
                    <DashboardGrid sections={sections2} title="Manage Admin" />
                </Col>
            </Row>}

            <Row>

                <Col xl={8} lg={12} md={12} >
                    <DashboardGrid sections={sections} title="Manage" />
                </Col>

                <Col xl={4} lg={12} md={12} className='pt-4 pt-xl-0 gx-xl-5' >
                    <DashboardVerticalSection />
                </Col>
            </Row>

        </Container>
    );
}
