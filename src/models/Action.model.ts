import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";
import User from "./User.model";

class Action extends Model {
  declare id: string;
  declare clientId: string;
  declare userId: string;
  declare action: string;
  declare reference: string | null;
}

Action.init(
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    userId: {
      allowNull: false,
      type: Sequelize.UUID,
      references: {
        model: "users",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    },
    action: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    reference: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "actions",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Action.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default Action;
