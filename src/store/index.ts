

import { configureStore } from '@reduxjs/toolkit'
import directoryReducer from "./slice/directorySlice"
import studentGradeReducer from "./slice/studentGradeSlice"
import studentLogPassReducer from "./slice/studentLogPassSlice"
import studentReducer from "./slice/studentSlice"
import studentMarksReducer from "./slice/studentMark"
import { studentLogPassApi } from './api/directory';
import educShReducer from "./slice/educShSlice"
import selMarkMagReducer from "./slice/selMerkMagSlice"
import loadingReduser from "./slice/loadingSlice"
import kvalificationReducer from "./slice/kvalification"
import diplomReducer from "./slice/diplomSlice"
import journalReducer from "./slice/journalSlice"
import dostupReducer from "./slice/dostupSlice"

export const store = configureStore({
  reducer: {
    directory: directoryReducer,
    studentGrade: studentGradeReducer,
    studentLogPass: studentLogPassReducer,
    students: studentReducer,
    studentMarks: studentMarksReducer,
    educSh: educShReducer,
    selMarkMag: selMarkMagReducer,
    loading: loadingReduser,
    kvalification: kvalificationReducer,
    diplom: diplomReducer,
    journal: journalReducer,
    dostup: dostupReducer,
    [studentLogPassApi.reducerPath]: studentLogPassApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  }).concat(studentLogPassApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch