import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    pharmacies: {},
}

const pharmaciesSlice = createSlice({
    name: 'pharmacies',
    initialState,
    reducers: {
    
        setPharmacies: (state, action) => {
            state.pharmacies = action.payload;
        },

    }
})

export const {setPharmacies} = pharmaciesSlice.actions;
export default pharmaciesSlice.reducer