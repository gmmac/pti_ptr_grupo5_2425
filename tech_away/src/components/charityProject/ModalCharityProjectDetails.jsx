import React, { useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import './../../styles/pageElements.css';
import CharityProjectInfoEditor from './CharityProjectInfoEditor';
import CharityProjectEquipmentTypeEditor from './CharityProjectEquipmentTypeEditor';

export default function ModalCharityProjectDetails({ show, handleClose, project, onRefresh, setSelectedProject }) {
  const [infoAlert, setInfoAlert] = useState({ message: '', variant: '', show: false });
  const [equipmentAlert, setEquipmentAlert] = useState({ message: '', variant: '', show: false });
  const [localProject, setLocalProject] = useState(project);

  const handleInfoAlert = ({ message, variant }) => {
    setInfoAlert({ message, variant, show: true });
    setTimeout(() => setInfoAlert({ message: '', variant: '', show: false }), 4000);
  };

  const handleEquipmentAlert = ({ message, variant }) => {
    setEquipmentAlert({ message, variant, show: true });
    setTimeout(() => setEquipmentAlert({ message: '', variant: '', show: false }), 4000);
  };

  useEffect(() => {
    setLocalProject(project);
    console.log("AAAAAAAA")
  }, [project]);




  if (!project) return null;

  return (
    <Modal show={show} onHide={handleClose} size="xl" centered>
      <Modal.Header closeButton className="bg-light border-0">
        <Modal.Title className="fw-bold">{project.name} Details</Modal.Title>
      </Modal.Header>

      <Modal.Body className="px-4">
      <CharityProjectInfoEditor
          project={localProject}
          setProject={setLocalProject}
          alert={infoAlert}
          onChangeAlert={handleInfoAlert}
          onRefresh={onRefresh}
          setSelectedProject={setSelectedProject}
        />

        <hr className="my-4" />

        <CharityProjectEquipmentTypeEditor
          projectId={project.id}
          isEditing={true}
          alert={equipmentAlert}
          onChangeAlert={handleEquipmentAlert}
        />
      </Modal.Body>
    </Modal>
  );
}
