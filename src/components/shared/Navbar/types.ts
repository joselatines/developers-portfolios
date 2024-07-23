export interface Props {
	defaultLinks: Link[];
	loggedLinks: Link[];
}

interface Link {
	name: string;
	href: string;
}
