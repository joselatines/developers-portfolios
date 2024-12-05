import { Portfolio } from "@/types/portfolio";

export interface Props {
	portfolio: Portfolio;
	refreshPortfolios?: () => void;
}
