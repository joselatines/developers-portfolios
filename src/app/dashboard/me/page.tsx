import EditUserForm from "@/components/Forms/EditUserForm";
import { authConfig } from "@/lib/auth";
import { getUsers } from "@/services/users";
import { getServerSession } from "next-auth";

export default async function Me() {
	const session = (await getServerSession(authConfig)) as any;
	const res = await getUsers({ id: session.user.id });

	return (
		<>
			<EditUserForm initialValues={res.data} userId={session.user.id} />
		</>
	);
}
