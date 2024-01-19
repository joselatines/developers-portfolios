export const saveInLocalStorage = (key: string, value: any) =>
	localStorage.setItem(key, JSON.stringify(value));

export const getValueFromLocalStorage = (key: string): any | null => {
	const userString = localStorage.getItem(key);
	if (userString) {
		return JSON.parse(userString);
	}
	return null;
};
