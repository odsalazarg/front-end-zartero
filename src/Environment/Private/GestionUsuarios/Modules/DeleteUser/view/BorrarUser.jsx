import React, { useState } from 'react'
import Button from '@mui/material/Button';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { useEffect } from 'react';
import axios from 'axios';
import { Loading } from '../../../../../../Components/Loading';
import { Alert } from '../../../../../../Components/Alerts/Alerts';

function BorrarUser({Id,setIdEditGestion,renderizarLista}) {
    const [LoadingState, setLoadingState] = useState(false)

    const alerta=new Alert()
    const queryBorrar=()=>{
        
        axios.post('http://localhost:3000/Api/User-Delete', {
            Id: Id,
        })
        .then(function (response) {
        console.log(response.data);
            if(response.data.status===1){

                setIdEditGestion(0)
                renderizarLista(true)
                alerta.Success()
                
            }else{

                alerta.Error({texto:response.data.msg})
            }
        })
        .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
        })
    }


    const borrarUser=()=>{
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
        <Button variant="contained" color='error' onClick={borrarUser}><DeleteForeverIcon/></Button>
    </div>
  )
}

export default BorrarUser