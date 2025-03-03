import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";
import { Container } from "react-bootstrap"

export default function AuthenticationPage() {
  const { loginWithRedirect, logout } = useAuth0();
  return (
  <Container>
    <button onClick={() => loginWithRedirect()}>Log In</button>
    <button onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>Log Out</button>
  </Container>);
}
