import axios from "axios";

const BASE_URL = "http://localhost:3000/products";
export async function getData(category="") {
   const url = category ? `${BASE_URL}?category=${category}` : BASE_URL
	const response = await axios.get(url);
	if (response.status === 200) {
		return response.data;
	} else {
		throw new Error(`Request failed with status ${response.status}`);
	}
}
