import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEstCinfig, IMarks, IStundentLogPass } from "../models/directory";



interface IStydentGrade{
    studs: IStundentLogPass[]
}

const initialState: IStydentGrade = {
    studs: []
} 

const studentLogPassSlice =  createSlice({
    name: "studentLogPass",
    initialState,
    reducers: {
        newStudLogPass( state: IStydentGrade, action: PayloadAction<IStundentLogPass[]> ){
            state.studs = action.payload
        },
    },
    extraReducers:{
        
    }
})

export const { newStudLogPass } = studentLogPassSlice.actions

export default studentLogPassSlice.reducer