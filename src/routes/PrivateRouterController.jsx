import React from "react";
import { PrivateRoutes } from "./routeList";
import { Navigate, Route, Routes } from "react-router-dom";
import {Home} from '../Environment/Private/Home/View'
import {Dashboard} from '../Environment/Private/Templates/View'
import { GestionUser } from "../Environment/Private/GestionUsuarios/View";
import { GestionEdif } from "../Environment/Private/GestionTorres/View";
import { GestionDepa } from "../Environment/Private/GestionDepartamentos/View";
import { GestionAla } from "../Environment/Private/GestionAlas/View";
import { GestionInqui } from "../Environment/Private/GestionInquilinos/View";
import { GestionParking } from "../Environment/Private/GestionParqueadero/View";
import { Operarios } from "../Environment/Private/Operario/View";
import { GestionVehiculo } from "../Environment/Private/GestionVehiculos/View";
import VGrafica from '../Environment/Private/VistaGrafica/View/VGrafica'
import {default as InformeTabla} from '../Environment/Private/Informes/View/Informes'
import {default as MarcaBlanca} from '../Environment/Private/MarcaBlanca/View/MarcaBlanca'
import {default as MarcaUnidad} from '../Environment/Private/MarcaUnidad/view/MarcaUnidad'
import {default as GestionLicencias} from '../Environment/Private/GestionLicencias/View/GestionLicencias'
// import { Home} from "../views"

function PrivateRouterController() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to={PrivateRoutes.HOME} />} />
        <Route path={PrivateRoutes.HOME} element={<Dashboard view={<Home/>}/>} />
        <Route path={PrivateRoutes.GESTION_USUARIOS} element={<Dashboard view={<GestionUser/>}/>} />
        <Route path={PrivateRoutes.GESTION_TORRES} element={<Dashboard view={<GestionEdif/>}/>} />
        <Route path={PrivateRoutes.GESTION_DEPARTAMENTOS} element={<Dashboard view={<GestionDepa/>}/>} />
        <Route path={PrivateRoutes.GESTION_ALAS} element={<Dashboard view={<GestionAla/>}/>} />
        <Route path={PrivateRoutes.OPERARIO} element={<Dashboard view={<Operarios/>}/>} />
        <Route path={PrivateRoutes.GESTION_PARQUEADEROS} element={<Dashboard view={<GestionParking/>}/>} />
        <Route path={PrivateRoutes.GESTION_INQUILINOS} element={<Dashboard view={<GestionInqui/>}/>} />
        <Route path={PrivateRoutes.GESTION_VEHICULOS} element={<Dashboard view={<GestionVehiculo/>}/>} />
        <Route path={PrivateRoutes.VGRAFICA} element={<Dashboard view={<VGrafica/>}/>} />
        <Route path={PrivateRoutes.INFORMES} element={<Dashboard view={<InformeTabla/>}/>} />
        <Route path={PrivateRoutes.MARCABLANCA} element={<Dashboard view={<MarcaBlanca/>}/>} />
        <Route path={PrivateRoutes.MARCAUNIDAD} element={<Dashboard view={<MarcaUnidad/>}/>} />
        <Route path={PrivateRoutes.GESTION_LICENCIAS} element={<Dashboard view={<GestionLicencias/>}/>} />
        {/* <Route path={PrivateRoutes.PERFIL} element={<Dashboard view={<UserInfo/>}/>} /> */}
        <Route path="*" element={<>PRIVATE / 404</> } />
      </Routes>
    </>
  );
}

export default PrivateRouterController;
