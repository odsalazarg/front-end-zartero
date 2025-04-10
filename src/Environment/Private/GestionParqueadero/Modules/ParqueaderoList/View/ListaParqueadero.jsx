import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card } from '../Components'
import { Alert } from '../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../Components/Loading';

function ListaParqueadero({setIdEditGestion,renderizarLista,setRenderizarLista,IdEditGestion}) {
    const alerta=new Alert()
    const [Data, setData] = useState([])
    const [IdEditList, setIdEditList] = useState(0)
    const [LoadingState, setLoadingState] = useState(false)

    const queryEffect=()=>{
        console.log('queryefect LIST')
        // setLoadingState(true)
        axios.get('http://localhost:3000/Api/Parqueaderos', {
            
            })
            .then(function (response) {
            // setTimeout(() => {
                console.log(response.data);
                if(response.data.status===1){
                    setData(response.data.data)
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
        queryEffect()
        setRenderizarLista(false)
        }
    }, [renderizarLista])

  return (
    <div>
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>PARQUEADEROS</div>
        {
          LoadingState?
          <Loading/>
          :''
        }
        {
            Data.length>0?

                <Card titulos={[
                    // { field: 'status', headerName: 'status' },
                    { field: 'Numero', headerName: 'Numero' },
                    { field: 'Capacidad Autos', headerName: 'Capacidad Autos' },
                    { field: 'Capacidad Motos', headerName: 'Capacidad Motos' },
                    { field: 'Apartamento', headerName: 'Torre' },
                    { field: 'Apartamento', headerName: 'Apartamento' },
                    // { field: 'id', headerName: 'id' },
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

export default ListaParqueadero