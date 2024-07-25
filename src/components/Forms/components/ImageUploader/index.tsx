import { Button, Text } from "@chakra-ui/react";
import ReactImageUploading, { ImageListType } from "react-images-uploading";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";
import { Props } from "./types";
import FileErrors from "./FileErrors";
import { config } from "./config";
const { maxFileSize, resolutionHeight, resolutionWidth } = config;

function ImageUploader({
	images,
	setImages,
	maxImages = 10,
	required = true,
}: Props) {
	const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
		console.info({ onChange: { imageList, addUpdateIndex } });
		setImages(imageList);
	};

	const multipleImagesAllowed = maxImages > 1;

	return (
		<div className="App">
			{required && images.length <= 0 && (
				<span className="text-red-600">Thumbnail is required</span>
			)}
			<Text fontWeight="medium" fontSize="md" marginBottom={2}>
				Thumbnails
			</Text>

			<ReactImageUploading
				multiple={multipleImagesAllowed}
				value={images}
				onChange={onChange}
				maxNumber={maxImages}
				maxFileSize={maxFileSize}
				dataURLKey="data_url"
				resolutionWidth={resolutionWidth}
				resolutionHeight={resolutionHeight}
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
					errors,
				}) => (
					<div className="upload__image-wrapper">
						<div className="flex gap-3">
							<Button
								style={isDragging ? { color: "red" } : undefined}
								onClick={onImageUpload}
								{...dragProps}
							>
								Click or Drop here
							</Button>
							{images.length > 1 && (
								<Button colorScheme="red" onClick={onImageRemoveAll}>
									Remove all images
								</Button>
							)}
						</div>

						{errors && (
							<FileErrors
								resolutionHeight={resolutionHeight}
								resolutionWidth={resolutionWidth}
								maxImages={maxImages}
								fileSize={maxFileSize}
								errors={errors}
							/>
						)}

						<section className="flex gap-3 flex-wrap my-3">
							{imageList.map((image, index) => (
								<div key={index} className="image-item relative">
									<div className="bg-indigo-30">
										<img
											className="object-contain h-36 w-36"
											src={image.data_url}
											alt={image.file?.name}
										/>
									</div>
									<div className="image-item__btn-wrapper absolute top-2 right-2 flex gap-2">
										<Button
											className="right-12"
											size="xs"
											colorScheme="orange"
											onClick={() => onImageUpdate(index)}
										>
											<GrUpdate color="white" size={12} />
										</Button>
										<Button
											size="xs"
											colorScheme="red"
											onClick={() => onImageRemove(index)}
										>
											<MdDelete color="white" size={12} />
										</Button>
									</div>
								</div>
							))}
						</section>
					</div>
				)}
			</ReactImageUploading>
		</div>
	);
}

export default ImageUploader;
