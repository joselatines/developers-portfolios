import { Portfolio } from "@/types/portfolio";

export interface Props {
	portfolio: Portfolio;
	onClose(): void;
	isOpen: boolean;
}

export interface PortfolioModalBodyProps {
	portfolio: Portfolio;
}
