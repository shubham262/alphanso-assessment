import React, { memo } from 'react';
import '../assets/styles/chat.css';
import { TeamOutlined } from '@ant-design/icons';
const ChannelCard = ({ item, onClickEvent }) => {
	return (
		<div className="channelCard" onClick={() => onClickEvent(item)}>
			<TeamOutlined />
			<div className="channelCardText">
				<span>{item?.channelName}</span>
				<span>Chat with an AI Model</span>
			</div>
		</div>
	);
};

export default memo(ChannelCard);
