import { Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";
import Sequelize from "sequelize";

import db from "./";

import Role from "./Role.model";
import Permission from "./Permission.model";
import ClientSearch from "./ClientSearch.model";
import Action from "./Action.model";

class User extends Model {
  declare id: string;
  declare name: string;
  declare username: string;
  declare password: string;
  declare phone: string;
  declare refreshToken: string | null;
}

User.init(
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
    name: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    username: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    password: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    phone: {
      allowNull: false,
      type: Sequelize.STRING,
    },
    refreshToken: {
      allowNull: true,
      type: Sequelize.STRING,
    },
  },
  {
    sequelize: db,
    tableName: "users",
    timestamps: false,
    underscored: true,
    hooks: {
      beforeCreate: (item) => {
        item.id = uuidv4();
      },
    },
  }
);

Permission.belongsToMany(User, {
  through: "user_permissions",
  foreignKey: "permissionId",
  otherKey: "userId",
  as: "users",
});

User.belongsToMany(Role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

User.hasMany(Action, {
  foreignKey: "userId",
  as: "actions",
});

User.hasMany(ClientSearch, {
  foreignKey: "userId",
  as: "clientSearches",
});

export default User;
