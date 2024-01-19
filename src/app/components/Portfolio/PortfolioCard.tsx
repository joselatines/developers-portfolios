import Popup from "reactjs-popup";
import { Tag } from "@chakra-ui/react";
import { usePortfolioOwnership } from "../../hooks/usePortfolioOwnership";
import PortfolioModal from "./PortfolioModal";
import { IPortfolio } from "../../shared/interfaces/portfolio.interface";
import { getRateColor, getTypeColor } from "../../shared/utils/uiHelpers";
import OwnerFunctions from "./OwnerFunctions";
import { Link, useLocation } from "react-router-dom";

function PortfolioCard({ portfolio }: IProps) {
	const { thumbnail, title, description, type, User, avgRating, id } =
		portfolio;
	const [isPortfolioOwner] = usePortfolioOwnership(User.id); // actual portfolio is from logged user
	const location = useLocation();
	const { pathname } = location;

	const showOwnerFunctions = isPortfolioOwner && pathname === "/profiles/me";
	const portfolioOwnerName = isPortfolioOwner ? "You" : User.githubUsername;

	const aboutPortfolio = description && `${description.slice(0, 43)}...`;

	return (
		<article className="max-w-md w-96 overflow-hidden">
			<Popup
				trigger={
					<img
						className="md:object-cover md:h-64 w-full h-50 object-fill  mb-1 cursor-pointer"
						src={thumbnail}
						alt={`Portfolio ${title} by @${User.githubUsername}`}
					/>
				}
				modal
			>
				<PortfolioModal data={portfolio} />
			</Popup>

			<article>
				<h4 className="font-medium text-lg">{title}</h4>

				<Link to={`/profiles/${User.id}`} className="opacity-95 text-sm">
					{portfolioOwnerName}
				</Link>
			</article>

			<span>{aboutPortfolio}</span>

			<section className="flex justify-between items-center my-2">
				<div className="flex gap-1">
					<Tag size="sm" colorScheme={getRateColor(avgRating)}>
						{avgRating}/10
					</Tag>
					<Tag size="sm" colorScheme={getTypeColor(type)}>
						{type}
					</Tag>
				</div>
				{showOwnerFunctions && <OwnerFunctions portfolioId={id} />}
			</section>
		</article>
	);
}

interface IProps {
	portfolio: IPortfolio;
}

export default PortfolioCard;
