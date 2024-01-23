import { getServerSession } from "next-auth";
import { getAllPortfolios } from "./lib/services/portfolios.service";
import NextImage from "next/image";

export default async function Home() {
	const session = await getServerSession();
	const portfolios = await getAllPortfolios();
	return (
		<>
			getServerSession Result
			{session?.user?.name ? (
				<div>
					{session?.user?.name}
					<ul>
						{portfolios.body.map((f: any) => (
							<li key={f.id}>
								🙂{f.title}
								<NextImage src={f.thumbnail} alt={f.file_name}></NextImage>
							</li>
						))}
					</ul>
				</div>
			) : (
				<div>Not logged in</div>
			)}
		</>
	);
}
