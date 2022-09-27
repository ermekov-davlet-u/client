import { IJournal } from "../models/student";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface IEducShSliceType{
    journal: IJournal[]
}

const initialState: IEducShSliceType = {
    journal: []
}

const journalSlice = createSlice({
    name: "journal",
    initialState,
    reducers: {
        newJournal: (state: IEducShSliceType, action: PayloadAction<IJournal[]>) => {
            state.journal = action.payload;
        }
    }
})

export const { newJournal } = journalSlice.actions

export default journalSlice.reducer