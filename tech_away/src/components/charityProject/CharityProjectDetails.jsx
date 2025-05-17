import React, { useEffect, useState } from 'react';
import { Row, Col, Card, Stack } from 'react-bootstrap';
import CharityProjectInfoEditor from './CharityProjectEditor/CharityProjectInfoEditor';
import CharityProjectEquipmentTypeEditor from './CharityProjectEditor/CharityProjectEquipmentTypeEditor';
import CharityProjectEquipmentSheetEditor from './CharityProjectEditor/CharityProjectEquipmentSheetEditor';
import CharityProjectDonationDetails from './CharityProjectDonationDetails';
import { useNavigate } from 'react-router-dom';
import { Button } from "primereact/button";
import { ArrowReturnLeft } from 'react-bootstrap-icons';

export default function CharityProjectDetails({ project, onRefresh }) {
  const [infoAlert, setInfoAlert] = useState({ message: '', variant: '', show: false });
  const [equipmentAlert, setEquipmentAlert] = useState({ message: '', variant: '', show: false });
  const [equipmentSheetAlert, setEquipmentSheetAlert] = useState({ message: '', variant: '', show: false });

  const [localProject, setLocalProject] = useState(project);

  const navigate = useNavigate()


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

    const handleChangePage = () => {
    navigate("/organizer")
    // sessionStorage.setItem("organizerSelectedTab", "charityproject")
  }

  if (!project) return null;

  return (
    <div className="container py-4">
      <Stack direction="horizontal" className="fw-bold mb-4">
        <Button className='me-4 text-light rounded-pill px-3 btn btn-primary' style={{backgroundColor: "var(--variant-two)", border: "none"}} onClick={handleChangePage}>
          <ArrowReturnLeft 
            style={{ fontSize: '1.5rem' }}
          />
        </Button>

        <h2>{project.name} Details</h2>
      </Stack>

      <Card className="flex-fill mb-3 border shadow-sm" style={{ transform: 'none', transition: 'none',}}>
        <Card.Body>
          <CharityProjectInfoEditor
            project={localProject}
            setProject={setLocalProject}
            alert={infoAlert}
            onChangeAlert={handleInfoAlert}
            onRefresh={onRefresh}
          />
        </Card.Body>
      </Card>

      <hr className="my-4" />

      <Row className="g-4">
        <Col md={12} lg={6} className="d-flex">
          <Card className="flex-fill mb-3 border shadow-sm" style={{ transform: 'none', transition: 'none',}}>
            <Card.Body>
              <CharityProjectEquipmentTypeEditor
                projectId={project.id}
                isEditing={true}
                alert={equipmentAlert}
                onChangeAlert={handleEquipmentAlert}
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={12} lg={6} className="d-flex">
          <Card className="flex-fill mb-3 border shadow-sm" style={{ transform: 'none', transition: 'none',}}>
            <Card.Body>
              <CharityProjectEquipmentSheetEditor
                projectId={project.id}
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
            projectId={project.id}
          />
      </Row>
    </div>
  );
}


