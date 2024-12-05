import { FileErrorsProps } from "./types";

function FileErrors({
	errors,
	maxImages,
	fileSize,
	resolutionWidth,
	resolutionHeight,
}: FileErrorsProps) {
	const { maxNumber, acceptType, maxFileSize, resolution } = errors;
	const recommendedResolution = `${resolutionWidth}x${resolutionHeight}`;

	return (
		<div className="text-red-600">
			{maxNumber && <span>Number of selected images exceed {maxImages}</span>}
			{acceptType && <span>Your selected file type is not allow</span>}
			{maxFileSize && (
				<span>
					Selected file size exceed {Number(fileSize / 100).toFixed(0)}
				</span>
			)}
			{resolution && (
				<span>Selected file is not match your {recommendedResolution}</span>
			)}
		</div>
	);
}

export default FileErrors;
