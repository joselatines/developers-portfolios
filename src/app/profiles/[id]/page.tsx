import { getPortfolio } from "@/app/lib/services/portfolios.service";
import NotFoundError from "@/app/ui/components/shared/Errors/NotFoundError";
import Loading from "@/app/ui/components/shared/Loading";
import { Suspense } from "react";

export default async function Page({ params }: { params: { id: string } }) {
	const res = await getPortfolio(params.id);

	if (!res.success)
		return (
			<Suspense fallback={<Loading />}>
				<NotFoundError />
			</Suspense>
		);

	return (
		<Suspense fallback={<Loading />}>
			<span>Profile {params.id}</span>
		</Suspense>
	);
}
