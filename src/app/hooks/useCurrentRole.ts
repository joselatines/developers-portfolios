import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/auth/AuthContext";
import { IRoles } from "../contexts/auth/types";

export function useCurrentRole() {
	const [currentRole, setCurrentRole] = useState<IRoles | null>(null);
	const { user }: any = useContext(AuthContext);
	useEffect(() => {
		if (user) setCurrentRole(user.role);

	
		console.info('currentRole: ',currentRole)
	}, [user]);

	return currentRole;
}
