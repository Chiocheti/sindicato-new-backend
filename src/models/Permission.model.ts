import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";

import User from "./User.model";

class Permission extends Model {
  declare id: string;
  declare action: string;
  declare resource: string;
}

Permission.init(
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
    action: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    resource: {
      allowNull: false,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "permissions",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

User.belongsToMany(Permission, {
  through: "user_permissions",
  foreignKey: "userId",
  otherKey: "permissionId",
  as: "permissions",
});

export default Permission;
