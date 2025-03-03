import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import InterestModal from "../InterestModal";
import api from "../../../utils/axios";
import { usePagination } from "../../../contexts/PaginationContext";

export default function InterestFolderCard({ iFolder }) {
  const [showModal, setShowModal] = useState(false);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(false);
  const { currentPage, setCurrentPage, totalPages, setTotalPages } = usePagination();

  const itemsPerPage = 6;

  useEffect(() => {
    console.log(interests)
  }, [interests]);

  useEffect(() => {
    if (showModal){
      fetchInterests();
    }
  }, [showModal, currentPage]);

  const fetchInterests = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/api/interest`, {
        params: {
          folderInterestID: iFolder.id,
          orderBy: "createdAt",
          orderDirection: "DESC",
          page: currentPage,
          pageSize: itemsPerPage,
        },
      });

      setInterests(response.data.data);
      setTotalPages(response.data.totalPages);

    } catch (error) {
      console.error("Error fetching interests:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleShow = () => {
    setCurrentPage(1);
    setShowModal(true);
  };

  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <Card className="mb-3 shadow-sm flex-fill">
        <Card.Body>
          <Card.Title>{iFolder.name}</Card.Title>

          <Card.Subtitle className="mb-2 text-muted">
            Cliente: {iFolder.client.name}
          </Card.Subtitle>

          <Card.Text>
            Criado em: {new Date(iFolder.createdAt).toLocaleDateString()}
          </Card.Text>

          <Button variant="primary" onClick={handleShow} disabled={loading}>
            {loading ? "Loading..." : "See Details"}
          </Button>
        </Card.Body>
      </Card>

      <InterestModal showModal={showModal} closeModal={handleClose} interestsData={interests} />
    </>
  );
}
