import React from 'react'
import { Card } from '../Components'

function NuevaAla({renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>NUEVA ALA</div>
        <Card renderizarLista={renderizarLista}/>
    </div>
  )
}

export default NuevaAla