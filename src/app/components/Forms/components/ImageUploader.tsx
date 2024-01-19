import { Button, Text } from "@chakra-ui/react";
import ImageUploading, { ImageListType } from "react-images-uploading";
import { MdDelete } from "react-icons/md";
import { GrUpdate } from "react-icons/gr";

interface IProps {
	images: ImageListType;
	setImages: (images: ImageListType | any) => void; // initialize in []
	maxNumber?: number;
	note?: string;
}

export function ImageUploader({
	images,
	setImages,
	maxNumber = 10,
	note = "Recommended up to 1320x720",
}: IProps) {
	// 	const [images, setImages] = useState([]);

	const onChange = (imageList: ImageListType, addUpdateIndex: any) => {
		// data for submit
		console.info({ onChange: { imageList, addUpdateIndex } });
		setImages(imageList);
	};

	const multipleImagesAllowed = maxNumber > 1 ? true : false;

	return (
		<div className="App">
			{images.length <= 0 && (
				<span className="text-red-600">Thumbnail is required</span>
			)}
			<Text fontWeight={"medium"} fontSize={"md"} marginBottom={2}>
				Thumbnails
			</Text>

			<ImageUploading
				multiple={multipleImagesAllowed}
				value={images}
				onChange={onChange}
				maxNumber={maxNumber}
				dataURLKey="data_url"
			>
				{({
					imageList,
					onImageUpload,
					onImageRemoveAll,
					onImageUpdate,
					onImageRemove,
					isDragging,
					dragProps,
				}) => (
					<div className="upload__image-wrapper">
						<span className="text-sm">{note}</span>
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
						<section className="flex gap-3 flex-wrap my-3">
							{imageList.map((image, index) => (
								<div key={index} className="image-item relative">
									<div className="bg-indigo-30">
										<img
											className="object-cover h-32 w-32"
											src={image["data_url"]}
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
			</ImageUploading>
		</div>
	);
}
