import { DataTypes, UUID, UUIDV4 } from "sequelize";
import { sequelize } from "../connection";
import { User } from "./user";
import { PORTFOLIO_TYPES } from "./interfaces";

// IMPORTANT: The Portfolio model is defined in the same file as Ratings due to a webpack limitation.
// Webpack encounters difficulties properly importing it, resulting in a 'use before initialization' error.
// This workaround ensures proper initialization order.

// Portfolio Model
const Portfolio = sequelize.define("Portfolio", {
	id: {
		type: DataTypes.UUID,
		defaultValue: DataTypes.UUIDV4,
		primaryKey: true,
	},
	thumbnail: {
		type: DataTypes.TEXT,
		allowNull: false,
		defaultValue:
			"https://tonsofthanks.com/wp-content/uploads/2023/08/Funny-Dog-at-Work-Meme.jpg",
	},
	created_by: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: User,
			key: "id",
		},
	},
	website_link: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	github_link: {
		type: DataTypes.STRING,
	},
	title: {
		type: DataTypes.STRING,
		allowNull: false,
	},
	description: {
		type: DataTypes.STRING,
	},
	type: {
		type: DataTypes.STRING,
		allowNull: false,
		validate: {
			isIn: [Object.values(PORTFOLIO_TYPES)],
		},
		defaultValue: "frontend",
	},
	file_name: {
		type: DataTypes.TEXT,
	},
});

// Ratings Model
const Ratings = sequelize.define("Ratings", {
	id: {
		type: UUID,
		defaultValue: UUIDV4,
		primaryKey: true,
	},
	comment: {
		type: DataTypes.TEXT,
		allowNull: true,
		validate: {
			not: /^(?!.*(.)\1{4,})[A-Za-z0-9]*$/,
		},
	},
	rating: {
		type: DataTypes.INTEGER,
		allowNull: false,
		defaultValue: 10,
	},
	portfolio_id: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: Portfolio,
			key: "id",
		},
	},
	rated_by: {
		type: DataTypes.UUID,
		allowNull: false,
		references: {
			model: User,
			key: "id",
		},
	},
});

// Associations
Ratings.belongsTo(User, { foreignKey: "rated_by" });
Portfolio.belongsTo(User, { foreignKey: "created_by" });
Portfolio.hasMany(Ratings, { foreignKey: "portfolio_id" });

export { Portfolio, Ratings };
