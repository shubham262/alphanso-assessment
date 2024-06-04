import React, { memo, useState, useCallback, useEffect } from 'react';
import { connect, useDispatch } from 'react-redux';
import '../assets/styles/feedBackViewStyling.css';
import { Table, Rate, Button } from 'antd';
const FeedbackView = (props) => {
	const { mode, activeChannel } = props;
	const dispatch = useDispatch();
	const [info, setInfo] = useState({
		data: null,
		originalData: null,
	});
	const [filterValue, setFilterValue] = useState(0);

	useEffect(() => {
		if (activeChannel) {
			let dataArray = [];
			let systemChatArray = activeChannel?.chats?.filter(
				(ele) => ele?.type === 'system'
			);
			for (let i = 0; i < systemChatArray?.length; i++) {
				let chatObj = { ...systemChatArray?.[i] };
				let feedBackObj = { ...chatObj?.feedback };
				delete chatObj?.feedback;
				feedBackObj = { ...chatObj, ...feedBackObj };
				dataArray?.push(feedBackObj);
			}
			setInfo((prev) => ({
				...prev,
				data: dataArray,
				originalData: dataArray,
			}));
		}
	}, [activeChannel]);

	useEffect(() => {
		if (filterValue) {
			const originalData = [...info?.originalData];
			const newData = originalData?.filter(
				(ele) => +ele.rating === +filterValue
			);
			setInfo((prev) => ({ ...prev, data: newData }));
		}
	}, [filterValue]);

	const columns = [
		{
			title: 'MessageContent',
			dataIndex: 'content',
			key: 'content',
		},
		{
			title: 'Ratings',
			dataIndex: 'rating',
			key: 'rating',
		},
		{
			title: 'Like/Dislike',
			dataIndex: 'liked',
			key: 'liked',
		},
		{
			title: 'Subjective Message',
			dataIndex: 'feedbackText',
			key: 'feedbackText',
		},
	];

	return (
		<div className={`feedBackContainer ${mode}`}>
			<div className="filterContainer">
				<span>Filter</span>
				<Rate value={filterValue} onChange={setFilterValue} />
			</div>
			<div
				style={{
					display: 'flex',
					justifyContent: 'center',
					marginBottom: '50px',
				}}
			>
				<Button
					type="primary"
					onClick={() => {
						setFilterValue(0);
						setInfo((prev) => ({
							...prev,
							data: [...info?.originalData],
						}));
					}}
				>
					Clear Filter
				</Button>
			</div>
			<div className="feedbackTableContainer">
				<Table dataSource={info?.data} columns={columns} />
			</div>
		</div>
	);
};

const mapStateToProps = (state) => ({
	mode: state.chatReducer.mode,
	activeChannel: state.chatReducer.activeChannel,
});

const mapDispatchToProps = () => ({});
const MemoizedFeedback = memo(FeedbackView);
export default connect(mapStateToProps, mapDispatchToProps)(MemoizedFeedback);
