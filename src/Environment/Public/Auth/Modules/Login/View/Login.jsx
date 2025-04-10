import React, { useState, useEffect, useRef } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createUser } from '../../../../../../redux/states/user';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInputRef = useRef(null);
  const passwordInputRef = useRef(null);
  
  const [formData, setFormData] = useState({
    password: '',
    user: ''
  });
  
  const [errorMessage, setErrorMessage] = useState('');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleInputFocus = () => {
    setErrorMessage('');
  };

  const resetForm = () => {
    setFormData({ password: '', user: '' });
    setTimeout(() => {
      if (userInputRef.current) {
        userInputRef.current.focus();
      }
    }, 2000);
  };

  const handleOperarioLogin = async (userId) => {
    try {
      const response = await axios.post('http://localhost:3000/Api/operario-inicioSesion', {
        IdUser: userId
      });
      
      if (response.data.status === 1) {
        navigate("/private");
      } else {
        setErrorMessage(response.data.msg);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Error de conexión');
      resetForm();
    }
  };

  const Loguear = async () => {
    try {
      const response = await axios.post('http://localhost:3000/Auth/Login', {
        user: formData.user,
        password: formData.password
      });

      if (response.data.status === 1) {
        dispatch(createUser({
          userName: response.data.user,
          token: response.data.accessToken,
          id: response.data.id
        }));
        await handleOperarioLogin(response.data.id);
      } else {
        setErrorMessage(response.data.msg);
        resetForm();
      }
    } catch (error) {
      console.log(error);
      setErrorMessage('Error de conexión');
      resetForm();
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      const loginButton = document.getElementById('login-btn');
      if (loginButton) {
        loginButton.click();
      }
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    if (userInputRef.current) {
      userInputRef.current.focus();
    }
    
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, []);

  return (
    <div style={{height:'400px', backgroundColor:'white', width:'300px', borderRadius:'5px', padding:'20px 10px', position: 'relative'}}>
      {errorMessage && (
        <div 
          style={{
            position: 'absolute',
            top: '10px',
            left: '10px',
            right: '10px',
            backgroundColor: '#ffebee',
            color: '#c62828',
            padding: '10px',
            borderRadius: '4px',
            border: '1px solid #ef9a9a',
            textAlign: 'center',
            zIndex: 1000
          }}
        >
          {errorMessage}
        </div>
      )}
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <span style={{fontSize:'30px'}}>Iniciar Sesion</span>
      </div>
      <br /><br />
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <TextField 
          inputRef={userInputRef}
          name="user"
          value={formData.user}
          label="Usuario"
          variant="outlined"
          style={{width:'80%'}}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoComplete="off"
        />
      </div>
      <br />
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <TextField 
          inputRef={passwordInputRef}
          name="password"
          value={formData.password}
          label="Contraseña"
          type="password"
          variant="outlined"
          style={{width:'80%'}}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          autoComplete="off"
        />
      </div>
      <br />
      <div style={{display:'flex', justifyContent:'center', alignItems:'center'}}>
        <Button 
          id='login-btn'
          variant="contained"
          style={{width:'80%', backgroundColor:'green'}}
          onClick={Loguear}
        >
          Iniciar sesion
        </Button>
      </div>
      <br />
      <div style={{display:'flex', justifyContent:'left', alignItems:'center', marginLeft:'30px', cursor:'pointer'}}>
        {/* <u onClick={navegarRegistro}>Registrarse</u> */}
      </div>
    </div>
  );
}

export default Login;