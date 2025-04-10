import React from 'react'
import { Card } from '../Components/Card'

function NuevoDepa({renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>NUEVO APARTAMENTO</div>
        <Card renderizarLista={renderizarLista}/>
    </div>
  )
}

export default NuevoDepa