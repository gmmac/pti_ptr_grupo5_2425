import React, { useEffect, useState } from 'react';
import { Button, Container, Stack, Spinner, Alert } from 'react-bootstrap';
import api from '../../utils/axios';
import PaginationControl from '../pagination/PaginationControl';
import CharityProjectTableView from './CharityProjectTableView';
import CharityProjectCardView from './CharityProjectCardView';
import CharityProjectFilter from './CharityProjectFilter';

export default function CharityProjectCatalog({ charityProjects, handlePageChange, currentPage, totalPages, onOpenDetails }) {
  return (
    <Container className="py-4">
      {/* <CharityProjectFilter filters={filters} onFilterChange={handleFilterChange} /> */}
      
      <CharityProjectTableView projects={charityProjects} onOpenDetails={onOpenDetails} />
      <CharityProjectCardView projects={charityProjects} onOpenDetails={onOpenDetails} />
      <PaginationControl
        handlePageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </Container>
  );
}
