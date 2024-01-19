import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";

// TODO: change hook name cause we are using it to only check the current user and put "You" instead of "User.name"
// Custom hook to check if the current user using the app owns the portfolio
export function usePortfolioOwnership(userPortfolioId: string) {
	const [isPortfolioOwner, setIsPortfolioOwner] = useState<boolean>(false);
	const { user: currentUser } = useContext(AuthContext);

	useEffect(() => {
		const doesUserOwnPortfolio = currentUser?.id === userPortfolioId;

		setIsPortfolioOwner(doesUserOwnPortfolio);
	}, [currentUser, userPortfolioId]);

	return [isPortfolioOwner];
}
