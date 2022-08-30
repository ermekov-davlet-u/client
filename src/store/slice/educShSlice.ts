import { IEducSh } from "../models/student";
import { createSlice, PayloadAction } from '@reduxjs/toolkit';



interface IEducShSliceType{
    educSh: IEducSh[]
}

const initialState: IEducShSliceType = {
    educSh: []
}

const educShSlice = createSlice({
    name: "educSh",
    initialState,
    reducers: {
        newEducSh: (state: IEducShSliceType, action: PayloadAction<IEducSh[]>) => {
            state.educSh = action.payload;
        }
    }
})

export const { newEducSh } = educShSlice.actions

export default educShSlice.reducer