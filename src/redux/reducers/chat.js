import { createSlice } from '@reduxjs/toolkit';

export const chatReducer = createSlice({
	name: 'chatReducer',
	initialState: {
		activeChannel: null,
		channelsData: null,
		channelRefetch: null,
		mode: 'light',
	},
	reducers: {
		saveChannelData: (state, action) => {
			state.channelsData = action.payload;
		},
		changeLightMode: (state, action) => {
			state.mode = action.payload;
		},
		setActiveChannel: (state, action) => {
			state.activeChannel = action.payload;
		},
		sendMessagetoActiveChannel: (state, action) => {
			const newMessage = action.payload;
			const chatArray = state.activeChannel?.chats;
			chatArray?.push(newMessage);
			state.activeChannel = {
				...state.activeChannel,
				chats: [...chatArray],
			};
		},
		updateChatMessage: (state, action) => {
			const { message, index } = action.payload;
			const chatArray = state.activeChannel?.chats;
			chatArray?.splice(index, 1, message);
			state.activeChannel = {
				...state.activeChannel,
				chats: [...chatArray],
			};
		},
		changeChannelRefetchState: (state, action) => {
			state.channelRefetch = action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const {
	setActiveChannel,
	changeLightMode,
	sendMessagetoActiveChannel,
	updateChatMessage,
	saveChannelData,
	changeChannelRefetchState,
} = chatReducer.actions;

export default chatReducer.reducer;
