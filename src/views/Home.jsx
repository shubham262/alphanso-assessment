import React, { memo } from 'react';
import '../assets/styles/homeStyling.css';
import { Button } from 'antd';
import { increment, decrement } from '../redux/reducers/home';
import { connect, useDispatch } from 'react-redux';

const Home = (props) => {
	const dispatch = useDispatch();
	const { counter, increment, decrement } = props;
	return (
		<div className="home">
			<span>{counter}</span>
			<Button
				onClick={() => dispatch(increment(1))}
				style={{
					marginTop: '10px',
				}}
				type="primary"
			>
				increment
			</Button>{' '}
			<Button
				onClick={() => dispatch(decrement(1))}
				style={{
					marginTop: '10px',
				}}
				type="primary"
			>
				decrement
			</Button>
		</div>
	);
};
const mapStateToProps = (state) => ({
	counter: state.homeReducer.counter,
});

const mapDispatchToProps = (dispatch) => ({
	increment: increment,
	decrement: decrement,
});
const MemoizedHome = memo(Home);
export default connect(mapStateToProps, mapDispatchToProps)(MemoizedHome);
