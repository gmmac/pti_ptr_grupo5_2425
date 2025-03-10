import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import api from '../../utils/axios';
import StoreCatalogModal from '../store/StoreCatalogModal';
import "../../styles/AuthPage.css"

function RegisterFormsEmployee() {

  const [showModal, setShowModal] = useState(false);

  const [roleList, setRoleList] = useState([]);
  const [employeeData, setEmployeeData] = useState({
    nic: '',
    nif: '',
    storeNIPC: '',
    birthDate: '',
    gender: '',
    name: '',
    email: '',
    phone: '',
    role: '',
  });
  const [errors, setErrors] = useState({});


  const handleCloseModal = () => {
    setShowModal(false);
  };
  

  const handleSelectStore = (store) => {
    setEmployeeData(prev => ({
      ...prev,
      storeNIPC: store ? store.nipc : ''
    }));
    setShowModal(false);
  };
  

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

    let newErrors = { ...errors };

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

    // Verificar campos vazios
    let newErrors = { ...errors };
    let hasError = false;

    console.log(employeeData)
    Object.keys(employeeData).forEach(field => {
        if (!employeeData[field]) {
            newErrors[field] = 'This field is required';
            hasError = true;
        } else {
            newErrors[field] = ''; // Limpa erro se o campo não estiver vazio
        }
    });

    setErrors(newErrors);

    if (hasError) {
        return; // Impede o envio do formulário se houver erros
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

  useEffect(() => {
    console.log(errors)
  }, [errors])

  return (
    <div className='bg-white w-100 p-md-5 p-3 rounded' >
      <h2>Create Employee</h2>

      <Form onSubmit={handleSubmit} className='bg-white'>

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
                className='auth-input'

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
                className='auth-input'

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
                type="number"
                name="nic"
                value={employeeData.nic}
                onChange={handleChange}
                isInvalid={!!errors.nic}
                className='auth-input'

              />
              <Form.Control.Feedback type="invalid">{errors.nic}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group controlId="nif">
              <Form.Label>NIF</Form.Label>
              <Form.Control
                type="number"
                name="nif"
                value={employeeData.nif}
                onChange={handleChange}
                className='auth-input'
                isInvalid={!!errors.nif}

              />
              <Form.Control.Feedback type="invalid">{errors.nif}</Form.Control.Feedback>

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
                className='auth-input'

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
                className='auth-input'

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
              className='auth-input'

            />
            <Form.Control.Feedback type="invalid">{errors.phone}</Form.Control.Feedback>
          </Form.Group>
        </Row>


        <Row className="mb-3">
          <Col sm={12} md={6}>
            <Form.Group controlId="storeNIPC">
              <Form.Label>Store NIPC</Form.Label>
              <Form.Control
                type="text"
                name="storeNIPC"
                value={employeeData.storeNIPC}
                onChange={handleChange}
                isInvalid={!!errors.storeNIPC}
                className='auth-input'
                disabled

              />
              <Form.Control.Feedback type="invalid">{errors.storeNIPC}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={6} className='d-flex align-items-end justify-content-start'>
            <Button 
            onClick={() => setShowModal(true)}
            className='w-100 rounded-pill forms-btn shadow-lg'
            >
              Choose Store
            </Button>
          </Col>
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
                className='auth-input'

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

        <Button type="submit" className='w-100 rounded-pill forms-btn shadow-lg'>
          Create Employee
        </Button>
      </Form>



      <StoreCatalogModal show={showModal} handleClose={handleCloseModal} handleSelectStore={handleSelectStore} selectedStore={employeeData.storeNIPC} />
    </div>
  );
}

export default RegisterFormsEmployee;
