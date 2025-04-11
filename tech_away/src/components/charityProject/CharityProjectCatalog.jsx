import React, { useEffect, useState } from 'react';
import { Button, Container, Stack, Spinner, Alert } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import CharityProjectTableView from './CharityProjectTableView';
import CharityProjectCardView from './CharityProjectCardView';
import CharityProjectFilter from './CharityProjectFilter';
export default function CharityProjectCatalog({ charityProjects, handlePageChange, currentPage, totalPages, onOpenDetails, onRefresh }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async (project) => {
    const confirm = window.confirm(`Are you sure you want to delete project "${project.name}"?`);
    if (!confirm) return;

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
      {/* <CharityProjectFilter filters={filters} onFilterChange={handleFilterChange} /> */}

      <CharityProjectTableView projects={charityProjects} onOpenDetails={onOpenDetails} onDelete={handleDelete} deleting={deleting} />
      <CharityProjectCardView projects={charityProjects} onOpenDetails={onOpenDetails} onDelete={handleDelete} deleting={deleting} />
      <PaginationControl
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Container>
  );
}
