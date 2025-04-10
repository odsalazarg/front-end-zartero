import React from 'react'
import { Card } from '../Components'

function NuevoParqueadero({renderizarLista}) {
  return (
    <div>
            <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>ASIGNAR PARQUEADERO</div>
            <Card renderizarLista={renderizarLista}/>
        </div>
  )
}

export default NuevoParqueadero