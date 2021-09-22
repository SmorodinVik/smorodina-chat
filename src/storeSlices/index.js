// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const commonStore = createSlice({
  name: 'commonStore',
  initialState: {},
  reducers: {
    loadData: (state, action) => action.payload.data,
  },
});

const { actions, reducer } = commonStore;

export const { loadData } = actions;

export default reducer;
