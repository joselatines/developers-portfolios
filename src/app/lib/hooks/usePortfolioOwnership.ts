import { useState, useEffect} from "react";
import { useSession } from "next-auth/react";

// TODO: change hook name cause we are using it to only check the current user and put "You" instead of "User.name"
// Custom hook to check if the current user using the app owns the portfolio
export function usePortfolioOwnership(userPortfolioEmail: string) {
	const [isPortfolioOwner, setIsPortfolioOwner] = useState<boolean>(false);
	const { data: session } = useSession();
	const currentUser = session?.user;

	useEffect(() => {
		const doesUserOwnPortfolio = currentUser?.email === userPortfolioEmail;

		setIsPortfolioOwner(doesUserOwnPortfolio);
	}, [currentUser, userPortfolioEmail]);

	return [isPortfolioOwner];
}
