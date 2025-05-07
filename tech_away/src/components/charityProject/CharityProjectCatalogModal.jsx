import React, { useEffect, useState } from "react";
import { Modal, Button, Table, Container } from "react-bootstrap";
import api from "../../utils/axios";
import PaginationControl from "../pagination/PaginationControl";

export default function CharityProjectCatalogModal({ show, handleClose, handleSelectCharity, selectedCharityID }) {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 5;

    const handleClosePopUp = () => {
        handleClose();
        setCurrentPage(1);
    };

    useEffect(() => {
        const fetchProjects = async () => {
            setLoading(true);
            setError(null);
            try {
                const response = await api.get(`/api/charityProject`, {
                    params: {
                        page: currentPage,
                        pageSize: itemsPerPage,
                    }
                });
                setProjects(response.data.data || []);
                setTotalPages(response.data.totalPages);
            } catch (err) {
                setError("Erro ao carregar os projetos de beneficência");
            }
            setLoading(false);
        };

        if (show) {
            fetchProjects();
        }
    }, [show, currentPage]);

    const handlePageChange = (page) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    const handleProjectSelection = (project) => {
        if (selectedCharityID === project.id) {
            handleSelectCharity(null);
        } else {
            handleSelectCharity(project);
        }
    };

    return (
        <Modal show={show} onHide={handleClosePopUp} size="xl" centered>
            <Modal.Header closeButton>
                <Modal.Title>Catálogo de Projetos de Beneficência</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loading ? (
                    <p>Carregando dados...</p>
                ) : error ? (
                    <p className="text-danger">{error}</p>
                ) : projects.length === 0 ? (
                    <p>Nenhum projeto encontrado.</p>
                ) : (
                    <Container>
                        <Table striped bordered hover responsive>
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Nome</th>
                                    <th>Estado</th>
                                    <th>Organizador</th>
                                    <th>Armazém</th>
                                    <th>Selecionar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {projects.map(project => (
                                    <tr key={project.id}>
                                        <td>{project.id}</td>
                                        <td>{project.name}</td>
                                        <td>{project.ProjectStatus?.state}</td>
                                        <td>{`${project.Organizer?.firstName} ${project.Organizer?.lastName}`}</td>
                                        <td>{project.Warehouse?.name}</td>
                                        <td>
                                            <Button
                                                size="sm"
                                                variant={selectedCharityID === project.id ? "danger" : "success"}
                                                onClick={() => handleProjectSelection(project)}
                                            >
                                                {selectedCharityID === project.id ? "Desmarcar" : "Selecionar"}
                                            </Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>

                        <PaginationControl
                            handlePageChange={handlePageChange}
                            currentPage={currentPage}
                            totalPages={totalPages}
                        />
                    </Container>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClosePopUp}>Fechar</Button>
            </Modal.Footer>
        </Modal>
    );
}
