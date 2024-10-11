import React, { memo, useCallback, useEffect, useState } from 'react';
import { ReactComponent as Close } from '../assets/svg/close.svg';
import { ReactComponent as Search } from '../assets/svg/search.svg';
import { ReactComponent as Tick } from '../assets/svg/tick.svg';
import '../assets/styles/homeStyling.scss';

const Home = () => {
	const [info, setInfo] = useState({
		data: [...(JSON.parse(localStorage.getItem('data')) || [])],
		filteredData: [...(JSON.parse(localStorage.getItem('data')) || [])],
		activeFilter: 'all',
		taskInput: '',
		filterChanged: false,
		dataChanged: false,
		search: '',
		searchChanged: false,
		timeout: null,
	});

	useEffect(() => {
		if (info?.filterChanged) {
			syncFiltereData();
		}
	}, [info?.activeFilter, info?.filterChanged]);

	useEffect(() => {
		if (info?.dataChanged) {
			syncFiltereData();
		}
	}, [info?.data, info?.dataChanged]);

	useEffect(() => {
		if (info?.searchChanged) {
			handleDebounceeSearch();
		}
	}, [info?.search, info?.searchChanged]);

	const taskInputOnchange = useCallback(
		(e) => {
			setInfo((prev) => ({
				...prev,
				taskInput: e.target.value,
			}));
		},
		[info?.taskInput]
	);

	const onDeleteClick = useCallback(
		(index) => {
			const data = [...info?.data];
			data?.splice(index, 1);
			setInfo((prev) => ({ ...prev, data, dataChanged: true }));
		},
		[info?.data]
	);

	const addTask = useCallback(() => {
		if (info?.taskInput?.length) {
			let status =
				info?.activeFilter == 'all' ? 'incomplete' : info?.activeFilter;
			const data = [...info?.data, { title: info?.taskInput, status }];

			setInfo((prev) => ({
				...prev,
				data,
				taskInput: '',
				dataChanged: true,
			}));
		}
	}, [info?.data, info?.taskInput, info?.activeFilter]);

	const syncFiltereData = useCallback(() => {
		const data = [...info?.data];
		let filteredData = [];
		if (info?.activeFilter === 'all') {
			filteredData = data;
		} else {
			filteredData = data.filter((e) => e?.status === info?.activeFilter);
		}

		// Then, apply the search filter if search exists

		if (info?.search?.length) {
			filteredData = filteredData.filter((e) =>
				e?.title?.toLowerCase().includes(info?.search?.toLowerCase())
			);
		}
		setInfo((prev) => ({ ...prev, filteredData }));
		localStorage.setItem('data', JSON.stringify(data));
	}, [info?.activeFilter, info?.data, info?.search]);

	const onFiltetClick = useCallback(
		(data) => {
			if (data === info?.activeFilter) {
				return;
			}
			setInfo((prev) => ({
				...prev,
				activeFilter: data,
				filterChanged: true,
			}));
		},
		[info?.activeFilter]
	);
	const handleDebounceeSearch = useCallback(() => {
		clearTimeout(info?.timeout);
		const timeout = setTimeout(() => {
			syncFiltereData();
			setInfo((prev) => ({ ...prev, timeout }));
		}, 500);
		setInfo((prev) => ({ ...prev, timeout }));
	}, [info?.timeout, syncFiltereData]);

	const handleKeyDown = useCallback(
		(e) => {
			if (e?.key === 'Enter') {
				addTask();
			}
		},
		[addTask]
	);

	const changeStatus = useCallback(
		(status, index) => {
			const data = [...info?.data];
			data[index].status = status;
			setInfo((prev) => ({ ...prev, data, dataChanged: true }));
			syncFiltereData();
		},
		[info?.data]
	);

	return (
		<div className="home">
			<div className="todoListContainer">
				<div className="headerContainer">
					<span className="headerText">Today</span>
					<div className="searchContainer">
						<Search />
						<input
							type="text"
							placeholder="Search"
							value={info?.search}
							onChange={(e) =>
								setInfo((prev) => ({
									...prev,
									search: e?.target?.value?.trim(),
									searchChanged: true,
								}))
							}
						/>
					</div>
					<div className="filterContainer">
						<span
							className={`filterButtons ${
								info?.activeFilter === 'all' ? 'active' : ''
							}`}
							onClick={() => onFiltetClick('all')}
						>
							All
						</span>
						<span
							className={`filterButtons ${
								info?.activeFilter === 'completed'
									? 'active'
									: ''
							}`}
							onClick={() => onFiltetClick('completed')}
						>
							Completed
						</span>
						<span
							className={`filterButtons ${
								info?.activeFilter === 'incomplete'
									? 'active'
									: ''
							}`}
							onClick={() => onFiltetClick('incomplete')}
						>
							Incomplete
						</span>
					</div>
				</div>
				<div className="taskLists">
					{info?.filteredData?.map((e, index) => (
						<div
							className="taskCards"
							style={{
								backgroundColor:
									e?.status === 'completed'
										? '#eaf4e1'
										: '#f9f9f9',
								borderColor:
									e?.status === 'completed'
										? '#c7e2b4'
										: '#e0e0e0',
							}}
						>
							<div className="cardsButtonWraper">
								{e?.status === 'incomplete' ? (
									<span
										className="radioButton"
										onClick={() =>
											changeStatus('completed', index)
										}
									></span>
								) : (
									<span
										className="closeBtnWrapper"
										onClick={() =>
											changeStatus('incomplete', index)
										}
									>
										<Tick />
									</span>
								)}
								{e?.title}
							</div>

							<span
								className="closeBtnWrapper"
								onClick={() => onDeleteClick(index)}
							>
								<Close />
							</span>
						</div>
					))}
				</div>
				<div style={{ display: 'flex' }}>
					<input
						value={info?.taskInput}
						onChange={taskInputOnchange}
						className="taskInputForm"
						placeholder="Type here..."
						onKeyDown={handleKeyDown}
					/>
				</div>

				<div className="addtaskButtonContainer" onClick={addTask}>
					Add Task
				</div>
			</div>
		</div>
	);
};

export default memo(Home);
