import React from "react";
import CommentCard from "../CommentCard";

function CommentsSection() {
	return (
		<div>
			{[0, 1, 2, 3].map(e => (
				<CommentCard key={e} />
			))}
		</div>
	);
}

export default CommentsSection;
