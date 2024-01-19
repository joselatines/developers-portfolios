import { ImageListType } from "react-images-uploading";

export interface Props {
	images: ImageListType;
	setImages: (images: ImageListType | any) => void; // initialize in []
	maxImages?: number;
	note?: string;
}
