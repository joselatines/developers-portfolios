import { useState, useEffect, useCallback } from "react";

interface State {
	data?: any;
	error?: Error | any;
}

export const useFetch = (url: string, options?: RequestInit) => {
	const [res, setResponse] = useState<State>({});

	// Function to fetch data from the specified URL
	const fetchData = useCallback(async () => {
		try {
			const res = await fetch(url, options);
			const json = await res.json();
			setResponse({ data: json });
		} catch (error) {
			setResponse({ error });
		}
	}, [url, options]);

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
