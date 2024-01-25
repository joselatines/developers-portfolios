import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";

import { getAllRatingsFromAPortfolio } from "@/app/lib/services/ratings.service";
import RatePortfolioForm from "../../Portfolio/Forms/RatePortfolioForm";
import { Comment } from "@/app/lib/types/comment";
import CommentCard from "../CommentCard";
import { Props } from "./types";
import Loading from "../../shared/Loading";

function CommentsSection({ portfolioId }: Props) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);

	const makeRequest = async () => {
		try {
			setLoading(true);
			const res = await getAllRatingsFromAPortfolio({ portfolioId });
			setComments(res.body);
		} catch (error) {
			setComments([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		makeRequest();
	}, []);

	console.log(comments);
	return (
		<>
			<Heading marginBottom={2}>Leave a comment</Heading>
			<RatePortfolioForm
				portfolioId={portfolioId}
				refetchComments={makeRequest}
			/>

			<Box as="section" marginTop={8}>
				{loading ? (
					<Loading />
				) : comments.length ? (
					comments.map((c: Comment) => (
						<CommentCard key={c.id} data={c} refetchComments={makeRequest} />
					))
				) : (
					<span>No comments</span>
				)}
			</Box>
		</>
	);
}

export default CommentsSection;
