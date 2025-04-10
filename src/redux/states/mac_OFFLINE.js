import { createSlice } from "@reduxjs/toolkit";
export const EmptyMacOFFState={
    mac:'aaa',
    licencia:false,
    fecha:'2025-02-05'
}

const setMacOFFLocalStorage=(data)=>{
    localStorage.setItem('macOFF',JSON.stringify(data))
}

const removeMacOFFLocalStorage=()=>{
    localStorage.removeItem('macOFF')
}


export const macOFFSlice = createSlice({
    name:"macOFF",
    initialState:localStorage.getItem('macOFF')?JSON.parse(localStorage.getItem('macOFF')):EmptyMacOFFState,
    reducers:{
        createMacOFF:(state,action)=>{
            // console.log(state,action)
            setMacOFFLocalStorage(action.payload)
            return action.payload;
        },
        updateMacOFF:(state,action)=>{
            const result={...state,...action.payload}
            return result;
        },
        resetMacOFF:()=>{
            removeMacOFFLocalStorage()
            return EmptyMacOFFState;
        }
    }
})

export const {createMacOFF,updateMacOFF,resetMacOFF}=macOFFSlice.actions;

export default macOFFSlice.reducer;