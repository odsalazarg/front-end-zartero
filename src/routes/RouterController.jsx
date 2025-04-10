import { HashRouter as BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
// import { Login } from "../views";
import { AuthGuard } from "../guards";
import React from "react";
import { PrivateRoutes } from "./routeList";
import PrivateRouterController from "./PrivateRouterController";
import PublicRouterController from "./PublicRouterController";
import { useEffect } from "react";
import { updateMac } from "../redux/states/mac";
import { useSelector } from "react-redux"
import { resetUser } from "../redux/states/user";
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { createMac } from "../redux/states/mac";
import { useNavigate } from "react-router-dom";

function RouterController() {
    const dispatch=useDispatch();
      // const navigate = useNavigate();
  const userState=useSelector((store)=>store.user);
  const macState=useSelector((store)=>store.mac);
  const macOFFState=useSelector((store)=>store.macOFF);

  

  const MacPropia=()=>{
    console.log(userState)
    dispatch(resetUser())
    axios.get('http://localhost:3000/Api/MacPc', {
    })
    .then(function (response) {
      console.log(response.data);
      console.log(macState)
      console.log(macOFFState)
      if(response.data.status===1){ 
        
          // if(macState.mac===''){ 
            // alert(response.data.mac)
            dispatch(createMac({mac:response.data.mac,licencia:true}))



            // console.log(macState)
          // }
          // LicenciaMAC()
          
      }else{
        console.log(response.data.msg)
        console.log(response.data.error)
      }
        
    })
    .catch(function (error) {
    console.log(error);
    
    })
  }

  useEffect(() => {
    
    // alert(macState)
    console.log(macState,'--- ----------------------------MAC')
    // alert('app.jsx')
    MacPropia()
  }, [])


  return (
    <>
      <BrowserRouter>
        <Routes>
        
          <Route path={"*"} element={<PublicRouterController/>} />
          <Route element={<AuthGuard />}>
            
            <Route path={`${PrivateRoutes.PRIVATE}/*`} element={<PrivateRouterController/>} />
            
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default RouterController;
