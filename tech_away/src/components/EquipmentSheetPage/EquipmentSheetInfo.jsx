import React, { useEffect } from 'react'
import { Stack } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import Icon from '../svg/Icon';

export default function EquipmentSheetInfo({equipmentInfo}) {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);  // Volta para a página anterior
    };

    return (
    <Stack direction='horizontal' className="rounded-sm p-4 w-100" style={{backgroundColor:"var(--white)"}} gap={4}>
        <Link onClick={handleGoBack} style={{cursor: 'pointer', backgroundColor: "var(--variant-one)"}} className='rounded-5 p-2 d-flex justify-content-center align-items-center align-self-start'>
            <Icon d={"M25.3761 9.49597H1.37305M1.37305 9.49597L10.6646 17.1333M1.37305 9.49597L10.6646 1.85863"}
            w={"27"} h={"19"} color={"var(--dark-grey)"}/>
        </Link>
        <Stack direction='vertical' gap={3}>
            <h3 style={{
                color:"var(--variant-one)"
            }} className='fs-3'>{equipmentInfo?.EquipmentModel?.name}</h3>
            <span style={{color:"var(--dark-grey"}}>
               <p className='m-0 fs-5'>Retail Price: {equipmentInfo?.EquipmentModel?.price} EUR</p> 
               <p className='m-0 fs-5'>Brand: {equipmentInfo?.EquipmentModel?.Brand?.name}</p> 
               <p className='m-0 fs-5'>Release Year: {equipmentInfo?.EquipmentModel?.releaseYear}</p> 
               <p className='m-0 fs-5'>Type: {equipmentInfo?.EquipmentType?.name}</p> 
            </span>
            
        </Stack>
    </Stack>
    )
}
