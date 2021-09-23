/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: '',
  currentUser: '',
};

const commonStore = createSlice({
  name: 'commonStore',
  initialState,
  reducers: {
    fetchData: (state, action) => ({ ...state, ...action.payload.data }),
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload.message];
    },
    setUser: (state, actions) => {
      state.currentUser = actions.payload.user;
    },
  },
});

const { actions, reducer } = commonStore;

export const { fetchData, changeChannel, addMessage, setUser } = actions;

export default reducer;
