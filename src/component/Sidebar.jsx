import React, { memo, useCallback } from 'react';
import '../assets/styles/chat.css';
import { Button, Switch } from 'antd';
import { connect, useDispatch } from 'react-redux';
import { changeLightMode, setActiveChannel } from '../redux/reducers/chat';

import ChannelCard from './ChannelCard';
const Sidebar = (props) => {
	const dispatch = useDispatch();
	const { mode, changeLightMode, setActiveChannel, channelsData } = props;

	const onClickMode = useCallback(() => {
		const updaatedMode = mode === 'dark' ? 'light' : 'dark';
		dispatch(changeLightMode(updaatedMode));
	}, [mode]);

	const onClickEvent = useCallback(async (item) => {
		dispatch(setActiveChannel(item));
	}, []);

	return (
		<div className="sidebar">
			<div className="sidebarLabel">
				<span>Channel List</span>
				<div className="modeContainer">
					<span>{`${mode} mode`}</span>
					<Switch onChange={onClickMode} />
				</div>
			</div>
			<div className="channelLsit">
				{channelsData?.map((ele, index) => (
					<ChannelCard
						key={index}
						item={ele}
						onClickEvent={onClickEvent}
					/>
				))}
			</div>
		</div>
	);
};
const mapStateToProps = (state) => ({
	mode: state.chatReducer.mode,
	channelsData: state.chatReducer.channelsData,
});

const mapDispatchToProps = () => ({
	changeLightMode: changeLightMode,
	setActiveChannel: setActiveChannel,
});
const MemoizedSidebar = memo(Sidebar);
export default connect(mapStateToProps, mapDispatchToProps)(MemoizedSidebar);
