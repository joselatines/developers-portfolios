import CreatePortfolioForm from "@/components/Forms/Portfolio/CreatePortfolioForm";
import { Heading } from "@chakra-ui/react";

export default function Page() {
	return (
		<>
			<Heading>Create your porfolio</Heading>
			<CreatePortfolioForm />
		</>
	);
}
