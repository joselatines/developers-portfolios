import {
	getNumberOfPeopleRatedPortfolio,
	getPortfolioAvgReview,
} from "@/database/utils";
import { prisma } from "../../../database";
import { buildImageName, sortPortfolios } from "@/helpers/utils";
import { getServerSession } from "next-auth";
import { authConfig } from "@/lib/auth";
import { firebase } from "@/lib/firebase/firebase";
import puppeteer from "puppeteer";
export async function GET(req: Request) {
	const { searchParams } = new URL(req.url);
	const portfolioId = searchParams.get("id");
	const title = searchParams.get("title") || undefined;
	const type = searchParams.get("type") || undefined;
	const authorId = searchParams.get("author");

	try {
		if (portfolioId) {
			const portfolio = await prisma.portfolios.findFirst({
				where: { id: portfolioId },
			});
			return Response.json({ success: true, data: portfolio });
		}

		const date = (searchParams.get("date") as "desc" | "asc") || "desc";

		if (date !== "desc" && date !== "asc")
			return Response.json({
				success: false,
				message: "Invalid date (asc or desc)",
			});

		let portfolios = await prisma.portfolios.findMany({
			orderBy: { updatedAt: date },
			include: {
				users: {
					select: {
						id: true,
						username: true,
						email: true,
						profilePic: true,
					},
				},
			},
			where: { title, type },
		});

		if (authorId)
			portfolios = portfolios.filter(
				portfolio => portfolio.created_by === authorId
			);

		// Map and fetch average ratings for each portfolio
		const renamedPortfolios = await Promise.all(
			portfolios.map(async portfolio => {
				const avgRating = await getPortfolioAvgReview(portfolio.id);
				const peopleRated = await getNumberOfPeopleRatedPortfolio(portfolio.id);

				return {
					...portfolio,
					avgRating,
					peopleRated,
					user: portfolio.users,
					users: undefined, // Remove the original 'users' field
				};
			})
		);

		// Sort portfolios by avgRating, peopleRated, and updatedAt
		const orderedPortfolios = sortPortfolios(renamedPortfolios as any);

		return Response.json({ success: true, data: orderedPortfolios });
	} catch (error: any) {
		console.error(error);
		return Response.json({
			success: false,
			message: error?.message || error?.meta?.cause,
			error,
		});
	}
}

export async function POST(req: Request) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();

	// Navigate the page to a URL.
	await page.goto("https://developer.chrome.com/");

	await page.setViewport({width: 1080, height: 1024});

// Type into search box.
await page.locator('.devsite-search-field').fill('automate beyond recorder');

// Wait and click on first result.
await page.locator('.devsite-result-item-link').click();

// Locate the full title with a unique string.
const textSelector = await page
  .locator('text/Customize and automate')
  .waitHandle();
const fullTitle = await textSelector?.evaluate(el => el.textContent);

// Print the full title.
console.log('The title of this blog post is "%s".', fullTitle);

await browser.close();
	const data = await req.json();
	const session = await getServerSession(authConfig);

	const user = session?.user as any;

	if (!user)
		return Response.json(
			{
				message: "User not authenticated",
			},
			{ status: 401 }
		);

	try {
		const name = buildImageName(data.title, data.thumbnail);
		const imgUrl = await firebase.uploadFile({
			name,
			ImageBase64: data.thumbnail.thumbnail,
		});

		const portfolio = {
			...data,
			thumbnail: imgUrl,
			file_name: name,
			created_by: user.id,
		};

		const portfolioCreated = await prisma.portfolios.create({
			data: portfolio,
		});

		return Response.json({
			success: true,
			message: "Portfolio created",
			data: portfolioCreated,
		});
	} catch (error: any) {
		return Response.json(
			{
				success: false,
				message: error?.message || error?.meta?.cause,
				error,
			},
			{ status: 500 }
		);
	}
}

export async function PATCH(req: Request) {
	const body = await req.json();
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id)
		return Response.json(
			{
				message: "Pass an id in search params please. /api/portfolios?id=64564",
			},
			{ status: 400 }
		);

	try {
		const itemCreated = await prisma.portfolios.update({
			data: body,
			where: { id: id },
		});
		return Response.json({
			data: itemCreated,
			success: true,
			message: "Portfolio updated",
		});
	} catch (error: any) {
		return Response.json(
			{
				success: false,
				message: error?.message || error?.meta?.cause,
				error,
			},
			{ status: 500 }
		);
	}
}

export async function DELETE(req: Request) {
	const { searchParams } = new URL(req.url);
	const id = searchParams.get("id");

	if (!id)
		return Response.json(
			{
				message: "Pass an id in search params please. /api/portfolios?id=64564",
				success: false,
			},
			{ status: 400 }
		);
	try {
		const itemDeleted = await prisma.portfolios.delete({ where: { id: id } });
		return Response.json({
			data: itemDeleted,
			success: true,
			message: "Portfolio deleted",
		});
	} catch (error: any) {
		return Response.json({
			success: false,
			message: error?.message || error?.meta?.cause,
			error,
		});
	}
}
