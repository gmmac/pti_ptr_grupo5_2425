import React, { useEffect, useState } from 'react';
import { Card, Col, Modal, Row } from 'react-bootstrap';
import './../../styles/pageElements.css';
import CharityProjectInfoEditor from './CharityProjectEditor/CharityProjectInfoEditor';
import CharityProjectEquipmentTypeEditor from './CharityProjectEditor/CharityProjectEquipmentTypeEditor';
import CharityProjectEquipmentSheetEditor from './CharityProjectEditor/CharityProjectEquipmentSheetEditor';
import api from '../../utils/axios';
import CharityProjectDonationDetails from './CharityProjectDonationDetails';

export default function ModalCharityProjectDetails({ show, handleClose, project, onRefresh, setSelectedProject }) {
  const [projectData, setProjectData] = useState(null);
  const [infoAlert, setInfoAlert] = useState({ message: '', variant: '', show: false });
  const [equipmentAlert, setEquipmentAlert] = useState({ message: '', variant: '', show: false });
  const [equipmentSheetAlert, setEquipmentSheetAlert] = useState({ message: '', variant: '', show: false });
  const [localProject, setLocalProject] = useState();


  useEffect(() => {
    if (!project || !show) return;
    api.get(`/api/charityProject/${project}`)
      .then(res => {setProjectData(res.data); setLocalProject(res.data)})
      .catch(console.error);
  }, [project, show]);
  

  const handleInfoAlert = ({ message, variant }) => {
    setInfoAlert({ message, variant, show: true });
    setTimeout(() => setInfoAlert({ message: '', variant: '', show: false }), 4000);
  };

  const handleEquipmentAlert = ({ message, variant }) => {
    setEquipmentAlert({ message, variant, show: true });
    setTimeout(() => setEquipmentAlert({ message: '', variant: '', show: false }), 4000);
  };


  const handleEquipmentSheetAlert = ({ message, variant }) => {
    setEquipmentSheetAlert({ message, variant, show: true });
    setTimeout(() => setEquipmentSheetAlert({ message: '', variant: '', show: false }), 4000);
  };

  return (
    <>
      {projectData &&
      <Modal show={show} onHide={handleClose} size="xl" centered>
        <Modal.Header closeButton className="bg-light border-0">
          <Modal.Title className="fw-bold">{projectData.name} Details</Modal.Title>
        </Modal.Header>
        <Modal.Body className="px-4">
          <CharityProjectInfoEditor
            project={localProject}
            setProject={setProjectData}
            alert={infoAlert}
            onChangeAlert={handleInfoAlert}
            onRefresh={onRefresh}
            setSelectedProject={setSelectedProject}
          />
          <hr className="my-4" />
          <Row className="g-4">
            <Col md={12} lg={6} className="d-flex">
              <Card className="flex-fill mb-3 border shadow-sm">
                <Card.Body>
                  <CharityProjectEquipmentTypeEditor
                    projectId={projectData.id}
                    isEditing={true}
                    alert={equipmentAlert}
                    onChangeAlert={handleEquipmentAlert}
                  />
                </Card.Body>
              </Card>
            </Col>

            <Col md={12} lg={6} className="d-flex">
              <Card className="flex-fill mb-3 border shadow-sm">
                <Card.Body>
                  <CharityProjectEquipmentSheetEditor
                    projectId={projectData.id}
                    alert={equipmentSheetAlert}
                    onChangeAlert={handleEquipmentSheetAlert}
                  />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <hr className="my-4" />

          <Row>
              <CharityProjectDonationDetails
                projectId={projectData.id}
              />
          </Row>

        </Modal.Body>
      </Modal>
      }
    </>

  );
  
}
