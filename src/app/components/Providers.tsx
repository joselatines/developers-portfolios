import { getServerSession } from "next-auth";
import { ChakraProvider } from "@chakra-ui/react";
import SessionProvider from "../components/SessionProvider";

export async function Providers({ children }: { children: React.ReactNode }) {
	const session = await getServerSession();
	return (
		<ChakraProvider>
			<SessionProvider session={session}>
				{/* <AuthProvider> */}
				{children}
				{/* </AuthProvider> */}
			</SessionProvider>
		</ChakraProvider>
	);
}
