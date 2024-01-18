import { DataTypes, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../connection";

export const User = sequelize.define("User", {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	githubUsername: {
		type: DataTypes.STRING,
	},
	email: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isEmail: true,
		},
	},
	password: {
		type: DataTypes.STRING,
	},
	role: {
		type: DataTypes.STRING,
		defaultValue: "user",
	},
	profilePic: {
		type: DataTypes.TEXT,
		defaultValue:
			"https://static.vecteezy.com/system/resources/thumbnails/030/504/836/small/avatar-account-flat-isolated-on-transparent-background-for-graphic-and-web-design-default-social-media-profile-photo-symbol-profile-and-people-silhouette-user-icon-vector.jpg",
	},
	provider: {
		type: DataTypes.STRING,
	},
});
