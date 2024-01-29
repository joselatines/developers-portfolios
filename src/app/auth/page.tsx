import { Heading } from "@chakra-ui/react";
import { AuthButton } from "@/app/ui/components/shared/Navigation/AuthButton";

export default async function Page() {
	return (
		<section className="flex flex-col items-center">
			<Heading mb={5}>👮 Welcome to Auth page 👮</Heading>
			<AuthButton />
		</section>
	);
}
