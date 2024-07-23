import EditPortfolioForm from "@/components/Forms/Portfolio/EditPortfolioForm";
import Loader from "@/components/shared/Loader";
import { getPortfolios } from "@/services/portfolios";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
	const res = await getPortfolios({ portfolioId: params.id });

	if (!res.success)
		return (
			<Suspense fallback={<Loader />}>
				<span>{res.message}</span>
			</Suspense>
		);

	return (
		<Suspense fallback={<Loader />}>
			<EditPortfolioForm initialValues={res.data} id={params.id} />
		</Suspense>
	);
}
