import React, { memo, useState, useCallback, useEffect } from 'react';
import '../assets/styles/chat.css';
import { Button, ConfigProvider, Popover, Rate, Input } from 'antd';
import {
	CopyOutlined,
	PlaySquareOutlined,
	LikeOutlined,
	DislikeOutlined,
	StarOutlined,
	CommentOutlined,
	CheckOutlined,
	LikeFilled,
	DislikeFilled,
	StarFilled,
	MessageFilled,
	MessageOutlined,
} from '@ant-design/icons';
const { TextArea } = Input;
const BubbleElement = ({
	item,
	handleCopyText,
	handleLikeItem,
	addRating,
	handleAddSubjectiveFeedback,
	index,
}) => {
	const text = <span></span>;
	const [info, setInfo] = useState({
		copied: false,
		feedbackMessage: item?.feedback?.feedbackText,
	});
	const [value, setValue] = useState(0);
	const buttonWidth = 80;
	const copiedClick = useCallback(() => {
		handleCopyText(item);
		setInfo((prev) => ({ ...prev, copied: true }));
		setTimeout(() => {
			setInfo((prev) => ({ ...prev, copied: false }));
		}, 1000);
	}, [info?.copied]);

	const likeDislikeCliked = useCallback((type) => {
		if (type === 'liked') {
			handleLikeItem(item, 'liked', index);
		} else {
			handleLikeItem(item, 'disliked', index);
		}
	}, []);

	const subContent = (
		<div className="hoverContainer">
			<Rate onChange={setValue} />
		</div>
	);

	const messageContent = (
		<div
			className="hoverContainer"
			style={{ flexDirection: 'column' }}
			onMouseLeave={() =>
				setInfo((prev) => ({
					...prev,
					feedbackMessage: item?.feedback?.feedbackText,
				}))
			}
		>
			<TextArea
				rows={4}
				value={info?.feedbackMessage}
				onChange={(e) =>
					setInfo((prev) => ({
						...prev,
						feedbackMessage: e.target.value,
					}))
				}
			/>
			<Button
				type="primary"
				size="small"
				onClick={() =>
					handleAddSubjectiveFeedback(
						item,
						info?.feedbackMessage,
						index
					)
				}
			>
				Save
			</Button>
		</div>
	);

	const content = (
		<div className="hoverContainer">
			<span onClick={copiedClick}>
				{!info?.copied ? <CopyOutlined /> : <CheckOutlined />}
			</span>
			<span onClick={() => likeDislikeCliked('liked')}>
				{!item?.feedback?.liked ? (
					<LikeOutlined />
				) : item?.feedback?.liked === 'liked' ? (
					<LikeFilled />
				) : (
					''
				)}
			</span>
			<span onClick={() => likeDislikeCliked('disliked')}>
				{!item?.feedback?.liked ? (
					<DislikeOutlined />
				) : item?.feedback?.liked === 'disliked' ? (
					<DislikeFilled />
				) : (
					''
				)}
			</span>
			<ConfigProvider
				button={{
					style: { width: buttonWidth, margin: 4 },
				}}
			>
				<Popover placement="bottom" title={text} content={subContent}>
					{!item?.feedback?.rating ? (
						<StarOutlined />
					) : (
						<StarFilled />
					)}
				</Popover>
			</ConfigProvider>
			<ConfigProvider
				button={{
					style: { width: buttonWidth, margin: 4 },
				}}
			>
				<Popover
					placement="bottom"
					title={text}
					content={messageContent}
				>
					{!item?.feedback?.feedbackText ? (
						<MessageOutlined />
					) : (
						<MessageFilled />
					)}
				</Popover>
			</ConfigProvider>
		</div>
	);

	useEffect(() => {
		if (value) {
			addRating(item, value, index);
		}
	}, [value]);

	return (
		<ConfigProvider
			button={{
				style: { width: buttonWidth, margin: 4 },
			}}
		>
			{item?.type === 'system' ? (
				<Popover placement="bottom" title={text} content={content}>
					<div
						className="bubbleElement"
						style={{
							backgroundColor:
								item?.type === 'system' ? '#0A84FF' : '#d8d8dc',
							alignSelf:
								item?.type === 'system'
									? 'flex-start'
									: 'flex-end',
							borderBottomLeftRadius:
								item?.type === 'system' ? 0 : 13,
							borderBottomRightRadius:
								item?.type === 'system' ? 13 : 0,
						}}
					>
						{item?.content}
					</div>
				</Popover>
			) : (
				<div
					className="bubbleElement"
					style={{
						backgroundColor:
							item?.type === 'system' ? '#0A84FF' : '#d8d8dc',
						alignSelf:
							item?.type === 'system' ? 'flex-start' : 'flex-end',
						borderBottomLeftRadius:
							item?.type === 'system' ? 0 : 13,
						borderBottomRightRadius:
							item?.type === 'system' ? 13 : 0,
					}}
				>
					{item?.content}
				</div>
			)}
		</ConfigProvider>
	);
};

export default memo(BubbleElement);
