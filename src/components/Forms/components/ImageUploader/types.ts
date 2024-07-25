import { ImageListType } from "react-images-uploading";

export interface Props {
	images: ImageListType;
	setImages: (images: ImageListType | any) => void; // initialize in []
	maxImages?: number;
	note?: string;
	required: boolean;
}

export interface FileErrorsProps {
	maxImages: number;
	fileSize: number;
	resolutionHeight: number;
	resolutionWidth: number;
	errors: {
		maxFileSize?: boolean;
		maxNumber?: boolean;
		acceptType?: boolean;
		resolution?: boolean;
	};
}

export interface Image {
	data_url: string;
}
