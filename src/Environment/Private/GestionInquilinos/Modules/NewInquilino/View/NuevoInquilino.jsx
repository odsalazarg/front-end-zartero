import React from 'react'
import { Card } from '../Components'

function NuevoInquilino({renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>NUEVO RESIDENTE</div>
        <Card renderizarLista={renderizarLista}/>
    </div>
  )
}

export default NuevoInquilino