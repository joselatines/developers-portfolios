import "./globals.css";
import { GoogleAnalytics } from "@next/third-parties/google";
import Navbar from "@/components/shared/Navbar";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Providers from "@/components/shared/Providers";
import NextTopLoader from "nextjs-toploader";
import Footer from "@/components/shared/Footer";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Developers Portfolios",
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
	const defaultLinks: any = [];
	const loggedLinks = [{ name: "Dashboard", href: "/dashboard" }];

	return (
		<html lang="en">
			<GoogleAnalytics gaId="G-7BXXPPNTBV" />
			<body className={inter.className}>
				<Providers>
					<NextTopLoader />

					<Navbar defaultLinks={defaultLinks} loggedLinks={loggedLinks} />
					<main>{children}</main>
					<Footer />
				</Providers>
			</body>
		</html>
	);
}
