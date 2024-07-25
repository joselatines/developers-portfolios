import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CommentCard from "../CommentCard";
import { Props } from "./types";
import { getReviews } from "@/services/reviews";
import { Comment } from "@/types/comment";
import RatePortfolioForm from "@/components/Forms/Portfolio/RatePortfolioForm";
import Loader from "@/components/shared/Loader";
import { Review } from "@/types/reviews";

function CommentsSection({ portfolioId }: Props) {
	const [reviews, setReviews] = useState<any>({ data: [], loading: true });
	const [refresh, setRefresh] = useState(0);

	const makeRequest = async () => {
		setReviews({ loading: true });
		const res = await getReviews({ portfolio: portfolioId });

		setReviews({ data: res.data, loading: false });
		console.log(reviews);
	};

	const handleRefresh = () => setRefresh(prev => prev + 1);
	useEffect(() => {
		makeRequest();
	}, [refresh]);

	if (reviews.loading) return <Loader />;

	return (
		<>
			<Heading size={"md"} marginBottom={2}>
				Leave a comment
			</Heading>
			<RatePortfolioForm
				portfolioId={portfolioId}
				refetchReviews={handleRefresh}
			/>

			<Box as="section" marginTop={8}>
				<Heading size={"md"} marginBottom={2}>
					Comments
				</Heading>
				{reviews.length === 0 ? (
					<p>No comments yet</p>
				) : (
					reviews.data.map((c: Review) => (
						<CommentCard key={c.id} review={c} refetchReviews={handleRefresh} />
					))
				)}
			</Box>
		</>
	);
}

export default CommentsSection;
