
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IDiplom } from '../models/student';

interface IInitialState {
    diplom: IDiplom[]
} 

const initialState: IInitialState = {
    diplom: []
}

const diplomSlice = createSlice({
    name: "diplom",
    initialState,
    reducers: {
        newDiplom: (state, action: PayloadAction<IDiplom[]>) =>{
            state.diplom = action.payload;
        }
    }
})

export const { newDiplom } = diplomSlice.actions;

export default diplomSlice.reducer