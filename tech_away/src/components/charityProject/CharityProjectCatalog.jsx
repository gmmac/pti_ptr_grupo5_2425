import React, { useEffect, useState } from 'react';
import { Container, Alert } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import CharityProjectTableView from './CharityProjectTableView';
import CharityProjectCardView from './CharityProjectCardView';
import ConfirmationModal from '../modals/ConfirmationModal';
import CharityProjectDisplayTable from './CharityProjectDisplayTable';

export default function CharityProjectCatalog({
  charityProjects,
  handlePageChange,
  currentPage,
  totalPages,
  onOpenDetails,
  onRefresh
}) {
  const [deleting, setDeleting] = useState(false);
  const [confirmationData, setConfirmationData] = useState({
    show: false,
    action: null,
    title: '',
    message: ''
  });

  const confirmAction = (action, title, message) => {
    setConfirmationData({ show: true, action, title, message });
  };

  const handleDelete = (project) => {
    confirmAction(
      () => deleteProject(project),
      'Confirm Deletion',
      `Are you sure you want to delete project "${project.name}"?`
    );
  };

  const deleteProject = async (project) => {
    setDeleting(true);
    try {
      await api.delete(`/api/charityProject/${project.id}`);
      onRefresh();
    } catch (error) {
      console.error('Error deleting project:', error);
      alert('Failed to delete project.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Container className="py-4">

      <CharityProjectDisplayTable
        onOpenDetails={onOpenDetails}
      />
      {/* <CharityProjectCardView
        projects={charityProjects}
        onOpenDetails={onOpenDetails}
        onDelete={handleDelete}
        deleting={deleting}
      />
      <PaginationControl
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      /> */}

      {/* Modal de confirmação */}
      <ConfirmationModal
        show={confirmationData.show}
        onHide={() => setConfirmationData({ ...confirmationData, show: false })}
        onConfirm={() => {
          confirmationData.action?.();
          setConfirmationData({ ...confirmationData, show: false });
        }}
        title={confirmationData.title}
        message={confirmationData.message}
        confirmText="Delete"
        confirmVariant="danger"
      />
    </Container>
  );
}
