import { getServerSession } from "next-auth";
import { getAllPortfolios } from "./lib/services/portfolios.service";

export default async function Home() {
	const session = await getServerSession();
	// const portfolios = await getAllPortfolios();
	return (
		<>
			getServerSession Result
			{session?.user?.name ? (
				<div>
					{session?.user?.name}
					{/* <ul>
						{portfolios.body.map((f: any) => (
							<li key={f.id}>🙂{f.title}</li>
						))}
					</ul> */}
				</div>
			) : (
				<div>Not logged in</div>
			)}
		</>
	);
}
