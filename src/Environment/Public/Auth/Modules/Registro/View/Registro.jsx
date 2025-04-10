import React from 'react'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useState } from 'react';

function Registro() {
  const [Password, setPassword] = useState('')
  const [Password2, setPassword2] = useState('')
  const [User, setUser] = useState('')
  const navigate = useNavigate();
  const navegarLogin=()=>{
    navigate("/login");
  }
  const prueba=()=>{
    console.log('axios')
    console.log(User,Password,Password2)
    if(User!="" && Password!="" && Password2!=""){
      if(Password===Password2){
        
      }
    }
    
  }

  return (
    <div style={{height:'400px',backgroundColor:'white',width:'300px',borderRadius:'5px',padding:'20px 10px'}}>
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <span style={{fontSize:'30px'}}>Registro</span>
      </div>
      <br /><br />
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <TextField id="outlined-basic" label="Usuario" variant="outlined" style={{width:'80%'}} onChange={e=>{setUser(e.target.value)}}/>
      </div>
      <br />
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <TextField id="outlined-basic" label="Contraseña" type="password" variant="outlined" style={{width:'80%'}} onChange={e=>{setPassword(e.target.value)}}/>
      </div>
      <br />
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <TextField id="outlined-basic" label="Repetir Contraseña" type="password" variant="outlined" style={{width:'80%'}} onChange={e=>{setPassword2(e.target.value)}}/>
      </div>
      <br />
      <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Button variant="contained" style={{width:'80%'}} onClick={prueba}>Registrarse</Button>
      </div>
      <br />
      <div style={{display:'flex',justifyContent:'left',alignItems:'center',marginLeft:'30px',cursor:'pointer'}}>
       <u onClick={navegarLogin}>Ya tienes cuenta?</u>
      </div>
      
    </div>
  )
}

export default Registro