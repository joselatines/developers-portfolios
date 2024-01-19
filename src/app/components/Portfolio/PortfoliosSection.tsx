import { IPortfolio } from "../../shared/interfaces/portfolio.interface";

import PortfolioCard from "./PortfolioCard";

function PortfoliosSection({ portfolios }: IProps) {
	if (portfolios.length <= 0) return <span>No portfolios added</span>;

	return (
		<section className="flex gap-5 flex-wrap">
			{portfolios.map(p => (
				<PortfolioCard key={p.id} portfolio={p} />
			))}
		</section>
	);
}

interface IProps {
	portfolios: IPortfolio[];
}

export default PortfoliosSection;
