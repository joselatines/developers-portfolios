import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

// Custom hook to check if the current user using the app owns the portfolio
export function usePortfolioOwnership(userId: string) {
	const [isPortfolioOwner, setIsPortfolioOwner] = useState<boolean>(false);
	const { data: session } = useSession() as any;

	const currentUserId = session?.user?.id;

	useEffect(() => {
		const doesUserOwnPortfolio = currentUserId === userId;

		setIsPortfolioOwner(doesUserOwnPortfolio);
	}, [currentUserId, userId]);

	return [isPortfolioOwner];
}
