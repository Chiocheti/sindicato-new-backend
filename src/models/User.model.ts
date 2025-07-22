import { DataTypes, Model } from "sequelize";
import { v4 as uuidv4 } from "uuid";

import db from "./";

import ClientSearch from "./ClientSearch.model";
import Action from "./Action.model";
import Role from "./Role.model";
import Permission from "./Permission.model";
import UserRole from "./User-Roles.model";
import UserPermission from "./User-Permissions.model";

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
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      validate: {
        isUUID: 4,
      },
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    username: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    refreshToken: {
      allowNull: true,
      type: DataTypes.STRING,
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

User.belongsToMany(Permission, {
  through: UserPermission,
  foreignKey: "userId",
  otherKey: "permissionId",
  as: "permissions",
});

Permission.belongsToMany(User, {
  through: UserPermission,
  foreignKey: "permissionId",
  otherKey: "userId",
  as: "users",
});

User.belongsToMany(Role, {
  through: UserRole,
  foreignKey: "userId",
  otherKey: "roleId",
  as: "roles",
});

Role.belongsToMany(User, {
  through: UserRole,
  foreignKey: "roleId",
  otherKey: "userId",
  as: "users",
});

User.hasMany(Action, {
  foreignKey: "userId",
  as: "actions",
});

Action.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

User.hasMany(ClientSearch, {
  foreignKey: "userId",
  as: "clientSearches",
});

ClientSearch.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

export default User;
