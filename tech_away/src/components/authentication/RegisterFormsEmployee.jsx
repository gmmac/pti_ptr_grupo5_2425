import React, { useEffect, useState } from 'react';
import { Form, Button, Container, Row, Col, Stack } from 'react-bootstrap';
import api from '../../utils/axios';
import StoreCatalogModal from '../store/StoreCatalogModal';
import "../../styles/AuthPage.css"
import { useNavigate } from 'react-router-dom';

function RegisterFormsEmployee() {

  const [showModal, setShowModal] = useState(false);


  const initialEmployeeData = {
  nic: '',
  nif: '',
  storeNIPC: '',
  birthDate: '',
  gender: '',
  firstName: '',
  lastName: '',
  email: '',
  phone: '',
  role: '',
};


  const [roleList, setRoleList] = useState([]);
  const [employeeData, setEmployeeData] = useState(initialEmployeeData);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleCloseModal = () => {
    setShowModal(false);
  };
  
  const handlePageChange = () => {
    navigate(-1)
  };

  const handleSelectStore = (store) => {
    setEmployeeData(prev => ({
      ...prev,
      storeNIPC: store ? store.nipc : ''
    }));
    
    setErrors(prevErrors => ({
      ...prevErrors,
      storeNIPC: store ? '' : 'This input is required'
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
    const { name, value } = e.target;
    let newErrors = { ...errors };

    // Atualiza os dados do funcionário
    setEmployeeData({ ...employeeData, [name]: value });

    // Validação de campos obrigatórios
    if (!value) {
      newErrors[name] = 'This field is required';
    } else {
      newErrors[name] = '';
    }

    // Validação do email
    if (name === 'email') {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      newErrors[name] = emailPattern.test(value) ? '' : 'Email must be valid';
    }

    // Validação de número de telefone, NIF e NIC (exatamente 9 dígitos)
    if (['phone', 'nif', 'nic'].includes(name)) {
      const nineDigitPattern = /^\d{9}$/;
      newErrors[name] = nineDigitPattern.test(value) ? '' : 'Value must have exactly 9 digits';
    }

    if (name === 'birthDate') {
      const birthDate = new Date(value);
      const today = new Date();
      const age = today.getFullYear() - birthDate.getFullYear();

      if (
        age < 16 ||
        (age === 16 && (today.getMonth() < birthDate.getMonth() || (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate())))
      ) {
        newErrors[name] = 'Employee must be at least 16 years old';
      } else {
        newErrors[name] = '';
      }
    }

    setErrors(newErrors);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    

    // Verificar campos vazios
    let newErrors = { ...errors };
    let hasError = false;

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

    
    verifyData();

  };


  const verifyData = async () => {
    const response = await api.put('/api/auth/generateAuthToken');
    await api.post('api/employee', employeeData)
    .then(async response => {
      if(response.data.errorTag){
          let newErrors = { ...errors };
          newErrors[response.data.errorTag] = 'A employee with this ' + response.data.errorTag + ' already exists';
          setErrors(newErrors);
      }

        console.log(employeeData.nif + "@A")
        await api.post('/api/auth/register', {email: employeeData.email, password: employeeData.nif + "@A"}); // password inical -> nif@A
        setEmployeeData(initialEmployeeData);

    })
    .catch(error => {})
}

  return (
    <div className='bg-white w-100 px-md-5 p-5 pt-4 rounded-lg shadow-lg' >

      <Stack gap={4} direction='horizontal' className="align-items-center">
        <Button onClick={handlePageChange}>Go back</Button>
        <h2>Create Employee</h2>
      </Stack>

      <Form onSubmit={handleSubmit} className='bg-white'>

        <Row className="mb-3">
          <Col sm={12} md={6}>
            <Form.Group controlId="name">
              <Form.Label>First Name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                value={employeeData.firstName}
                onChange={handleChange}
                isInvalid={!!errors.firstName}
                className='auth-input'

              />
              <Form.Control.Feedback type="invalid">{errors.firstName}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={6}>
            <Form.Group controlId="name">
              <Form.Label>Last Name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                value={employeeData.lastName}
                onChange={handleChange}
                isInvalid={!!errors.lastName}
                className='auth-input'

              />
              <Form.Control.Feedback type="invalid">{errors.lastName}</Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col sm={12} md={12}>
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
              <Form.Label>NIC</Form.Label>
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
            onClick={() => {setShowModal(true)}}
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
