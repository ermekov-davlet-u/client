import { createSlice, PayloadAction } from "@reduxjs/toolkit"
import { IUniversalSelectType, IDisciplinesType, GradeType } from './../models/directory';



    interface IInitialState {
      faculties: IUniversalSelectType[],
      years: IUniversalSelectType[],
      rates: IUniversalSelectType[],
      groups: IUniversalSelectType[],
      semesters: IUniversalSelectType[],
      disciplines: IDisciplinesType[],
      formControls: IUniversalSelectType[],
      estimates: IUniversalSelectType[],
      statements: IUniversalSelectType[],
      grades: GradeType[],
      estOther: IUniversalSelectType[],
      rrnkPermis: IUniversalSelectType[],
      ws: IUniversalSelectType[],
      poleStatement: IUniversalSelectType[],
      educForm: IUniversalSelectType[],
    } 

    const initialState: IInitialState = {
      faculties: [],
      years: [],
      rates: [],
      groups: [],
      semesters: [],
      disciplines: [],
      formControls: [],
      statements: [],
      estimates: [],
      grades: [],
      estOther: [],
      rrnkPermis: [],
      ws: [],
      poleStatement: [],
      educForm: [],
    }
  
  export const counterSlice = createSlice({
    name: 'directory',
    initialState,
    reducers: {
      newFacultiesList: (state, action: PayloadAction<IUniversalSelectType[]> ) => {
        state.faculties = action.payload
      },
      newYears: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.years = action.payload
      },
      newGroup: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.groups = action.payload
      },
      newRates: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.rates = action.payload
      },
      newSemesters: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.semesters = action.payload
      },
      newDisciplines: (state, action: PayloadAction<IDisciplinesType[]>) => {
        state.disciplines = action.payload
      },
      newFormControls: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.formControls = action.payload
      },
      newEstimates: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.estimates = action.payload
      },
      newStatements: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.statements = action.payload
      },
      newGrades: (state, action: PayloadAction<GradeType[]>) => {
        state.grades = action.payload
      },
      newEstOthers: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.estOther = action.payload
      },
      newRrnkPermission( state, action: PayloadAction<IUniversalSelectType[]>){
        state.rrnkPermis = action.payload
      },
      newWS: (state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.ws = action.payload
      },
      newPoleStatement(state, action: PayloadAction<IUniversalSelectType[]>) {
        state.poleStatement = action.payload
      },
      newEducForm: ( state, action: PayloadAction<IUniversalSelectType[]>) => {
        state.educForm = action.payload
      }
    }
  })
  
  export const { 
    newFacultiesList, 
    newYears, 
    newSemesters, 
    newGroup,
    newRates,
    newDisciplines,
    newFormControls,
    newEstimates,
    newStatements,
    newGrades,
    newEstOthers,
    newRrnkPermission,
    newWS,
    newPoleStatement,
    newEducForm } = counterSlice.actions
  

  
  export default counterSlice.reducer