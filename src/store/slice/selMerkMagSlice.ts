
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ISelMarkMag } from '../models/student';

interface IInitialState {
    selMarkMag: ISelMarkMag[]
} 

const initialState: IInitialState = {
    selMarkMag: []
}

const selMarkMagSlice = createSlice({
    name: "selMarkMag",
    initialState,
    reducers: {
        newSelMarkMag: (state, action: PayloadAction<ISelMarkMag[]>) =>{
            state.selMarkMag = action.payload;
        }
    }
})

export const { newSelMarkMag } = selMarkMagSlice.actions;

export default selMarkMagSlice.reducer