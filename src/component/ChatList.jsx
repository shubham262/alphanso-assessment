import React, { memo, useState, useCallback } from 'react';
import '../assets/styles/chat.css';
import { connect, useDispatch } from 'react-redux';
import {
	changeLightMode,
	sendMessagetoActiveChannel,
	updateChatMessage,
	changeChannelRefetchState,
} from '../redux/reducers/chat';
import { Button, Empty } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import BubbleElement from './BubbleElement';
import { Link } from 'react-router-dom';
import { fetchPost, fetchData } from '../service';

const ChatList = (props) => {
	const {
		activeChannel,
		mode,
		updateChatMessage,
		changeChannelRefetchState,
	} = props;
	const dispatch = useDispatch();
	const [info, setInfo] = useState({
		inputValue: '',
	});

	const handleKeyDown = useCallback(
		async (event, type) => {
			if (event?.key === 'Enter' || type === 'click') {
				const newMessage = {
					type: 'user',
					content: info?.inputValue,
					feedback: {
						liked: null,
						rating: null,
						feedbackText: null,
					},
				};
				dispatch(sendMessagetoActiveChannel(newMessage));
				setInfo((prev) => ({ ...prev, inputValue: '' }));

				const payload = {
					activeChannelId: activeChannel?._id,
					message: newMessage,
				};
				const response = await fetchPost(
					'http://localhost:3001/addNewMessage',
					payload
				);
				if (response?.[0]) {
					const { data } = response?.[1];
					dispatch(sendMessagetoActiveChannel(data));
				}
				dispatch(changeChannelRefetchState(true));
			}
		},
		[info?.inputValue]
	);

	const handleCopyText = useCallback(async (item) => {
		try {
			await navigator.clipboard.writeText(item?.content);
		} catch (error) {
			console.log('error==>', error);
		}
	}, []);

	const handleLikeItem = useCallback(
		async (item, value, index) => {
			const updatedMessage = {
				...item,
				feedback: { ...item?.feedback, liked: value },
			};
			const payload = { message: updatedMessage, index };
			dispatch(updateChatMessage(payload));

			const newPayload = {
				activeChannelId: activeChannel?._id,
				updatedmessage: updatedMessage,
				chatIndex: index,
			};
			const response = await fetchPost(
				'http://localhost:3001/updateAMessage',
				newPayload
			);
			if (response?.[0]) {
				dispatch(changeChannelRefetchState(true));
			}
		},
		[activeChannel]
	);

	const addRating = useCallback(
		async (item, value, index) => {
			const updatedMessage = {
				...item,
				feedback: { ...item?.feedback, rating: value },
			};
			const payload = { message: updatedMessage, index };
			dispatch(updateChatMessage(payload));
			const newPayload = {
				activeChannelId: activeChannel?._id,
				updatedmessage: updatedMessage,
				chatIndex: index,
			};
			const response = await fetchPost(
				'http://localhost:3001/updateAMessage',
				newPayload
			);
			if (response?.[0]) {
				dispatch(changeChannelRefetchState(true));
			}
		},
		[activeChannel]
	);

	const handleAddSubjectiveFeedback = useCallback(
		async (item, value, index) => {
			const updatedMessage = {
				...item,
				feedback: { ...item?.feedback, feedbackText: value },
			};
			const payload = { message: updatedMessage, index };
			dispatch(updateChatMessage(payload));
			const newPayload = {
				activeChannelId: activeChannel?._id,
				updatedmessage: updatedMessage,
				chatIndex: index,
			};
			const response = await fetchPost(
				'http://localhost:3001/updateAMessage',
				newPayload
			);
			if (response?.[0]) {
				dispatch(changeChannelRefetchState(true));
			}
		},
		[activeChannel]
	);

	return (
		<div className="chatlist">
			{!activeChannel ? (
				<div className="chatListEmptyState">
					<Empty
						description={
							<div
								style={{
									display: 'flex',
									flexDirection: 'column',
									gap: '12px',
								}}
							>
								<span
									style={{
										color:
											mode === 'light' ? '#111' : '#fff',
									}}
								>
									No Channel Selected
								</span>
								<span
									style={{
										color:
											mode === 'light' ? '#111' : '#fff',
									}}
								>
									Select a Channel to View Messages
								</span>
							</div>
						}
					/>
				</div>
			) : (
				''
			)}
			{activeChannel ? (
				<div className="chatListSubContainer">
					<div className="sidebarLabel">
						<span>{activeChannel?.channelName}</span>
						<div className="modeContainer">
							<Link to={'/feedBackView'}>
								<Button type="primary">FeedBack View</Button>
							</Link>
						</div>
					</div>
					<div className="chatContainer">
						{activeChannel?.chats?.map((ele, index) => (
							<BubbleElement
								item={ele}
								key={index}
								index={index}
								handleCopyText={handleCopyText}
								handleLikeItem={handleLikeItem}
								addRating={addRating}
								handleAddSubjectiveFeedback={
									handleAddSubjectiveFeedback
								}
							/>
						))}
					</div>
					<div className="inputContaneier">
						<textarea
							className="inputElement"
							value={info?.inputValue}
							onChange={(e) =>
								setInfo((prev) => ({
									...prev,
									inputValue: e.target.value,
								}))
							}
							onKeyDown={handleKeyDown}
						/>
						<span onClick={() => handleKeyDown(null, 'click')}>
							<SendOutlined />
						</span>
					</div>
				</div>
			) : (
				''
			)}
		</div>
	);
};
const mapStateToProps = (state) => ({
	mode: state.chatReducer.mode,
	activeChannel: state.chatReducer.activeChannel,
});

const mapDispatchToProps = (dispatch) => ({
	changeLightMode: changeLightMode,
	sendMessagetoActiveChannel: sendMessagetoActiveChannel,
	updateChatMessage: updateChatMessage,
	changeChannelRefetchState: changeChannelRefetchState,
});
const MemoizedChatList = memo(ChatList);
export default connect(mapStateToProps, mapDispatchToProps)(MemoizedChatList);
