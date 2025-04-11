import React from 'react'
import LoginFormsEmployee from '../../components/authentication/LoginFormsEmployee'

export default function LoginPageClient() {
  return (
      <div className="d-flex align-items-center justify-content-center" style={{ minHeight: "calc(100vh - 56px)" }}>
          <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
          <LoginFormsEmployee />

          </div>
      </div>
  );
}
