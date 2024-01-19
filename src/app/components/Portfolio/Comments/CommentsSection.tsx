import React, { useCallback, useState, useEffect } from "react";
import { IComment } from "../../../shared/interfaces/comments.interface";
import Comment from "./Comment";
import RatePortfolioForm from "../../Forms/RatePortfolioForm";
import ErrorHandler from "../../shared/Error";
import LoaderHandler from "../../shared/Loader";
import { getComments } from "../../../services/comments.service";

interface IProps {
	portfolioId: string;
}

const CommentsSection: React.FC<IProps> = ({ portfolioId }) => {
	const [data, setData] = useState<any>(null);
	const [error, setError] = useState<Error | null>(null);
	const [showComments] = useState(true);
	const [refresh, setRefresh] = useState(0);

	const fetchData = useCallback(async () => {
		try {
			const res = await getComments(portfolioId);
			setData(res.data);
		} catch (error: any) {
			setError(error);
		}
	}, [refresh]);

	useEffect(() => {
		fetchData();
	}, [fetchData]);

	const handleRefresh = useCallback(() => {
		setRefresh(prev => prev + 1);
	}, []);

	if (error) return <ErrorHandler err={error} />;
	if (!data) return <LoaderHandler />;

	// const toggleComments = () => setShowComments(prev => !prev);

	return (
		<>
			<RatePortfolioForm
				portfolioId={portfolioId}
				refreshParent={handleRefresh}
			/>

			<section className={showComments ? "h-56 overflow-auto mt-7" : "hidden"}>
				<span className="text-lg font-bold">Comment section</span>
				<div className="flex flex-col">
					{data.data.map((comment: IComment) => (
						<Comment
							key={comment.id}
							data={comment}
							refreshParent={handleRefresh}
						/>
					))}
				</div>
			</section>
		</>
	);
};

export default CommentsSection;
