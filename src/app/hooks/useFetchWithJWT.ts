import { useState, useEffect, useCallback } from "react";
import { getValueFromLocalStorage } from "../contexts/auth/helper";
import { TOKEN_KEY_LOCAL_STORAGE } from "../CONST";

// Define the state shape
interface State {
	data?: any;
	error?: Error | any;
}

// Custom hook for fetching data with JWT
export const useFetchWithJWT = (url: string, options?: RequestInit) => {
	// Initialize state to hold res and error
	const [res, setResponse] = useState<State>({});

	// Get token information from local storage
	const token = getValueFromLocalStorage(TOKEN_KEY_LOCAL_STORAGE);

	// Function to fetch data from the specified URL
	const fetchData = useCallback(async () => {
		try {
			// Check if token information is available
			if (!token) throw new Error("token is not present in localStorage");

			// Set up headers with JWT token
			const config = {
				headers: { Authorization: `Bearer ${token}` },
			};

			// Fetch data from the API
			const res = await fetch(url, { ...options, ...config });
			const json = await res.json();

			// Check if the res is OK, otherwise throw an error
			if (!res.ok) {
				throw new Error(json.message || "Fetch failed");
			}

			// Update the state with the fetched data
			setResponse({ data: json });
		} catch (error) {
			// If there's an error, update the state with the error
			setResponse({ error });
		}
	}, [url, token, options]);

	// Effect to fetch data when the component mounts or when dependencies change
	useEffect(() => {
		fetchData();
	}, [fetchData]);

	// Function to manually trigger a refetch
	const refetch = useCallback(() => {
		fetchData();
	}, [fetchData]);

	// Return the result including data, error, and refetch function
	return { ...res, refetch };
};
