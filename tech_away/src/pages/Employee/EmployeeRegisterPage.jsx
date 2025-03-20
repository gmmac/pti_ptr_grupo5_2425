import React from 'react'
import RegisterFormsEmployee from '../../components/authentication/RegisterFormsEmployee'

export default function RegisterPageClient() {

    return (
        <div className="d-flex align-items-center justify-content-center overflow-hidden mt-3">
            <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
                <RegisterFormsEmployee />
            </div>
        </div>
    );
}
