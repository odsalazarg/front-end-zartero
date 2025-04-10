import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card } from '../Components';
import { Alert } from '../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../Components/Loading';
import Grid from '@mui/material/Grid';

function Contacto({NombreTorre,NombreApto,setIdTorre,setNombreTorre,setNombreApto,setIdApto,IdDepa}) {

    const alerta=new Alert()
    const [Users, setUsers] = useState([])
    const [IdEditList, setIdEditList] = useState(0)
    const [LoadingState, setLoadingState] = useState(false)

    
    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        axios.get('http://localhost:3000/Api/Contacto', {
            
            })
            .then(function (response) {
            // setTimeout(() => {
                console.log(response.data);
                if(response.data.data.length>0){
                  setUsers(response.data.data)
                }
                // setLoadingState(false)
            // }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
            })
    }

    useEffect(() => {
        queryEffect()
    }, [])
  return (
    <div>
        
        
        {
          LoadingState?
          <Loading/>
          :''
        }
        {
            Users.length>0?

                <Card titulos={[
                    { field: 'nombre', headerName: 'Nombre' },
                    { field: 'apellido', headerName: 'Apellido' },
                    { field: 'Apto', headerName: 'Apto' },
                    { field: 'Torre', headerName: 'Torre' },
                    { field: 'Acciones', headerName: 'Acciones' },
                    // { field: 'telefono', headerName: 'Telefono' },
                    // { field: 'password', headerName: 'Password' },
                ]}
                  data={Users}
                  NombreTorre={NombreTorre}
                  NombreApto={NombreApto}
                  setIdTorre={setIdTorre}
                  setNombreTorre={setNombreTorre}
                  setNombreApto={setNombreApto}
                  setIdApto={setIdApto}
                  IdDepa={IdDepa}
                />

                // <TablaBusc titulos={[
                //     // { field: 'id', headerName: 'ID' },
                //     { field: 'username', headerName: 'Usuario' },
                //     { field: 'password', headerName: 'Password' },
                //     { field: 'nombre', headerName: 'Nombre' },
                //     { field: 'apellido', headerName: 'Apellido' },
                //     { field: 'cedula', headerName: 'Cedula' },
                //     { field: 'telefono', headerName: 'Telefono' },
                // ]}
                //     data={Users}
                // />
            :
            <div style={{margin:'0',backgroundColor:'lightgrey',padding:'20px 20px',borderRadius:'5px',height:'285px',overflowY:'hidden',paddingTop:'40px'}}>
                <Grid item md={12} style={{backgroundColor:''}}>
                    <div style={{display:'flex',justifyContent:'center',alignItems:'center',color:'white'}}>
                        <b>NOT FOUND</b>
                    </div>
                </Grid>
            </div>
            
        }
        
    </div>
  )
}

export default Contacto