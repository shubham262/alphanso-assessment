import React, { memo, useState, useEffect, useCallback } from 'react';
import { connect, useDispatch } from 'react-redux';
import '../assets/styles/chat.css';
import Sidebar from '../component/Sidebar';
import ChatList from '../component/ChatList';
import { fetchData } from '../service';
import {
	saveChannelData,
	changeChannelRefetchState,
} from '../redux/reducers/chat';

const Chat = ({ mode, channelsData, channelRefetch }) => {
	const [info, setInfo] = useState({});
	const dispatch = useDispatch();

	useEffect(() => {
		if (!channelsData) {
			getData();
		}
	}, []);

	useEffect(() => {
		if (channelRefetch) {
			getData();
			dispatch(changeChannelRefetchState(null));
		}
	}, [channelRefetch]);

	const getData = useCallback(async () => {
		try {
			const response = await fetchData('http://localhost:3001/getData');
			if (response?.[0]) {
				const data = response?.[1]?.data;
				dispatch(saveChannelData(data));
			}
		} catch (error) {
			console.log('error==>', error);
		}
	}, []);

	return (
		<div className={`chatMainContainer ${mode}`}>
			{/* sideBar for showingChannels */}
			<Sidebar />
			{/* div for showing chats */}
			<ChatList />
		</div>
	);
};
const mapStateToProps = (state) => ({
	mode: state.chatReducer.mode,
	channelsData: state.chatReducer.channelsData,
	channelRefetch: state.chatReducer.channelRefetch,
});

const mapDispatchToProps = () => ({
	saveChannelData: saveChannelData,
	changeChannelRefetchState: changeChannelRefetchState,
});

const MemoizedChat = memo(Chat);
export default connect(mapStateToProps, mapDispatchToProps)(MemoizedChat);
