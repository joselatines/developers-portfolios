import { formatDate } from "@/app/lib/utils/time";
import { getRateColor, getUserProfileUrl } from "@/app/lib/utils/ui";
import { Tag } from "@chakra-ui/react";
import { Props } from "./types";

function CommentCard({ data, refreshParent }: Props) {
	const { User, comment, rating, id, createdAt, updatedAt } = data;

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

				{/* <h3 className="font-bold">
					{isPortfolioOwner ? "You" : "@" + User.githubUsername}
				</h3> */}
			</a>

			<p className="mt-2">{comment}</p>
		</div>
	);
}

export default CommentCard;
