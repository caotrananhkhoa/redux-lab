import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit'

import { client } from '../../api/client'

import { apiSlice } from '../api/apiSlice'

const usersAdapter = createEntityAdapter()
const initialState = usersAdapter.getInitialState()

export const extendedApiSlice = apiSlice.injectEndpoints({
  endpoints: builder => ({
    getUsers: builder.query({
      query: () => '/users',
      transformResponse: responseData => {
        return usersAdapter.setAll(initialState, responseData)
      }
    })
  })
})

export const { useGetUsersQuery } = extendedApiSlice

export const selectUsersResult = extendedApiSlice.endpoints.getUsers.select()

// export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
//   const response = await client.get('/fakeApi/users')
//   return response.data
// })

// Calling `someEndpoint.select(someArg)` generates a new selector that will return
// the query result object for a query with those parameters.
// To generate a selector for a specific query argument, call `select(theQueryArg)`.
// In this case, the users query has no params, so we don't pass anything to select()

// const emptyUsers = []

// export const selectAllUsers = createSelector(
//   selectUsersResult,
//   usersResult => usersResult?.data ?? emptyUsers
// )

// export const selectUserById = createSelector(
//   selectAllUsers,
//   (state, userId) => userId,
//   (users, userId) => users.find(user => user.id === userId)
// )

const selectUsersData = createSelector(
  selectUsersResult,
  usersResult => usersResult.data
)

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors(state => selectUsersData(state) ?? initialState)
