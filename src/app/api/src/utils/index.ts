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

export function buildImageName(title: string, thumbnail: string) {
	const name = `${getDate()}-${title}.${thumbnail.split("/")[1].split(";")[0]}`;

	return name;
}
