import React from 'react'
import { Pagination } from 'react-bootstrap';

export default function PaginationControl({handlePageChange, currentPage, totalPages}) {
  return (
    <Pagination className="d-flex justify-content-center mt-2">
        
        <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1 || totalPages === 0} />

            {[...Array(totalPages)].map((_, index) => (
                <Pagination.Item
                    key={index + 1}
                    active={index + 1 === currentPage}
                    onClick={() => handlePageChange(index + 1)}
                >
                    {index + 1}
                </Pagination.Item>
            ))}

        <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages || totalPages === 0} />

    </Pagination>
  );
}