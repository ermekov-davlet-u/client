import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IUniversalSelectType } from "../models/directory";



interface IEducShSliceType{
    kvalification: IUniversalSelectType[]
    diplomGroup: IUniversalSelectType[]
}

const initialState: IEducShSliceType = {
    kvalification: [],
    diplomGroup: []

}

const kvalificationSlice = createSlice({
    name: "kvalification",
    initialState,
    reducers: {
        newKvalification: (state: IEducShSliceType, action: PayloadAction<IUniversalSelectType[]>) => {
            state.kvalification = action.payload;
        },
        newDiplomGroup: (state: IEducShSliceType, action: PayloadAction<IUniversalSelectType[]>) => {
            state.diplomGroup = action.payload;
        },
    }
})

export const { newKvalification, newDiplomGroup } = kvalificationSlice.actions

export default kvalificationSlice.reducer