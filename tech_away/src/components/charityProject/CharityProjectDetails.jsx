// import React, { useEffect, useState } from 'react';
// import { Row, Col, Card } from 'react-bootstrap';
// import CharityProjectInfoEditor from './CharityProjectEditor/CharityProjectInfoEditor';
// import CharityProjectEquipmentTypeEditor from './CharityProjectEditor/CharityProjectEquipmentTypeEditor';
// import CharityProjectEquipmentSheetEditor from './CharityProjectEditor/CharityProjectEquipmentSheetEditor';
// import CharityProjectDonationDetails from './CharityProjectDonationDetails';

// export default function CharityProjectDetails({ project, onRefresh }) {
//   const [infoAlert, setInfoAlert] = useState({ message: '', variant: '', show: false });
//   const [equipmentAlert, setEquipmentAlert] = useState({ message: '', variant: '', show: false });
//   const [equipmentSheetAlert, setEquipmentSheetAlert] = useState({ message: '', variant: '', show: false });

//   const [localProject, setLocalProject] = useState(project);

//   const handleInfoAlert = ({ message, variant }) => {
//     setInfoAlert({ message, variant, show: true });
//     setTimeout(() => setInfoAlert({ message: '', variant: '', show: false }), 4000);
//   };

//   const handleEquipmentAlert = ({ message, variant }) => {
//     setEquipmentAlert({ message, variant, show: true });
//     setTimeout(() => setEquipmentAlert({ message: '', variant: '', show: false }), 4000);
//   };

//   const handleEquipmentSheetAlert = ({ message, variant }) => {
//     setEquipmentSheetAlert({ message, variant, show: true });
//     setTimeout(() => setEquipmentSheetAlert({ message: '', variant: '', show: false }), 4000);
//   };

//   if (!project) return null;

//   return (
//     <div className="container py-4">
//       <h2 className="fw-bold mb-4">{project.name} Details</h2>

//       <CharityProjectInfoEditor
//         project={localProject}
//         setProject={setLocalProject}
//         alert={infoAlert}
//         onChangeAlert={handleInfoAlert}
//         onRefresh={onRefresh}
//       />

//       <hr className="my-4" />

//       <Row className="g-4">
//         <Col md={12} lg={6} className="d-flex">
//           <Card className="flex-fill mb-3 border shadow-sm">
//             <Card.Body>
//               <CharityProjectEquipmentTypeEditor
//                 projectId={project.id}
//                 isEditing={true}
//                 alert={equipmentAlert}
//                 onChangeAlert={handleEquipmentAlert}
//               />
//             </Card.Body>
//           </Card>
//         </Col>

//         <Col md={12} lg={6} className="d-flex">
//           <Card className="flex-fill mb-3 border shadow-sm">
//             <Card.Body>
//               <CharityProjectEquipmentSheetEditor
//                 projectId={project.id}
//                 alert={equipmentSheetAlert}
//                 onChangeAlert={handleEquipmentSheetAlert}
//               />
//             </Card.Body>
//           </Card>
//         </Col>
//       </Row>

//       <hr className="my-4" />

//       <Row>
//           <CharityProjectDonationDetails
//             projectId={project.id}
//           />
//       </Row>
//     </div>
//   );
// }


import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import CharityProjectInfoEditor from './CharityProjectEditor/CharityProjectInfoEditor';
import CharityProjectEquipmentTypeEditor from './CharityProjectEditor/CharityProjectEquipmentTypeEditor';
import CharityProjectEquipmentSheetEditor from './CharityProjectEditor/CharityProjectEquipmentSheetEditor';
import CharityProjectDonationDetails from './CharityProjectDonationDetails';

export default function CharityProjectDetails({ project, onRefresh }) {
  const [infoAlert, setInfoAlert]               = useState({ message: '', variant: '', show: false });
  const [equipmentAlert, setEquipmentAlert]     = useState({ message: '', variant: '', show: false });
  const [equipmentSheetAlert, setEquipmentSheetAlert] = useState({ message: '', variant: '', show: false });
  const [localProject, setLocalProject]         = useState(project);

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
    // usa container-fluid para ocupar mais largura
    <div className="container-fluid py-4">
      <h2 className="fw-bold mb-4">{project.name} Details</h2>

      <CharityProjectInfoEditor
        project={localProject}
        setProject={setLocalProject}
        alert={infoAlert}
        onChangeAlert={handleInfoAlert}
        onRefresh={onRefresh}
      />

      <hr className="my-4" />

      <Row className="g-4">
        {/* Editor de tipos */}
        <Col xs={12} lg={4} className="d-flex">
          <Card className="flex-fill mb-3 border shadow-sm">
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

        {/* Editor de sheets */}
        <Col xs={12} lg={4} className="d-flex">
          <Card className="flex-fill mb-3 border shadow-sm">
            <Card.Body>
              <CharityProjectEquipmentSheetEditor
                projectId={project.id}
                alert={equipmentSheetAlert}
                onChangeAlert={handleEquipmentSheetAlert}
              />
            </Card.Body>
          </Card>
        </Col>

        {/* Doações na mesma linha */}
        <Col xs={12} lg={4} className="d-flex">
          <Card className="flex-fill mb-3 border shadow-sm">
            <Card.Body>
              <CharityProjectDonationDetails projectId={project.id} />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}
