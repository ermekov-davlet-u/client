import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEstCinfig, IMarks } from "../models/directory";



interface IStydentGrade{
    estConfig: IEstCinfig[]
    marks: IMarks[]
    canChangeDopusk: boolean
}

const initialState: IStydentGrade = {
    estConfig: [],
    marks: [],
    canChangeDopusk: false
} 

const studentGradeSlice =  createSlice({
    name: "studentGrade",
    initialState,
    reducers: {
        newEstConfig( state: IStydentGrade, action: PayloadAction<IEstCinfig[]> ){
            state.estConfig = action.payload
        },
        newMarks( state: IStydentGrade, action: PayloadAction<IMarks[]> ){
            state.marks = action.payload
        },
        newCanChangeDopusk(state: IStydentGrade, action: PayloadAction<boolean>){
            state.canChangeDopusk = action.payload
        }
    }
})

export const { newEstConfig, newMarks, newCanChangeDopusk } = studentGradeSlice.actions

export default studentGradeSlice.reducer