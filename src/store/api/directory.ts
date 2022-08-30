import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { IStundentLogPass, IUniversalSelectType } from '../models/directory'

export const studentLogPassApi = createApi({
    reducerPath: 'studLogPassApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3113/' }),
    endpoints: (builder) => ({
      getDirectoryName: builder.query<IStundentLogPass, number>({
        query: (idGroup) => `avn13/api/AVN13/LoginPassStudent/getLoginPassStudents?id_group=${idGroup}`,
      }),
      changePassword: builder.mutation<IStundentLogPass, string>({
        query: (body) => ({
          url: "avn13/api/AVN13/LoginPassStudent/updateLoginPassStudents?id_student=25427&login=17-11248&password=12345",
          method: "Post",
          body: body
        })
      })
    }),
  })

  export const { useGetDirectoryNameQuery, useChangePasswordMutation  } = studentLogPassApi