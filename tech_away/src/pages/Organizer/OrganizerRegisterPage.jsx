import React from 'react'
import RegisterForms from '../../components/authentication/RegisterForms';

export default function OrganizerRegisterPage() {
    return (
        <div className="d-flex align-items-center justify-content-center overflow-hidden mt-3">
            <div style={{ width: "700px", maxWidth: "100%", padding: "20px" }}>
                <RegisterForms userType="organizer" />
            </div>
        </div>
    );
}
