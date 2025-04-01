import React from 'react'
import RegisterFormsOrganizer from '../../components/authentication/RegisterFormsOrganizer';

export default function OrganizerRegisterPage() {
    return (
        <div className="d-flex align-items-center justify-content-center overflow-hidden mt-3">
            <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
                <RegisterFormsOrganizer />
            </div>
        </div>
    );
}
