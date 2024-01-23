// components/Portfolio/PortfolioModal.jsx
import {
	Modal,
	ModalBody,
	ModalCloseButton,
	ModalContent,
	ModalFooter,
	ModalHeader,
	ModalOverlay,
	Button,
} from "@chakra-ui/react";
import { useRef } from "react";
import PortfolioModalBody from "./PortfolioModalBody";
import { Props } from "./types";

function PortfolioModal({ isOpen, onClose, portfolio }: any) {
	const btnRef = useRef(null);

	return (
		<Modal
			onClose={onClose}
			finalFocusRef={btnRef}
			isOpen={isOpen}
			scrollBehavior="inside"
			size="xl"
		>
			<ModalOverlay />
			<ModalContent>
				<ModalHeader>{portfolio.title}</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					<PortfolioModalBody portfolio={portfolio} />
				</ModalBody>
				<ModalFooter>
					<Button onClick={onClose}>Close</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	);
}

export default PortfolioModal;
