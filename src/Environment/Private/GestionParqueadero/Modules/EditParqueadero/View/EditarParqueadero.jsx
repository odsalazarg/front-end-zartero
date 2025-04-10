import React from 'react'
import { Card } from '../Components'

function EditarParqueadero({IdEditGestion,setIdEditGestion,renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>EDITAR PARQUEADERO</div>
        <Card IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>
    </div>
  )
}

export default EditarParqueadero