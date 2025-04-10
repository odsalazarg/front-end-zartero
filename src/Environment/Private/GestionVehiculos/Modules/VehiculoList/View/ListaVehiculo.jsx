import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Card } from '../Components';
import { Alert } from '../../../../../../Components/Alerts/Alerts';
import { Loading } from '../../../../../../Components/Loading';


function ListaVehiculos({setIdEditGestion,renderizarLista,setRenderizarLista,IdEditGestion,IdTorre=false,IdApto=false,editarAccion=false}) {
    const alerta=new Alert()
    const [Users, setUsers] = useState([])
    const [IdEditList, setIdEditList] = useState(0)
    const [LoadingState, setLoadingState] = useState(false)

    
    const queryEffect=()=>{
      console.log('queryefect LIST')
      // setLoadingState(true)
        axios.get('http://localhost:3000/Api/Vehiculos', {
            
          })
          .then(function (response) {
            // setTimeout(() => {
              if(response.data.status===1){
                console.log(response.data);
                if(response.data.data.length>0){
                  let arr=[]
                  for (let i = 0; i < response.data.data.length; i++) {
                      const item = response.data.data[i];
                      const obj={
                          vehiculo_status:item.vehiculo_status,
                          vehiculo_id:item.vehiculo_id,
                          vehiculo_placa:item.vehiculo_placa,
                          vehiculo_tipo:item.vehiculo_tipo===1?"Carro":"Moto",
                          apto_id:item.apto_id,
                          apto_numero:item.apto_numero,
                          torre_id:item.torre_id,
                          torre_nombre:item.torre_nombre
                      }
                      arr.push(obj)
  
                  }
  
                  setUsers(arr)
                }
              }
              // setLoadingState(false)
            // }, 1000);
            
          }) 
          .catch(function (error) {
            console.log(error);
            // alerta.ErrorSistem()
          })
    }

    const queryEffectByAPto=(IdApto)=>{
      console.log('queryefect LIST')
      // setLoadingState(true)
        axios.post('http://localhost:3000/Api/Vehiculo-ByIdApto', {
          IdApto:IdApto
          })
          .then(function (response) {
            // setTimeout(() => {
              if(response.data.status===1){
                console.log(response.data);
                if(response.data.data.length>0){
                  let arr=[]
                  for (let i = 0; i < response.data.data.length; i++) {
                      const item = response.data.data[i];
                      const obj={
                          vehiculo_status:item.vehiculo_status,
                          vehiculo_id:item.vehiculo_id,
                          vehiculo_placa:item.vehiculo_placa,
                          vehiculo_tipo:item.vehiculo_tipo===1?"Carro":"Moto",
                          apto_id:item.apto_id,
                          apto_numero:item.apto_numero,
                          torre_id:item.torre_id,
                          torre_nombre:item.torre_nombre
                      }
                      arr.push(obj)
  
                  }
  
                  setUsers(arr)
                }
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
      // console.log("use efect re-render list")
      if(renderizarLista){
        // console.log("IF use efect re-render list")
        setUsers([])
        setTimeout(() => {
          if(IdApto!=false){
            queryEffectByAPto(IdApto)
            console.log(IdApto)
          }else{
            queryEffect()
          }
        }, 500);
        setRenderizarLista(false)
      }
    }, [renderizarLista])
    

    useEffect(() => {
      
      if(IdApto!=false){
        queryEffectByAPto(IdApto)
        console.log(IdApto)
      }else{
        queryEffect()
      }

    }, [IdApto])
    

    
    
    

  return (
    <div>
        
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>VEHICULOS</div>
        {
          LoadingState?
          <Loading/>
          :''
        }
        {
            Users.length>0?

                IdApto!=false?
                  <Card titulos={[
                    // { field: 'status', headerName: 'status' },
                    { field: 'username', headerName: 'Placa' },
                    { field: 'nombre', headerName: 'Tipo' },
                    { field: 'apellido', headerName: 'Torre' },
                    { field: 'cedula', headerName: 'Apto' },
                    { field: 'acciones', headerName: 'Acciones' },
                    // { field: 'password', headerName: 'Password' },
                  ]}
                    data={Users}
                    setIdEditList={setIdEditGestion}
                    IdEditGestion={IdEditGestion}
                    renderizarLista={setRenderizarLista}
                    acciones={true}
                    editarAccion={editarAccion}
                  />
                  :
                  <Card titulos={[
                    // { field: 'status', headerName: 'status' },
                    { field: 'username', headerName: 'Placa' },
                    { field: 'nombre', headerName: 'Tipo' },
                    { field: 'apellido', headerName: 'Torre' },
                    { field: 'cedula', headerName: 'Apto' },
                    // { field: 'telefono', headerName: 'Telefono' },
                    // { field: 'password', headerName: 'Password' },
                  ]}
                    data={Users}
                    setIdEditList={setIdEditGestion}
                    IdEditGestion={IdEditGestion}
                    acciones={false}
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

export default ListaVehiculos