import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';

function RegisterFormsEmployee() {

  const [roleList, setRoleList] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    nic: '',
    nif: '',
    internNum: '',
    storeNIPC: '',
    birthDate: '',
    gender: '',
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    api.get("api/employeeRole")
      .then((res) => {
        setRoleList(res.data);
      })
      .catch((err) => {
        console.error('Error fetching roles', err);
      });
  }, []);


  const handleChange = (e) => {
    // Guarda o valor do input
    const { name, value } = e.target;
    setEmployeeData({ ...employeeData, [name]: value });

    // Avalia se o valor do input está válido
    let newErrors = { ...errors };

    // Verifica campos se os campos estão vazios ou inválidos
    if (!value) {
      newErrors[name] = 'Este campo é obrigatório';
    } else if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        newErrors[name] = 'O email deve ser válido';
      } else {
        newErrors[name] = '';
      }
    } else if (name === 'phone') {
      const phonePattern = /^\d{9}$/; // Exemplo de validação simples de telefone com 9 dígitos
      if (!phonePattern.test(value)) {
        newErrors[name] = 'O número de telefone deve ter 9 dígitos';
      } else {
        newErrors[name] = '';
      }
    } else {
      newErrors[name] = ''; // Limpa erro se o campo não estiver vazio
    }

    setErrors(newErrors);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(errors)
    console.log(employeeData)
    // Verificar se há erros antes de submeter
    if (Object.keys(errors).length > 0) {
      setErrorMessage('Existem erros no formulário, por favor corrija-os.');
      return;
    }

    console.log("Employee criado.")
    // try {
    //   const response = await api.post('api/employee', employeeData);
    //   alert('Employee created successfully');
    //   console.log(response.data); // Pode ser usado para depuração
    // } catch (error) {
    //   console.error('Error creating employee!', error);
    //   alert('Error creating employee');
    // }
  };

  return (
    <Container className="my-4">
      <h2>Create Employee</h2>

      <Form onSubmit={handleSubmit}>

        {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}

        <Row className="mb-3">
          <Col sm={12} md={6}>
            <Form.Group controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={employeeData.name}
                onChange={handleChange}
                isInvalid={!!errors.name}
              />
              <Form.Control.Feedback type="invalid">{errors.name}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={employeeData.email}
                onChange={handleChange}
                isInvalid={!!errors.email}
              />
              <Form.Control.Feedback type="invalid">{errors.email}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={12} md={6}>
            <Form.Group controlId="nic">
              <Form.Label>NIC (Primary Key)</Form.Label>
              <Form.Control
                type="text"
                name="nic"
                value={employeeData.nic}
                onChange={handleChange}
                isInvalid={!!errors.nic}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.nic}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group controlId="nif">
              <Form.Label>NIF</Form.Label>
              <Form.Control
                type="text"
                name="nif"
                value={employeeData.nif}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={12} md={6}>
            <Form.Group controlId="internNum">
              <Form.Label>Intern Number</Form.Label>
              <Form.Control
                type="text"
                name="internNum"
                value={employeeData.internNum}
                onChange={handleChange}
              />
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group controlId="storeNIPC">
              <Form.Label>Store NIPC</Form.Label>
              <Form.Control
                type="text"
                name="storeNIPC"
                value={employeeData.storeNIPC}
                onChange={handleChange}
                isInvalid={!!errors.storeNIPC}
                required
              />
              <Form.Control.Feedback type="invalid">{errors.storeNIPC}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col sm={12} md={6}>
            <Form.Group controlId="gender">
              <Form.Label>Gender</Form.Label>
              <Form.Select
                name="gender"
                value={employeeData.gender}
                onChange={handleChange}
                isInvalid={!!errors.gender}
              >
                <option value="">Select Gender</option>
                <option value="M">Male</option>
                <option value="F">Female</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.gender}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group controlId="birthDate">
              <Form.Label>Birth Date</Form.Label>
              <Form.Control
                type="date"
                name="birthDate"
                value={employeeData.birthDate}
                onChange={handleChange}
                isInvalid={!!errors.birthDate}
              />
              <Form.Control.Feedback type="invalid">{errors.birthDate}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="phone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              name="phone"
              value={employeeData.phone}
              onChange={handleChange}
              isInvalid={!!errors.phone}
            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Col sm={12} md={6}>
            <Form.Group controlId="role">
              <Form.Label>Role</Form.Label>
              <Form.Select
                name="role"
                value={employeeData.role}
                onChange={handleChange}
                isInvalid={!!errors.role}
                required
              >
                <option value="">Select Role</option>
                {roleList.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.role}
                  </option>
                ))}
              </Form.Select>
              <Form.Control.Feedback type="invalid">{errors.role}</Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" type="submit">
          Create Employee
        </Button>
      </Form>
    </Container>
  );
}

export default RegisterFormsEmployee;
