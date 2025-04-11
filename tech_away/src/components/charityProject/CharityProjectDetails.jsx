import React, { useEffect, useState } from 'react';
import { Row, Col } from 'react-bootstrap';
import CharityProjectInfoEditor from './CharityProjectEditor/CharityProjectInfoEditor';
import CharityProjectEquipmentTypeEditor from './CharityProjectEditor/CharityProjectEquipmentTypeEditor';
import CharityProjectEquipmentSheetEditor from './CharityProjectEditor/CharityProjectEquipmentSheetEditor';

export default function CharityProjectDetails({ project, onRefresh }) {
  const [infoAlert, setInfoAlert] = useState({ message: '', variant: '', show: false });
  const [equipmentAlert, setEquipmentAlert] = useState({ message: '', variant: '', show: false });
  const [equipmentSheetAlert, setEquipmentSheetAlert] = useState({ message: '', variant: '', show: false });

  const [localProject, setLocalProject] = useState(project);

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

  if (!project) return null;

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-4">{project.name} Details</h2>

      <CharityProjectInfoEditor
        project={localProject}
        setProject={setLocalProject}
        alert={infoAlert}
        onChangeAlert={handleInfoAlert}
        onRefresh={onRefresh}
      />

      <hr className="my-4" />

      <Row>
        <Col md={12} lg={6} className="mb-4">
          <CharityProjectEquipmentTypeEditor
            projectId={project.id}
            isEditing={true}
            alert={equipmentAlert}
            onChangeAlert={handleEquipmentAlert}
          />
        </Col>

        <Col md={12} lg={6} className="mb-4">
          <CharityProjectEquipmentSheetEditor
            projectId={project.id}
            alert={equipmentSheetAlert}
            onChangeAlert={handleEquipmentSheetAlert}
          />
        </Col>
      </Row>
    </div>
  );
}
