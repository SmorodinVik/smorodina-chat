/* eslint-disable no-param-reassign */
// @ts-check

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  channels: [],
  messages: [],
  currentChannelId: '',
  currentUser: '',
  dataFetchingState: 'none',
};

const commonStore = createSlice({
  name: 'commonStore',
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.dataFetchingState = 'requested';
    },
    fetchDataFailure: (state) => {
      state.dataFetchingState = 'failed';
    },
    fetchDataSuccess: (state, action) => ({ ...state, ...action.payload.data, dataFetchingState: 'finished' }),
    changeChannel: (state, action) => {
      state.currentChannelId = action.payload.id;
    },
    addMessage: (state, action) => {
      state.messages = [...state.messages, action.payload.message];
    },
    addChannel: (state, action) => {
      state.channels = [...state.channels, action.payload.channel];
    },
    removeChannel: (state, action) => {
      state.channels = state.channels.filter((ch) => ch.id !== action.payload.id);
      state.messages = state.messages.filter(({ channelId }) => channelId !== action.payload.id);
    },
    renameChannel: (state, action) => {
      const { id, name } = action.payload.channel;
      const channel = state.channels.find((ch) => ch.id === id);
      channel.name = name;
    },
    setUser: (state, actions) => {
      state.currentUser = actions.payload.user;
    },
  },
});

const { actions, reducer } = commonStore;

export const {
  fetchDataRequest,
  fetchDataFailure,
  fetchDataSuccess,
  changeChannel,
  addMessage,
  addChannel,
  removeChannel,
  setUser,
  renameChannel,
} = actions;

export default reducer;
