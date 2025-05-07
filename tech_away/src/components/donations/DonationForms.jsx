// ...imports mantidos
import CharityProjectCatalogModal from '../charity/CharityProjectCatalogModal';

export default function DonationForms({ show, handleClose }) {
  const [form, setForm] = useState({
    statusID: '',
    clientNic: '',
    equipmentBarcode: '',
    charityProjectId: '',
  });

  const [statusList, setStatusList] = useState([]);
  const [equipmentList, setEquipmentList] = useState([]);
  const [clientList, setClientList] = useState([]);
  const [charityList, setCharityList] = useState([]);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const [clientData, setClientData] = useState({ /* ... */ });
  const [equipmentData, setEquipmentData] = useState({ /* ... */ });
  const [charityProject, setCharityProject] = useState(null);

  const [showModal, setShowModal] = useState(false);
  const [showModalEq, setShowModalEq] = useState(false);
  const [showModalCharity, setShowModalCharity] = useState(false);

  useEffect(() => {
    api.get(`/api/equipmentStatus/`).then(res => setStatusList(res.data)).catch(console.error);
    api.get(`/api/model/`).then(res => setModelsList(res.data)).catch(console.error);
    api.get(`/api/equipmentSheet/teste`).then(res => setEquipmentList(res.data.data.map(e => e.barcode))).catch(console.error);
    api.get(`/api/client/`).then(res => setClientList(res.data.data.map(e => e.nic))).catch(console.error);
    api.get(`/api/charityProject`).then(res => setCharityList(res.data.data)).catch(console.error);
  }, []);

  const handleSelectCharity = (project) => {
    if (project) {
      setCharityProject(project);
      setForm(prev => ({ ...prev, charityProjectId: project.id }));
    } else {
      setCharityProject(null);
      setForm(prev => ({ ...prev, charityProjectId: '' }));
    }
    setShowModalCharity(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (form.equipmentBarcode.length !== 20) {
      setError("O Código de barras do equipamento deve ter exatamente 20 algarismos.");
      return;
    }

    if (!equipmentList.includes(form.equipmentBarcode)) {
      setError("Não existe nenhum equipamento com o Código de barras fornecido.");
      return;
    }

    if (!clientList.includes(form.clientNic)) {
      setError("Não existe nenhum cliente com o NIC fornecido.");
      return;
    }

    if (!form.charityProjectId) {
      setError("Selecione um projeto de beneficência.");
      return;
    }

    try {
      await api.post('/api/donation', form); // Altere para sua rota real
      setSuccessMessage("Doação registrada com sucesso!");
      setError("");

      setTimeout(() => {
        setSuccessMessage("");
        setForm({ statusID: '', clientNic: '', equipmentBarcode: '', charityProjectId: '' });
        setCharityProject(null);
      }, 3000);
    } catch (error) {
      console.error("Erro ao registrar doação: ", error);
      setError("Ocorreu um erro ao registar a doação.");
    }
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} size="lg" centered>
        <Modal.Header closeButton>
          <Modal.Title>Registrar Doação</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {successMessage && <Alert variant="success" className="text-center">{successMessage}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group controlId="formEstado">
                <Form.Label>Estado do Equipamento</Form.Label>
                <Form.Control as="select" name="statusID" value={form.statusID} onChange={handleChange} required>
                  <option value="">Selecione...</option>
                  {statusList.map((s, idx) => <option key={idx} value={s.id}>{s.state}</option>)}
                </Form.Control>
              </Form.Group>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formClientNic">
                  <Form.Label>NIC do cliente</Form.Label>
                  <Form.Control type="text" name="clientNic" value={form.clientNic} onChange={handleChange} placeholder="Digite o NIC" required />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button onClick={() => setShowModal(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                  Procurar cliente
                </Button>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={6}>
                <Form.Group controlId="formBarcodeEquipamento">
                  <Form.Label>Código de barras do Equipamento</Form.Label>
                  <Form.Control type="number" name="equipmentBarcode" value={form.equipmentBarcode} onChange={handleChange} placeholder="Digite o código de barras" required />
                </Form.Group>
              </Col>
              <Col md={6} className="d-flex align-items-end">
                <Button onClick={() => setShowModalEq(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                  Buscar equipamento
                </Button>
              </Col>
            </Row>

            <Row className="mb-3">
              <Col md={12}>
                <Form.Group controlId="formCharityProject">
                  <Form.Label>Projeto de Beneficência</Form.Label>
                  <Form.Control type="text" readOnly value={charityProject ? charityProject.name : ''} placeholder="Selecione um projeto" />
                </Form.Group>
              </Col>
              <Col md={12} className="d-flex align-items-end mt-2">
                <Button onClick={() => setShowModalCharity(true)} className="w-100 rounded-pill shadow-sm" variant="outline-secondary">
                  Selecionar projeto
                </Button>
              </Col>
            </Row>

            {error && <Alert variant="danger" className="text-center">{error}</Alert>}

            <Button variant="primary" type="submit" disabled={!!error} className="mt-3 w-100 rounded-pill shadow-lg">
              Registrar Doação
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      <ClientCatalogModal show={showModal} handleClose={() => setShowModal(false)} handleSelectClient={handleSelectClient} selectedClient={clientData.nic} />
      <UsedEquipmentCatalogModal show={showModalEq} handleClose={() => setShowModalEq(false)} handleSelectEquipment={handleSelectEquipment} selectedEquipment={equipmentData.barcode} />
      <CharityProjectCatalogModal show={showModalCharity} handleClose={() => setShowModalCharity(false)} handleSelectProject={handleSelectCharity} selectedProject={charityProject?.id} />
    </>
  );
}
