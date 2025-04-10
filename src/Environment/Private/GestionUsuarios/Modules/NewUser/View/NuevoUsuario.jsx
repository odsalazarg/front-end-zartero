import React from 'react'
import { Card } from '../Components'

function NuevoUsuario({renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0',width:'100%'}}>CREAR USUARIO</div>
        <Card renderizarLista={renderizarLista}/>
    </div>
  )
}

export default NuevoUsuario