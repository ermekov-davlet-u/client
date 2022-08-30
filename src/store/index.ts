

import { configureStore } from '@reduxjs/toolkit'
import directoryReducer from "./slice/directorySlice"
import studentGradeReducer from "./slice/studentGradeSlice"
import studentLogPassReducer from "./slice/studentLogPassSlice"
import studentReducer from "./slice/studentSlice"
import studentMarksReducer from "./slice/studentMark"
import { studentLogPassApi } from './api/directory';
import educShReducer from "./slice/educShSlice"
import selMarkMagReducer from "./slice/selMerkMagSlice"


export const store = configureStore({
  reducer: {
    directory: directoryReducer,
    studentGrade: studentGradeReducer,
    studentLogPass: studentLogPassReducer,
    students: studentReducer,
    studentMarks: studentMarksReducer,
    educSh: educShReducer,
    selMarkMag: selMarkMagReducer,
    [studentLogPassApi.reducerPath]: studentLogPassApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(studentLogPassApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch