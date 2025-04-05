import React from 'react';
import { Pagination } from 'react-bootstrap';

export default function PaginationControl({ handlePageChange, currentPage, totalPages }) {
  if (totalPages === 0) return null;

  const visiblePages = [...Array(totalPages).keys()].map((i) => i + 1);

  return (
    <Pagination className="d-flex justify-content-center mt-3">
      <Pagination.Prev
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
      />
      {visiblePages.map((page) => (
        <Pagination.Item
          key={page}
          active={page === currentPage}
          onClick={() => handlePageChange(page)}
          className="rounded-sm"
        >
          {page}
        </Pagination.Item>
      ))}
      <Pagination.Next
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </Pagination>
  );
}


// import React from 'react';
// import { Pagination } from 'react-bootstrap';

// export default function PaginationControl({ handlePageChange, currentPage, totalPages }) {
//     if (totalPages === 0) return null;

//     const visiblePages = [...Array(totalPages).keys()].map((i) => i + 1);

//     return (
//         <Pagination className="d-flex justify-content-center mt-4 custom-pagination">
//             <Pagination.Prev
//                 onClick={() => handlePageChange(currentPage - 1)}
//                 disabled={currentPage === 1}
//                 className="rounded-start"
//             />
//             {visiblePages.map((page) => (
//                 <Pagination.Item
//                     key={page}
//                     active={page === currentPage}
//                     onClick={() => handlePageChange(page)}
//                     className={`custom-page-item ${page === currentPage ? 'active-page' : ''}`}
//                 >
//                     {page}
//                 </Pagination.Item>
//             ))}
//             <Pagination.Next
//                 onClick={() => handlePageChange(currentPage + 1)}
//                 disabled={currentPage === totalPages}
//                 className="rounded-end"
//             />
//             <style>
//                 {`
//                     .custom-pagination .page-link {
//                         border: none;
//                         margin: 0 4px;
//                         padding: 6px 12px;
//                         border-radius: 12px;
//                         background-color: #f0f2f5;
//                         color: #333;
//                         transition: all 0.2s ease-in-out;
//                     }

//                     .custom-pagination .page-link:hover {
//                         background-color: var(--variant-one);
//                         color: white;
//                     }

//                     .custom-pagination .page-item.active .page-link,
//                     .custom-pagination .active-page .page-link {
//                         background-color: var(--variant-two);
//                         color: white;
//                         font-weight: bold;
//                         border: none;
//                     }

//                     .custom-pagination .page-item.disabled .page-link {
//                         background-color: #e0e0e0;
//                         color: #888;
//                     }
//                 `}
//             </style>
//         </Pagination>
//     );
// }
