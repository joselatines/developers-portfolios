import { Heading, Text } from "@chakra-ui/react";

import CommentCard from "../CommentCard";
import { Comment } from "@/app/lib/types/comment";

function CommentsSection({ title = "Leave a comment" }) {
	const comments: Comment[] = [
		{
			id: "1",
			comment: "Great portfolio!",
			rating: 9,
			portfolio_id: "portfolio_123",
			createdAt: "2022-01-01T12:00:00Z",
			updatedAt: "2022-01-02T10:30:00Z",
			User: {
				id: "user_1",
				githubUsername: "john_doe",
				email: "john.doe@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		{
			id: "2",
			comment: "Nice work!",
			rating: 8,
			portfolio_id: "portfolio_456",
			createdAt: "2022-01-03T14:45:00Z",
			updatedAt: "2022-01-04T09:20:00Z",
			User: {
				id: "user_2",
				githubUsername: "jane_smith",
				email: "jane.smith@example.com",
				profilePic: "/user.svg",
				provider: "github",
			},
		},
		// Add more comments as needed
	];
	return (
		<>
			<Heading>{title}</Heading>
			{comments.map(e => (
				<CommentCard
					key={e.id}
					data={e}
					refreshParent={() => console.log("refreshed!")}
				/>
			))}
		</>
	);
}

export default CommentsSection;
