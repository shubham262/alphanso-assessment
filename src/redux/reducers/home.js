import { createSlice } from '@reduxjs/toolkit';

export const homeReducer = createSlice({
	name: 'homeReducer',
	initialState: {
		counter: 0,
	},
	reducers: {
		increment: (state, action) => {
			console.log('increment');
			state.counter += action.payload;
		},
		decrement: (state, action) => {
			state.counter -= action.payload;
		},
	},
});

// Action creators are generated for each case reducer function
export const { increment, decrement } = homeReducer.actions;

export default homeReducer.reducer;
