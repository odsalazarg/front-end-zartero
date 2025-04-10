import { createSlice } from "@reduxjs/toolkit";
export const EmptyMacState={
    mac:'aaa',
    licencia:false
}

const setMacLocalStorage=(data)=>{
    localStorage.setItem('mac',JSON.stringify(data))
}

const removeMacLocalStorage=()=>{
    localStorage.removeItem('mac')
}


export const macSlice = createSlice({
    name:"mac",
    initialState:localStorage.getItem('mac')?JSON.parse(localStorage.getItem('mac')):EmptyMacState,
    reducers:{
        createMac:(state,action)=>{
            // console.log(state,action)
            setMacLocalStorage(action.payload)
            return action.payload;
        },
        updateMac:(state,action)=>{
            const result={...state,...action.payload}
            return result;
        },
        resetMac:()=>{
            removeMacLocalStorage()
            return EmptyMacState;
        }
    }
})

export const {createMac,updateMac,resetMac}=macSlice.actions;

export default macSlice.reducer;