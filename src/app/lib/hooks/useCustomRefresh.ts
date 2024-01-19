import { useState, useCallback } from "react";

export function useCustomRefresh() {
	const [refresh, setRefresh] = useState(0);

	const handleRefresh = useCallback(() => {
		setRefresh(prev => prev + 1);
	}, []);

	return [refresh, handleRefresh] as const;
}
