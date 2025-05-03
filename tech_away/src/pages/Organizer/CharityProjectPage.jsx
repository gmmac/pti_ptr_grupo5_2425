import React, { useEffect, useState } from 'react';
import CharityProjectDetails from '../../components/charityProject/CharityProjectDetails';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/axios';
import { Button } from 'react-bootstrap';

export default function CharityProjectPage() {
  // const { id } = useParams();
  const [project, setProject] = useState(null);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()

  const toggleRefresh = () => setRefresh(prev => !prev);

  const handleChangePage = () => {
    navigate("/organizer")
    // sessionStorage.setItem("organizerSelectedTab", "charityproject")
  }
  const { id } = useParams();

  useEffect(() => {
    
    if (id) {
        try {
          api.get(`/api/charityProject?id=${id}`)
          .then((response) => {
              console.log(response.data)
              setProject(response.data.data[0]);
          })
        } catch (error) {
          console.error('Erro no fetch:', error);
          setProject(null);
      }
    }
  }, [id, refresh]);

  if (!project) return <div className="text-center mt-5 text-danger">Projeto não encontrado.</div>;

  return (
    <div>
        <Button onClick={handleChangePage}>
            Back
        </Button>
      <CharityProjectDetails 
        project={project}
        onRefresh={toggleRefresh}
      />
    </div>
  );
}
