import { Button, useToast } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import React from "react";
import { Props } from "./types";
import { deleteReview } from "@/services/reviews";

function DeleteCommentButton({ reviewId, refetchReviews }: Props) {
	const toast = useToast();

	const handleDelete = async () => {
		const res = deleteReview(reviewId);

		toast.promise(res, {
			success: (e: any) => {
				refetchReviews();
				return { title: "Portfolio", description: e.message };
			},
			error: (e: any) => {
				console.error("Server error", e);
				return { title: "Portfolio", description: e.message };
			},
			loading: { title: "Portfolio", description: "Please wait" },
		});
	};

	return (
		<Button
			size="xs"
			colorScheme="red"
			position={"absolute"}
			className="bottom-3 right-3"
			onClick={handleDelete}
		>
			<MdDelete color="white" size={12} />
		</Button>
	);
}

export default DeleteCommentButton;
