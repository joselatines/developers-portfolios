export function formatDate(inputDateString: string) {
	const date = new Date(inputDateString);
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");

	return `${year}-${month}-${day}`;
}

export function getDate() {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth() + 1;
	const day = date.getDate();

	const hours = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();
	const milliseconds = date.getMilliseconds();

	const formattedDate = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;

	return formattedDate;
}
