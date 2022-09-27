
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IInitialState {
    diplom: boolean;
    journal: boolean;
} 

const initialState: IInitialState = {
    diplom: false,
    journal: false,
}

const dostupSlice = createSlice({
    name: "dostup",
    initialState,
    reducers: {
        newDiplomDostup: (state, action: PayloadAction<boolean>) =>{
            state.diplom = action.payload;
        },
        newJournalDostup: (state, action: PayloadAction<boolean>) =>{
            state.journal = action.payload;
        },
    }
})

export const { newDiplomDostup, newJournalDostup } = dostupSlice.actions;

export default dostupSlice.reducer