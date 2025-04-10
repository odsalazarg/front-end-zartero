import React from 'react'
import { Card } from '../Components'

function NuevoVehiculo({renderizarLista,IdTorreVG=false,IdAptoVG=false,setModal=false}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>NUEVO VEHICULO</div>
        <Card renderizarLista={renderizarLista} IdTorreVG={IdTorreVG} IdAptoVG={IdAptoVG} setModal={setModal}/>
    </div>
  )
}

export default NuevoVehiculo