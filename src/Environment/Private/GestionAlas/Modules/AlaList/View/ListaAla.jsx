import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card } from '../Components'
import { Alert } from '../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../Components/Loading';

function ListaAla({setIdEditGestion,renderizarLista,setRenderizarLista,IdEditGestion}) {

    const alerta=new Alert()
    const [Data, setData] = useState([])
    const [IdEditList, setIdEditList] = useState(0)
    const [LoadingState, setLoadingState] = useState(false)
    
    const queryEffect=()=>{
        console.log('queryefect LIST')
        setLoadingState(true)
        axios.get('http://localhost:3000/Api/Alas', {
            
            })
            .then(function (response) {
            setTimeout(() => {
                console.log(response.data.data);
                const arr=[]
                for (let i = 0; i < response.data.data.length; i++) {
                    const item = response.data.data[i];
                    const obj={
                        id:item.alas_id,
                        nombre:item.alas_nombre,
                        torre:item.torre_nombre,
                        status:item.alas_status,
                        id_torre:item.torre_id,
                    }
                    arr.push(obj)
                    //voy por aqui,revisa bien le llenado y lo que necesitas para editar alas,necesitas el id de torres,mosca..
                }
                setData(arr)
                setLoadingState(false)
            }, 1000);
            
            })
            .catch(function (error) {
            console.log(error);
            alerta.ErrorSistem()
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
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>ALAS</div>
        {
          LoadingState?
          <Loading/>
          :''
        }
        {
            Data.length>0?

                <Card titulos={[
                    { field: 'status', headerName: 'status' },
                    { field: 'ala', headerName: 'Ala' },
                    { field: 'torre', headerName: 'Torre' },
                    { field: 'id', headerName: 'id' },
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
            :''
        }
        
    </div>
  )
}

export default ListaAla