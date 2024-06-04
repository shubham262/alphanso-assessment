import axios from 'axios';

export const fetchData = async (url) => {
	try {
		const response = await axios.get(url);
		const data = await response?.data;
		if (data) {
			return [true, data];
		} else {
			return [(false, response)];
		}
	} catch (error) {
		throw error;
	}
};

export const fetchPost = async (url, paylaod) => {
	try {
		const response = await axios.post(url, paylaod);
		const data = await response?.data;
		if (data) {
			return [true, data];
		} else {
			return [(false, response)];
		}
	} catch (error) {
		throw error;
	}
};
