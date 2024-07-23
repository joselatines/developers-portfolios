import { getPortfolios } from "@/services/portfolios";
import PortfolioSection from "@/components/Portfolio/PortfolioSection";

export default async function Home() {
	const res = await getPortfolios({});

	if (res.data) return <PortfolioSection portfolios={res.data} />;
}
