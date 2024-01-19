import { Button, Tag } from "@chakra-ui/react";
import { IComment } from "../../../shared/interfaces/comments.interface";
import { getUserProfileUrl } from "../../../shared/utils/getUserProfileUrl";
import { getRateColor } from "../../../shared/utils/uiHelpers";
import { usePortfolioOwnership } from "../../../hooks/usePortfolioOwnership";
import { MdDelete } from "react-icons/md";
import { deleteComment } from "../../../services/comments.service";
import useCustomToast from "../../../hooks/useCustomToast";
import { formatDate } from "../../../shared/utils/time";

function Comment({ data, refreshParent }: IProps) {
	const { User, comment, rating, id, createdAt, updatedAt } = data;
	const [isPortfolioOwner] = usePortfolioOwnership(User.id);
	const { handleToastSuccess, handleToastError } = useCustomToast();

	const handleDeleteComment = async (commentId: string) => {
		try {
			const res = await deleteComment(commentId);
			if (!res.data.success)
				return handleToastError(res.data.message, "Feedback Portfolio");

			handleToastSuccess(res.data.message, "Feedback Portfolio");
			refreshParent();
		} catch (error: any) {
			handleToastError(error.message);
		}
	};

	return (
		<div className="border relative pb-12 p-3  my-3 bg-white text-slate-950">
			<Tag
				className="absolute top-3 right-3"
				colorScheme={getRateColor(rating)}
			>
				{rating}/10
			</Tag>

			<Tag
				size="sm"
				className="absolute bottom-3 right-13"
				colorScheme={"gray"}
			>
				{formatDate(updatedAt || createdAt)}
			</Tag>

			{isPortfolioOwner && (
				<Button
					size="xs"
					colorScheme="red"
					position={"absolute"}
					className="bottom-3 right-3"
					onClick={() => handleDeleteComment(id)}
				>
					<MdDelete color="white" size={12} />
				</Button>
			)}
			<a
				href={getUserProfileUrl(User.id)}
				className="gap-3 items-center inline-flex"
			>
				<img
					src={User.profilePic}
					className="object-cover w-8 h-8 rounded-full 
                border-2 border-emerald-400  shadow-emerald-400
                "
				/>

				<h3 className="font-bold">
					{isPortfolioOwner ? "You" : "@" + User.githubUsername}
				</h3>
			</a>

			<p className="mt-2">{comment}</p>
		</div>
	);
}

interface IProps {
	data: IComment;
	refreshParent: () => void;
}

export default Comment;
