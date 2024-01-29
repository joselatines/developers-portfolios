import "./ui/globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
//import NavMenu from "./ui/components/NavMenu";
import { Providers } from "./ui/components/Providers";
import Navigation from "./ui/components/shared/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Developers Portfolios",
	description:
		"📷Show your Dev Portfolio and receive feedback from other developers!",
	authors: [{ name: "Jose Latines", url: "https://www.joselatines.com" }],
	creator: "Jose Latines",
	generator: "Next js",
	keywords: ["portfolios", "developers portfolios", "portfolios feedback"],
	
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<Providers>
					<Navigation />
					<main className="p-24">
						{/* <NavMenu /> */}
						{children}
					</main>
				</Providers>
			</body>
		</html>
	);
}
