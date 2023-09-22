import { createSlice } from '@reduxjs/toolkit'

const fitlerSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    filterAnecdotes(state, action) {
      return action.payload
    }
  }
})

export const { filterAnecdotes } = fitlerSlice.actions
export default fitlerSlice.reducer