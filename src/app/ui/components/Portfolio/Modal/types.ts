import { Portfolio } from "@/app/lib/types/portfolio";

export interface Props {
	portfolio: Portfolio;
	onClose(): void;
	isOpen: boolean;
}
