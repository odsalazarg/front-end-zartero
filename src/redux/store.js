import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./states/user";
import  macReducer  from "./states/mac";
import macOFFreducer from './states/mac_OFFLINE'



export default configureStore({
    reducer:{
        user:userReducer,
        mac:macReducer,
        macOFF:macOFFreducer
    },
})