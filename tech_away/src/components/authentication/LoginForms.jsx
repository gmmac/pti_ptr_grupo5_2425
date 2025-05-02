import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios";
import "../../styles/index.css";
import "../../styles/AuthPage.css";
import { useAuth } from "../../contexts/AuthenticationProviders/AuthProvider";

export default function LoginForms({
  registerPath = "/register",
  changePasswordPath = "/changePassword",
}) {
  const { loginAction } = useAuth();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState({
    email: "",
    password: "",
    invalidCredentials: "",
  });

  const navigate = useNavigate();

  const ChangeToRegister = () => {
    navigate(registerPath);
  };

  const ChangeToChangePassword = () => {
    navigate(changePasswordPath);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log();
    // Verificar campos vazios
    let newErrors = { ...errors };
    let hasError = false;

    Object.keys(formData).forEach((field) => {
      if (!formData[field]) {
        newErrors[field] = "Este campo é obrigatório";
        hasError = true;
      } else {
        newErrors[field] = ""; // Limpa o erro
      }
    });

    setErrors(newErrors);

    if (hasError) {
      return; // Impede o envio do formulário se houver erros
    }

    newErrors = { ...errors };
    loginAction(formData, setErrors, newErrors);
  };

  const handleChange = (e) => {
    // Guarda o valor do input
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Avalia se o valor do input está válido
    let newErrors = { ...errors };

    // Verifica campos se os campos estão vazios ou inválidos
    if (!value) {
      newErrors[name] = "Este campo é obrigatório";
    } else if (name == "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        newErrors[name] = "O email deve ser válido";
      } else {
        newErrors[name] = "";
      }
    } else {
      newErrors[name] = ""; // Limpa erro se o campo não estiver vazio
    }

    setErrors(newErrors);
  };

  return (
    <div
      className="bg-white w-100 p-md-5 p-3 rounded-lg"
      style={{
        boxShadow: "var(--shadow-default)",
        fontFamily: "var(--body-font)",
      }}
    >
      <h1 className="mb-2" style={{ fontFamily: "var(--title-font)" }}>
        Login
      </h1>
      <p className="mb-4" style={{ fontWeight: "400" }}>
        Login to acess your account
      </p>

      <Form onSubmit={handleSubmit}>
        {/* Email */}
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label className="fw-bold">Email</Form.Label>
          <Form.Control
            className="auth-input"
            type="email"
            placeholder="Enter your email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Password */}
        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label className="fw-bold">Password</Form.Label>
          <Form.Control
            className="auth-input"
            type="password"
            placeholder="Enter your password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Reset Password link */}
        <Form.Group className="mb-3 text-end">
          <p className="underText" onClick={ChangeToChangePassword}>
            Reset Password
          </p>
        </Form.Group>

        <Form.Group>
          {errors.invalidCredentials && (
            <p className="text-danger">{errors.invalidCredentials}</p>
          )}
          <Button
            type="submit"
            className="w-100 rounded-pill py-2 fs-5"
            style={{
              boxShadow: "var(--shadow-default)",
              color: "var(--dark-grey)",
              backgroundColor: "var(--variant-two)",
              border: "none",
              fontFamily: "var(--title-font)",
            }}
          >
            Login
          </Button>
        </Form.Group>
      </Form>
      <div className="d-flex flex-align-items justify-content-end m-2">
        <p>Don't have an account?</p>
        <p className="ms-2 underText" onClick={ChangeToRegister}>
          Sign up
        </p>
      </div>
    </div>
  );
}
