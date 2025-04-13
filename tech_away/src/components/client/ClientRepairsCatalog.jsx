import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';

export default function ClientRepairsCatalog({ repairsList, isActive, onShowDetails }) {
    return (
        <div className="mt-4">
            <Table striped bordered hover responsive className="w-100">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Description</th>
                        <th>Status</th>
                        <th>Data de Criação</th>
                        {!isActive && <th>Data de Fim</th>}
                        {repairsList.length > 0 && <th></th>}
                    </tr>
                </thead>
                <tbody>
                    {repairsList.length > 0 ? (
                        repairsList.map((repair) => (
                            <tr key={repair.id}>
                                <td>{repair.id}</td>
                                <td>{repair.description}</td>
                                <td>{repair.RepairStatus.state}</td>
                                <td>{new Date(repair.createdAt).toLocaleDateString()}</td>
                                {!isActive && <td>{new Date(repair.updatedAt).toLocaleDateString()}</td>}
                                <td><Button variant="primary" size="sm" className="w-100 fw-bold" onClick={() => onShowDetails(repair)}>See Details</Button></td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="4" className="text-center">Nenhuma reparação encontrada</td>
                        </tr>
                    )}
                </tbody>
            </Table>
        </div>
    );
}