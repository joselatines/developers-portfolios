import { Button, useToast } from "@chakra-ui/react";
import { MdDelete } from "react-icons/md";
import React from "react";

import { deleteRating } from "@/app/lib/services/ratings.service";
import { Props } from "./types";

function DeleteCommentButton({ commentId, refetchComments }: Props) {
	const toast = useToast();

	const handleDelete = async () => {
		const res = deleteRating(commentId);

		toast.promise(res, {
			success: (e: any) => {
				refetchComments();
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
