import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUniversalSelectType } from './../models/directory';



    interface IInitialState {
      students: IUniversalSelectType[]
      idGroup: IUniversalSelectType
    } 

    const initialState: IInitialState = {
        students: [],
        idGroup: { value:0,label: "Не выбрано"}
    }
  
  export const studentSlice = createSlice({
    name: 'students',
    initialState,
    reducers: {
      newStudents: (state: IInitialState, action: PayloadAction<IUniversalSelectType[]> ) => {
        state.students = action.payload
      },
      newGroupId: (state: IInitialState, action: PayloadAction<IUniversalSelectType>) => {
        state.idGroup = action.payload
      }
    }
  })
  
  export const { 
        newStudents,
        newGroupId
    } = studentSlice.actions
  

  
  export default studentSlice.reducer