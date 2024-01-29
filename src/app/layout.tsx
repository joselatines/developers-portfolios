import "./ui/globals.css";
import NextTopLoader from "nextjs-toploader";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

import Navigation from "./ui/components/shared/Navigation";
import { Providers } from "./ui/components/Providers";
import ScrollToTopButton from "./ui/components/shared/ScrollToTopButton";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Developer Showcase",
	description:
		"🚀 Showcase your development portfolio, receive feedback, and explore projects from other developers!",
	authors: [{ name: "Jose Latines", url: "https://www.joselatines.com" }],
	creator: "Jose Latines",
	generator: "Next.js",
	keywords: ["portfolios", "developers portfolios", "portfolios feedback"],
	abstract:
		"Developer Showcase is a web app that empowers developers to exhibit their work, exchange feedback, and explore a diverse range of projects.",
	applicationName: "Developers Portfolios",
	assets: "Icons, logos, and images related to developer portfolios",
	category: "Web Development",
	classification: "Developer Community Platform",
	openGraph: {
		type: "website",
		url: "https://developers-portfolios.vercel.app",
		title: "Developers Portfolios",
		description:
			"Empower developers to showcase their work, receive feedback, and explore projects from a vibrant developer community.",
		siteName: "Developers Portfolios",
		images: [
			{
				url: "https://developers-portfolios.vercel.app/og.jpg",
			},
		],
	},
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<NextTopLoader />
				<Providers>
					<Navigation />
					<main className="p-5 py-5 md:px-24 ">{children}</main>
					<ScrollToTopButton />
				</Providers>
			</body>
		</html>
	);
}
