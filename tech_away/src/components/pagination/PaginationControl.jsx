import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationControl({ handlePageChange, currentPage, totalPages }) {
  // Always show pagination, even if only one page
  const createPageItems = () => {
    // If there's only one page, just return [1]
    if (totalPages === 1) {
      return [1];
    }

    const pages = [];
    const first = 1;
    const last = totalPages;
    const minPage = Math.max(2, currentPage - 1);
    const maxPage = Math.min(totalPages - 1, currentPage + 1);

    // Always include first page
    pages.push(first);

    // Add start ellipsis if there's a gap
    if (minPage > 2) {
      pages.push('start-ellipsis');
    }

    // Add pages around current page
    for (let p = minPage; p <= maxPage; p++) {
      pages.push(p);
    }

    // Add end ellipsis if there's a gap
    if (maxPage < totalPages - 1) {
      pages.push('end-ellipsis');
    }

    // Always include last page
    pages.push(last);
    return pages;
  };

  const pages = createPageItems();

  return (
    <Pagination className="d-flex justify-content-center mt-3">
      <Pagination.Prev
        onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
      />

      {pages.map((page, idx) => {
        if (page === 'start-ellipsis' || page === 'end-ellipsis') {
          return <Pagination.Ellipsis key={`${page}-${idx}`} disabled />;
        }
        return (
          <Pagination.Item
            key={page}
            active={page === currentPage}
            onClick={() => handlePageChange(page)}
            className="rounded-sm"
          >
            {page}
          </Pagination.Item>
        );
      })}

      <Pagination.Next
        onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
