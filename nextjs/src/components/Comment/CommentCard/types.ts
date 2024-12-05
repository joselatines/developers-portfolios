import { Review } from "@/types/reviews";

export interface Props {
	review: Review;
	refetchReviews: () => void;
}
