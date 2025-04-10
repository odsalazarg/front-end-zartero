import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card } from '../Components'
import { Alert } from '../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../Components/Loading';

function ListaInquilino({setIdEditGestion,renderizarLista,setRenderizarLista,IdEditGestion}) {

    const alerta=new Alert()
    const [Data, setData] = useState([])
    const [IdEditList, setIdEditList] = useState(0)
    const [LoadingState, setLoadingState] = useState(false)

    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        axios.get('http://localhost:3000/Api/Residentes', {
            
            }) 
            .then(function (response) {
            // setTimeout(() => {
                console.log(response.data);
                if(response.data.status===1){
                    setData(response.data.data)
                }else{
                    setData([])
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

    useEffect(() => {
        // console.log("use efect re-render list")
        if(renderizarLista){
        // console.log("IF use efect re-render list")
        setData([])
        setTimeout(() => {
            queryEffect()
        }, 500);
        setRenderizarLista(false)
        }
    }, [renderizarLista])

  return (
    <div>
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>RESIDENTES</div>
        {
          LoadingState?
          <Loading/>
          :''
        }
        {
            Data.length>0?

                <Card titulos={[
                    // { field: 'status', headerName: 'status' },
                    { field: 'Apartamento', headerName: 'Apartamento' },
                    { field: 'Nombre', headerName: 'Nombre' },
                    { field: 'Apellido', headerName: 'Apellido' },
                    { field: 'Telefono', headerName: 'Telefono' },
                    { field: 'Telefono-2', headerName: 'Telf-2' },
                    { field: 'Correo', headerName: 'Correo' },
                    { field: 'Tipo', headerName: 'Tipo' },
                ]}
                  data={Data}
                  setIdEditList={setIdEditGestion}
                  IdEditGestion={IdEditGestion}
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
            <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
                <b>
                SIN RESULTADOS
                </b>
            </div>
        }
        
    </div>
  )
}

export default ListaInquilino