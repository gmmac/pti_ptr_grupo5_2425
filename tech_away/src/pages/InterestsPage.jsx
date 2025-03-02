import React, { useEffect, useState } from 'react';
import InterestFolderCatalog from '../components/interests/InterestFolderCatalog';
import api from '../utils/axios';
import { useLocation } from 'react-router-dom';
import sliceQueryPageURL from '../utils/sliceQueryPageURL';
import PaginationControl from '../components/pagination/PaginationControl';
import { Container } from 'react-bootstrap';

export default function InterestsPage() {
    const [interestsFolder, setInterestsFolder] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [query, setQuery] = useState();
    const itemsPerPage = 3;

    const [name, setName] = useState('');
    const [clientNIC, setClientNIC] = useState('');
    const [orderBy, setOrderBy] = useState('createdAt');
    const [orderDirection, setOrderDirection] = useState('ASC');

    const location = useLocation();
    const paramsArray = location.search.slice(1).split('&');

    useEffect(() => { // atualizar a query, quando abrir a página
        setQuery(sliceQueryPageURL(paramsArray));
    }, [location.search]);

    useEffect(() => {
        if (query) {
        setName(query.name || '');
        setClientNIC(query.clientNIC || '');
        setOrderBy(query.orderBy || 'createdAt');
        setOrderDirection(query.orderDirection || 'ASC');
        }
    }, [query]);
    
    useEffect(() => {
        const apiUrl = `api/interestsFolder/?` +
        `name=${encodeURIComponent(name)}&` +
        `clientNIC=${encodeURIComponent(clientNIC)}&` +
        `orderBy=${encodeURIComponent(orderBy)}&` +
        `orderDirection=${encodeURIComponent(orderDirection)}&` +
        `page=${currentPage}&` +
        `pageSize=${itemsPerPage}`;
        
        api.get(apiUrl)
        .then(res => {
            setInterestsFolder(res.data.data);
            setTotalPages(res.data.totalPages);
        })
        .catch(error => {
            console.error('API error:', error.message);
        });
    }, [name, clientNIC, orderBy, orderDirection, currentPage]);
    
    

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <Container>
            <InterestFolderCatalog folders={interestsFolder} />
            <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
        </Container>
    );
}
