import React, { useEffect, useState } from 'react';
import CharityProjectDetails from '../../components/charityProject/CharityProjectDetails';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../utils/axios';
import { Button } from 'react-bootstrap';

export default function CharityProjectPage() {
  const { projectName } = useParams();
  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  const navigate = useNavigate()

  const toggleRefresh = () => setRefresh(prev => !prev);

  const handleChangePage = () => {
    navigate("/organizer")
    sessionStorage.setItem("organizerSelectedTab", "charityproject")
  }

  useEffect(() => {
    const fetchProject = async () => {
      try {
        await api.get(`/api/charityProject?projectName=${encodeURIComponent(projectName)}`)
        .then((response) => {
            setProject(response.data.data[0]);
            console.log(response.data.data[0])
        })
      } catch (error) {
        console.error('Erro no fetch:', error);
        setProject(null);
      } finally {
        setLoading(false);
      }
    };

    if (projectName) {
      setLoading(true); // reset loading ao mudar o nome
      fetchProject();
    }
  }, [projectName, refresh]);

  if (loading) return <div className="text-center mt-5">Carregando projeto...</div>;
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
