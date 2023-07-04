import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../../utils/axios'

const initialState = {
   user: null,
   token: null,
   isLoading: false,
   status: null
}

export const signUp = createAsyncThunk(
   'auth/signup',
   async ({ username, password }) => {
      try {
         const { data } = await axios.post('auth/signup', {
            username, password
         })
         if (data.token) window.localStorage.setItem('token', data.token)
         return data
      } catch (error) {
         console.log(error)
      }
   }
)

export const signIn = createAsyncThunk(
   'auth/signin',
   async ({ username, password }) => {
      try {
         const { data } = await axios.post('auth/signin', {
            username, password
         })
         if (data.token) window.localStorage.setItem('token', data.token)
         return data
      } catch (error) {
         console.log(error)
      }
   }
)

export const getMe = createAsyncThunk(
   'auth/me',
   async () => {
      try {
         const { data } = await axios.get('auth/me')
         return data
      } catch (error) {
         console.log(error)
      }
   }
)

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      logout: (state) => {
         state.user = null
         state.token = null
         state.isLoading = false
         state.status = null
      }
   },
   extraReducers: (builder) => {
      builder
         //signUp
         .addCase(signUp.pending, (state) => {
            state.isLoading = true
            state.status = null
         })
         .addCase(signUp.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
         })
         .addCase(signUp.rejected, (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
         })
         //signIn
         .addCase(signIn.pending, (state) => {
            state.isLoading = true
            state.status = null
         })
         .addCase(signIn.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = action.payload.message
            state.user = action.payload.user
            state.token = action.payload.token
         })
         .addCase(signIn.rejected, (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
         })
         //get me
         .addCase(getMe.pending, (state) => {
            state.isLoading = true
            state.status = null
         })
         .addCase(getMe.fulfilled, (state, action) => {
            state.isLoading = false
            state.status = null
            state.user = action.payload?.user
            state.token = action.payload?.token
         })
         .addCase(getMe.rejected, (state, action) => {
            state.status = action.payload.message
            state.isLoading = false
         })
   }
})

export const isAuth = (state) => Boolean(state.auth.token)

export const {logout} = authSlice.actions
export default authSlice.reducer