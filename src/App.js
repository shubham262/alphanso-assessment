import logo from './logo.svg';
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Home from './views/Home';
import Chat from './views/Chat';
import FeedbackView from './views/FeedbackView';
function App() {
	return (
		<div className="App">
			{/* routes */}
			<Routes>
				<Route path="/" element={<Home />} />
				<Route path="/chat" element={<Chat />} />
				<Route path="/feedBackView" element={<FeedbackView />} />
			</Routes>
		</div>
	);
}

export default App;
