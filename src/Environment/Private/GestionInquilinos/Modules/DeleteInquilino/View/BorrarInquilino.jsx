import React, { useState } from 'react'
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../../../../../../Components/Loading';
import { Alert } from '../../../../../../Components/Alerts/Alerts';

function BorrarInquilino({Id,setIdEditGestion,renderizarLista}) {
    const [LoadingState, setLoadingState] = useState(false)
        
    const alerta=new Alert()
    const queryBorrar=()=>{
        // setLoadingState(true)
        axios.post('http://localhost:3000/Api/Residente-Delete', {
            Id: Id,
        })
        .then(function (response) {
        console.log(response.data);
            if(response.data.status===1){
                // setTimeout(() => {
                    // setLoadingState(false)
                    setIdEditGestion(0)
                    renderizarLista(true)
                    // setTimeout(() => {
                        alerta.Success()
                    // }, 1300);
                // }, 1000);
                
            }else{
                // setTimeout(() => {
                    // setLoadingState(false)
                    // setTimeout(() => {
                        alerta.Error({texto:response.data.msg})
                    // }, 300);
                // }, 1000);
            }
        })
        .catch(function (error) {
        console.log(error);
        alerta.ErrorSistem()
        })
    }


    const BorrarItem=()=>{
        alerta.Delete(()=>queryBorrar())
    }

    useEffect(() => {
        console.log(Id)
    }, [Id])
    
  return (
    <div>
        {
            LoadingState?
            <Loading/>
            :''
        }
        <Button variant="contained" color='error' onClick={BorrarItem}><DeleteForeverIcon/></Button>

    </div>
  )
}

export default BorrarInquilino