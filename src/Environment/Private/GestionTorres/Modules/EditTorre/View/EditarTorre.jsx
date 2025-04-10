import React from 'react'
import { Card } from '../Components/Card'

function EditarTorre({IdEditGestion,setIdEditGestion,renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>EDITAR TORRE</div>
        <Card IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
    </div>
  )
}

export default EditarTorre