import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationControl({ handlePageChange, currentPage, totalPages }) {
  if (totalPages <= 1) return null;

  const createPageItems = () => {
    const pages = [];
    const first = 1;
    const last = totalPages;
    const minPage = Math.max(2, currentPage - 1);
    const maxPage = Math.min(totalPages - 1, currentPage + 1);

    pages.push(first);

    if (minPage > 2) {
      pages.push('start-ellipsis');
    }

    for (let p = minPage; p <= maxPage; p++) {
      pages.push(p);
    }

    if (maxPage < totalPages - 1) {
      pages.push('end-ellipsis');
    }

    pages.push(last);
    return pages;
  };

  const pages = createPageItems();

  return (
    <Pagination className="d-flex justify-content-center mt-3" >
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
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
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}
