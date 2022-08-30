import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUniversalSelectType } from './../models/directory';
import { IStudentGrade } from './../models/student';



    interface IInitialState {
      students: IStudentGrade[]
      statements: IUniversalSelectType[],
      semesters: IUniversalSelectType[],
      estimation: IUniversalSelectType[],
      disciplines: IUniversalSelectType[],
      formControls: IUniversalSelectType[],
    } 

    const initialState: IInitialState = {
        students: [],
        statements: [],
        semesters: [],
        estimation: [],
        disciplines: [],
        formControls: [],
    }
  
  export const studentMarkSlice = createSlice({
    name: 'studentMarks',
    initialState,
    reducers: {
      newStudentMarks: (state, action: PayloadAction<IStudentGrade[]> ) => {
        state.students = action.payload
      },
      newSemestersMarks: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.semesters = action.payload
      },
      newStatmentsMarks: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.statements = action.payload
      },
      newEstimationMarks: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.estimation = action.payload
      },
      newDisciplineMarks: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.disciplines = action.payload
      },
      newFormControlsMarks: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.formControls = action.payload
      }
    }
  })
  
  export const { 
        newStudentMarks,
        newSemestersMarks,
        newStatmentsMarks,
        newEstimationMarks,
        newDisciplineMarks,
        newFormControlsMarks
    } = studentMarkSlice.actions
  

  
  export default studentMarkSlice.reducer