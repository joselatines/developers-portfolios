import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Custom hook to check if the current user using the app owns the portfolio
export function usePortfolioOwnership(userPortfolioEmail: string) {
	const [isPortfolioOwner, setIsPortfolioOwner] = useState<boolean>(false);
	const { data: session } = useSession();
	const currentUserEmail = session?.user?.email;

	useEffect(() => {
		const doesUserOwnPortfolio = currentUserEmail === userPortfolioEmail;

		setIsPortfolioOwner(doesUserOwnPortfolio);
	}, [currentUserEmail, userPortfolioEmail]);

	return [isPortfolioOwner];
}
