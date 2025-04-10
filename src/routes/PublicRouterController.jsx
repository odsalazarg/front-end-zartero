import React from "react";
import { PrivateRoutes, PublicRoutes } from "./routeList";
import { Navigate, Route, Routes } from "react-router-dom";
import {Login} from '../Environment/Public/Auth/Modules/Login/View'
import {Registro} from "../Environment/Public/Auth/Modules/Registro/View";
import {AuthView} from '../Environment/Public/Auth/View'
// import { Login, Registro } from "../views";


function PublicRouterController() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={PrivateRoutes.PRIVATE} />} />
        
        <Route path={PublicRoutes.LOGIN} element={<AuthView view={<Login />}/>} />
        <Route path={PublicRoutes.REGISTRO} element={<AuthView view={<Registro />}/>}/>

        <Route path="*" element={<>public / 404</> } />
      </Routes>
    </>
  );
}

export default PublicRouterController;
