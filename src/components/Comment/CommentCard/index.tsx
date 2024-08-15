import { Tag } from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import DeleteCommentButton from "./DeleteCommentButton";
import { Props } from "./types";
import { getRateColor, getUserProfileUrl } from "@/helpers/utils";
import { formatDate } from "@/helpers/time";
import { usePortfolioOwnership } from "@/hooks/usePortfolioOwnership";

function CommentCard({ review, refetchReviews }: Props) {
	const { user, comment, rating, updatedAt, id } = review;
	const [isPortfolioOwner] = usePortfolioOwnership(user.id);
	const notPortfolioOwner = user?.username || user?.githubUsername || user?.email;
	const commentatorName = isPortfolioOwner ? "You" : "@" + notPortfolioOwner;

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
				{formatDate(updatedAt)}
			</Tag>

			<NextLink
				href={getUserProfileUrl(user.id)}
				className="gap-3 items-center inline-flex"
			>
				<NextImage
					src={user.profilePic}
					alt={commentatorName}
					width={20}
					height={20}
					className="object-cover w-8 h-8 rounded-full 
                border-2 border-emerald-400  shadow-emerald-400
                "
				/>

				<h3 className="font-bold">{commentatorName}</h3>
			</NextLink>

			{isPortfolioOwner && (
				<DeleteCommentButton reviewId={id} refetchReviews={refetchReviews} />
			)}

			<p className="mt-2">{comment}</p>
		</div>
	);
}

export default CommentCard;
