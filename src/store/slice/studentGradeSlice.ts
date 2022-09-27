import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IEstCinfig, IMarks } from "../models/directory";



interface IStydentGrade{
    estConfig: IEstCinfig[]
    marks: IMarks[]
    canChangeDopusk: boolean;
    canaccessfest: number
    photo: string;
}

const initialState: IStydentGrade = {
    estConfig: [],
    marks: [],
    canChangeDopusk: false,
    canaccessfest: 1,
    photo: "",
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
        },
        newCanaccessfest: (state: IStydentGrade, action: PayloadAction<number>) => {
            state.canaccessfest = action.payload
        },
        newStudPhoto: (state: IStydentGrade, action: PayloadAction<string>) => {
            state.photo = action.payload
        }
    }
})

export const { newEstConfig, newMarks, newCanChangeDopusk, newCanaccessfest, newStudPhoto } = studentGradeSlice.actions

export default studentGradeSlice.reducer