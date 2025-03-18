import React, { useEffect, useState } from 'react'
import { Container, Image, Stack } from 'react-bootstrap';
import { useLocation } from "react-router-dom";

import api from "../utils/axios";
import EquipmentSheetInfo from '../components/EquipmentSheetPage/EquipmentSheetInfo';

export default function EquipmentSheetPage() {
    const location = useLocation();
    const barcode = location.state?.barcode; 

    const [equipmentSheet, setEquipmentSheet] = useState({});
    const [refresh, setRefresh] = useState(false);

    const [usedEquipmentList, setUsedEquipmentList] = useState({});

    const handleRefresh = () => {
		setRefresh(!refresh);
	};

    useEffect(() => {
        console.log(`api/equipmentSheet/${barcode}`);
        
        api.get(`api/equipmentSheet/${barcode}`).then((res) =>{
            setEquipmentSheet(res.data.equipmentSheet)
        }).catch((error) => {
            console.error("API error:", error.message);
        });
    }, [refresh])

    useEffect(() => {
        api.get(`api/usedEquipment/${barcode}`).then((res) => {
            setUsedEquipmentList(res.data.usedEquipments)
        }).catch((error) => {
            console.error("API error:", error.message);
        });
    }, [refresh])

    useEffect(() => {
        console.log(equipmentSheet);
        // console.log(usedEquipmentList);
        
    }, [equipmentSheet, usedEquipmentList])

    return (
        <Container>
            <Stack direction='horizontal' gap={3}>
                <EquipmentSheetInfo equipmentInfo={equipmentSheet}/>

                {/* Esta imagem é para ser substituida pelo mapa interarivo */}
                <Image src="../../public/assets/mapa.png" className="rounded-sm"/>
            </Stack>
        </Container>
    
  )
}
