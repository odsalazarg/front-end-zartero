import React from 'react'
import { Card } from '../Components/Card'

function EditarUsuario({IdEditGestion,setIdEditGestion,renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>EDITAR USUARIO </div>
        <Card IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
    </div>
  )
}

export default EditarUsuario