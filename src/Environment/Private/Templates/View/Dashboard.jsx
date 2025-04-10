import React from 'react'
import { Navbar } from '../Components/navbar'

function Dashboard({view}) {
  return (
    <div style={{backgroundColor:'#091435',height:'100%'}}>
        <Navbar view={<div style={{padding:'0px',margin:'0'}}>{view}</div>}/>
        {/* hola */}
        
    </div>
  )
}

export default Dashboard