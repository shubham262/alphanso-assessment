import React, { memo } from 'react';

import '../assets/styles/homeStyling.css';
import { Button } from 'antd';
import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<div className="home">
			<img
				src="https://assets-global.website-files.com/65b94b2bab54c86c1cd618a8/66338df3627b90bb94c6415a_logoforwebflow.svg"
				loading="lazy"
				width="172"
				alt=""
			></img>
			<Link to="/chat">
				<Button
					style={{
						marginTop: '10px',
					}}
					type="primary"
				>
					Move to the Assignment
				</Button>
			</Link>
		</div>
	);
};

export default memo(Home);
