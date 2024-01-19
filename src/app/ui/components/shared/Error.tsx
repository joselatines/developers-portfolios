function ErrorHandler({ err }: { err: Error }) {
	console.error(`💀: Error while rendering ${err}`);

	return <div>Error: {err.message}</div>;
}

export default ErrorHandler;
