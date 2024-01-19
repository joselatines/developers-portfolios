import { AbsoluteCenter, Box, Spinner } from "@chakra-ui/react";

function LoaderHandler() {
	return (
		<Box position="relative" h="80vh">
			<AbsoluteCenter>
				<Spinner
					thickness="4px"
					speed="0.65s"
					emptyColor="gray.200"
					color="blue.500"
					size="xl"
				/>
			</AbsoluteCenter>
		</Box>
	);
}

export default LoaderHandler;
