import { Comment } from "@/app/lib/types/comment";

export interface Props {
	data: Comment;
	refreshParent: () => void;
}
