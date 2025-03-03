import React, { useEffect, useState } from 'react';
import InterestFolderCatalog from '../components/interests/folder/InterestFolderCatalog';
import api from '../utils/axios';
import { useLocation } from 'react-router-dom';
import sliceQueryPageURL from '../utils/sliceQueryPageURL';
import PaginationControl from '../components/pagination/PaginationControl';
import { Container } from 'react-bootstrap';
import { ModalProvider } from '../contexts/ModalContext';

export default function InterestsPage() {
    const [interestsFolder, setInterestsFolder] = useState([]); 
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const itemsPerPage = 4;

    const [query, setQuery] = useState();


    const [name, setName] = useState('');
    const [clientNIC, setClientNIC] = useState('');
    const [orderBy, setOrderBy] = useState('name,createdAt');
    const [orderDirection, setOrderDirection] = useState('ASC,DESC');

    const location = useLocation();
    const paramsArray = location.search.slice(1).split('&');

    useEffect(() => { 
        setQuery(sliceQueryPageURL(paramsArray));
    }, [location.search]);

    useEffect(() => {
        if (query) {
            setName(query.name || '');
            setClientNIC(query.clientNIC || '');
            setOrderBy(query.orderBy || 'name,createdAt');
            setOrderDirection(query.orderDirection || 'ASC,DESC');
        }
    }, [query]);
    
    // como não vai ser uma página, n há necessidade de ir buscar à query do url. (clientNIC -> user loggedIn)
    useEffect(() => {
        api.get(`/api/interestsFolder/`, {
            params: {
                name: name,
                clientNIC: clientNIC,
                orderBy,
                orderDirection,
                page: currentPage,
                pageSize: itemsPerPage
            }
        })
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
        <ModalProvider>
            <Container>
                <InterestFolderCatalog folders={interestsFolder} />
                <PaginationControl handlePageChange={handlePageChange} currentPage={currentPage} totalPages={totalPages} />
            </Container>
        </ModalProvider>
    );
}
