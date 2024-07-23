import { Box, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import CommentCard from "../CommentCard";
import { Props } from "./types";
import { getReviews } from "@/services/reviews";
import { Comment } from "@/types/comment";
import RatePortfolioForm from "@/components/Forms/Portfolio/RatePortfolioForm";
import Loader from "@/components/shared/Loader";

function CommentsSection({ portfolioId }: Props) {
	const [comments, setComments] = useState<Comment[]>([]);
	const [loading, setLoading] = useState(true);

	const makeRequest = async () => {
		try {
			setLoading(true);
			const res = await getReviews({ portfolio: portfolioId });

			const comments = res.data.filter((el: Comment) => el.comment.length > 0);
			setComments(comments);
		} catch (error) {
			setComments([]);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		makeRequest();
	}, []);

	return (
		<>
			<Heading size={"md"} marginBottom={2}>
				Leave a comment
			</Heading>
			<RatePortfolioForm
				portfolioId={portfolioId}
				refetchReviews={makeRequest}
			/>

			<Box as="section" marginTop={8}>
				<Heading size={"md"} marginBottom={2}>
					Comments
				</Heading>
				{loading ? (
					<Loader />
				) : comments.length ? (
					comments.map((c: Comment) => (
						<CommentCard key={c.id} review={c} refetchReviews={makeRequest} />
					))
				) : (
					<p>No comments</p>
				)}
			</Box>
		</>
	);
}

export default CommentsSection;
