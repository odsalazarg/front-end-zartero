import React from 'react'
import { Card } from '../Components'

function EditarDepa({IdEditGestion,setIdEditGestion,renderizarLista,setModal=false}) {
  return (
    <div>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',margin:'20px 0'}}>EDITAR VEHICULO</div>
        <Card IdEditGestion={IdEditGestion} setIdEditGestion={setIdEditGestion} renderizarLista={renderizarLista} setModal={setModal}/>

    </div>
  )
}

export default EditarDepa