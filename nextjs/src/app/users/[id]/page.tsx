import PortfolioSection from "@/components/Portfolio/PortfolioSection";
import UserProfile from "@/components/UserProfile";
import { getUsers } from "@/services/users";

export default async function User({ params }: { params: { id: string } }) {
	const res = await getUsers({ id: params.id });

	if (!res.success) return <p>{res.message}</p>;

	return (
		<>
			<UserProfile data={res.data} />
			<section className="mt-10">
				<PortfolioSection
					userId={params.id}
					title={`${res.data.username} portfolios`}
				/>
			</section>
		</>
	);
}
