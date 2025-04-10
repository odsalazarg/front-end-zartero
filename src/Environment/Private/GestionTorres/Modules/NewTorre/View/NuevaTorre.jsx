import React from 'react'
import { Card } from '../Components'

function NuevaTorre({renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>CREAR TORRE</div>
        <Card renderizarLista={renderizarLista}/>
    </div>
  )
}

export default NuevaTorre