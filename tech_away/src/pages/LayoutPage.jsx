import React, { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SmNavbar from "../components/Navbar/SmNavbar";
import InitialNavBar from "../components/Navbar/InitialNavBar";
import { Stack } from "react-bootstrap";

const mobileSize = 768;

function LayoutPage() {

    const [isMobile, setIsMobile] = useState(window.innerWidth < mobileSize);

    useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth < mobileSize);
		};

		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

    return (
        <Stack className='vh-100'> 
            <div style={{backgroundColor: "var(--light-grey)", color: "var(--dark-grey)",}}>
                {isMobile ? <SmNavbar /> : <InitialNavBar />}
            </div>
        
            <div className="">
                <Outlet />
            </ div>

        </Stack>
    );
}




export default LayoutPage;
