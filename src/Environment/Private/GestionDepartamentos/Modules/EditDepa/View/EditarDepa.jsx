import React from 'react'
import { Card } from '../Components'

function EditarDepa({IdEditGestion,setIdEditGestion,renderizarLista}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>EDITAR APARTAMENTOS</div>
        <Card IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista}/>

    </div>
  )
}

export default EditarDepa