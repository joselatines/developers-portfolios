import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import NavMenu from "./components/NavMenu";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Create Next App",
	description: "Generated by create next app",
};

export default async function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {

	return (
		<html lang="en">
			<body className={inter.className}>
				<main className="mx-auto max-w-5xl text-2xl flex gap-2 ">
					<Providers>
						<NavMenu />
						{children}
					</Providers>
				</main>
			</body>
		</html>
	);
}
